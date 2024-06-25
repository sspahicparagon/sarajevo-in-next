import formidable from "formidable";
import { ImageUploadKeyValue } from "../values/GlobalValues";
import path from "path";
import * as ftp from 'basic-ftp';
import sharp from "sharp";
import fs from 'fs/promises';

const fileUploadConfig: {quality:number, nameExtended:string}[] = [
  {quality: 30, nameExtended: '-1'},
  {quality: 100, nameExtended: ''}
];
const SUCCESSFUL_UPLOAD: number = 226;
const SUCCESSFUL_REMOVE: number = 250;
const IMAGE_EXTENSION_WITH_BEST_QUALITY: string = "";

export type ImageFolderTypes = 'events' | 'ads';

const FileServiceFunction = () => {
  const uploadImageToRemoteServer = async (files: formidable.Files, imageFolder: ImageFolderTypes = 'events'): Promise<string> => {

    const fileStoredInUploadedFolder = Array.isArray(files[ImageUploadKeyValue]) ? files[ImageUploadKeyValue][0] : files[ImageUploadKeyValue];
    let result: ftp.FTPResponse | undefined = undefined;
    let savedImageLocation: string = '';
    const nameOfFileWithoutExtension = path.parse(fileStoredInUploadedFolder.filepath).name;
    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: process.env.IMAGE_DIRECTORY,
            user: process.env.IMAGE_DIRECTORY_USER,
            password: process.env.IMAGE_DIRECTORY_PASSWORD,
            secure: false
        });
        var file = await fs.open(fileStoredInUploadedFolder.filepath);
        var buffer = await file.readFile();
        for(let fileConfig of fileUploadConfig){
            //Convert the image to webp
          let location: string = `/public/images/${imageFolder}/${nameOfFileWithoutExtension}${fileConfig.nameExtended}.webp`;
            await sharp(buffer).webp({quality: fileConfig.quality}).toFile('.' + location);

            //Upload the image to the external server
            result = await client.uploadFrom('.' + location, `${process.env.IMAGE_DIRECTORY}${location}`);

            if(result.code == SUCCESSFUL_UPLOAD && 
              fileConfig.nameExtended == IMAGE_EXTENSION_WITH_BEST_QUALITY)
                savedImageLocation = location;

            //Remove the image from the server
              await fs.rm('.' + location);
        };
        file.close();
    }
    catch(err) {
      console.error('Error happened while saving image', { err });
      try {
        await client.remove(`${process.env.IMAGE_DIRECTORY}${location}`)
      }
      catch (e) {
        console.error('Error happened while deleting image', { e });
      }
      savedImageLocation = '';
    }

    client.close();

    return savedImageLocation.replace('/public', '');
  };

  const removeImageFromRemoteServer = async (locationOfImage: string, imageFolder: ImageFolderTypes = 'events'): Promise<boolean> => {
    let result: ftp.FTPResponse | undefined = undefined;
    const client = new ftp.Client();
    const nameOfFileWithoutExtension = path.parse(locationOfImage).name;
    client.ftp.verbose = true;
    
    try {
        await client.access({
            host: process.env.IMAGE_DIRECTORY,
            user: process.env.IMAGE_DIRECTORY_USER,
            password: process.env.IMAGE_DIRECTORY_PASSWORD,
            secure: false
        });

        for(let fileConfig of fileUploadConfig){
            //Convert the image to webp
          let location: string = `/public/images/${imageFolder}/${nameOfFileWithoutExtension}${fileConfig.nameExtended}.webp`;
            result = await client.remove(`${process.env.IMAGE_DIRECTORY}${location}`)
        };
    }
    catch(err) {
        console.error('Error happened while saving image', {err});
    }

    client.close();
    return result?.code == SUCCESSFUL_REMOVE;
  };

  return {
    uploadImageToRemoteServer,
    removeImageFromRemoteServer
  }
};

export const FileService = FileServiceFunction();