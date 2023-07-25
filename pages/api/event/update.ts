// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '../../../lib/prisma';
import * as ftp from 'basic-ftp';
import fs from 'fs/promises';
import sharp from 'sharp';
import { parseForm } from '../../../lib/parse-form';
import { ImageUploadKeyValue } from '../../../values/GlobalValues';
import path from 'path';
import EventService from '../../../services/EventService';
import { EventFull } from '../../../interfaces/EventOverride';
import { TranslationService } from '../../../services/TranslationService';
import { RRule, RRuleSet } from 'rrule';


export const config = {
    api: {
        bodyParser: false
    }
};
const SUCCESSFUL_FILE_UPLOAD:number = 226;
const IMAGE_EXTENSION_WITH_BEST_QUALITY: string = "";


const fileUploadConfig: {quality:number, nameExtended:string}[] = [
    {quality: 30, nameExtended: '-1'},
    {quality: 100, nameExtended: ''}
];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== "PUT") {
        res.setHeader("Allow", "PUT");
        res.status(405).json({
          data: null,
          error: "Method Not Allowed",
        });
        return;
    }
    let eventSaveResult: EventFull = {};
    const {fields, files} = await parseForm(req);

    const rruleSet = new RRuleSet();
    let rruleSetString = null;
    if(parseInt(fields.repeatFrequency.toString()) > 0) {
        rruleSet.rrule(new RRule({
            freq: parseInt(fields.repeatFrequency.toString()),
            interval: 1,
            dtstart: new Date(fields.date.toString())
        }));
        rruleSetString = rruleSet.toString();
    }
    //Updat when image wasn't changed
    if(fields.uploadedImage && Object.keys(files).length == 0) {
        eventSaveResult = await EventService.saveEvent( fields.eventName.toString(), 
            fields.time.toString(), 
            new Date(fields.date.toString()), 
            fields.uploadedImage.toString(), 
            parseInt(fields.location.toString()),
            parseFloat(fields.price.toString()),
            rruleSetString,
            fields.eventID.toString());

        TranslationService.updateEventTranslation(eventSaveResult.EventID!, { 
            'description_en': fields.description_en.toString(), 
            'description_bs': fields.description_bs.toString(),
            'description_de': fields.description_de.toString()
         });
         return res.status(200).json(eventSaveResult);
    }

    const fileStoredInUploadedFolder = Array.isArray(files[ImageUploadKeyValue]) ? files[ImageUploadKeyValue][0] : files[ImageUploadKeyValue];

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
        for(let fileConfig of fileUploadConfig) {
            //Remove old image from FTP server
            // Format: - dir: /images/events - name: NAME_WITHOUTH_EXTENSION (image-media-1689514333189-391396379) - ext: For now only .webp
            let oldImage = path.parse(fields.uploadedImage.toString())
            await client.remove(`file.sarajevoin.ba/public${oldImage.dir}/${oldImage.name}${fileConfig.nameExtended}${oldImage.ext}`);

            //Convert the image to webp
            let location: string = `/public/images/events/${nameOfFileWithoutExtension}${fileConfig.nameExtended}.webp`;
            await sharp(buffer).webp({quality: fileConfig.quality}).toFile('.' + location);

            //Upload the image to the external server
            let result = await client.uploadFrom('.' + location, `file.sarajevoin.ba${location}`);

            if(result.code == SUCCESSFUL_FILE_UPLOAD && 
                fileConfig.nameExtended == IMAGE_EXTENSION_WITH_BEST_QUALITY) {
                  
                try {
                    eventSaveResult = await EventService.saveEvent( fields.eventName.toString(), 
                                                        fields.time.toString(), 
                                                        new Date(fields.date.toString()), 
                                                        location, 
                                                        parseInt(fields.location.toString()),
                                                        parseFloat(fields.price.toString()),
                                                        rruleSetString,
                                                        fields.eventID.toString());
                    
                    TranslationService.updateEventTranslation(eventSaveResult.EventID!, { 
                        'description_en': fields.description_en.toString(), 
                        'description_bs': fields.description_bs.toString(),
                        'description_de': fields.description_de.toString()
                     });
                }
                catch(exception) {
                    //Remove uploaded image to remote server
                    console.log({exception});
                    await client.remove(`file.sarajevoin.ba${location}`)
                }
            }
            //Remove the image from the server
            await fs.rm('.' + location);
        };

        file.close();
    }
    catch(err) {
        console.error(err);
    }

    client.close();
    return res.status(200).json(eventSaveResult);
}