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
    
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
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
        let parsedDate = new Date(fields.date.toString());
        rruleSet.rrule(new RRule({
            dtstart: new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset()*60000),
            freq: parseInt(fields.repeatFrequency.toString()),
            interval: 1
        }));
        rruleSetString = rruleSet.toString();
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
        for(let fileConfig of fileUploadConfig){
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
                                                        rruleSetString);
                    
                    TranslationService.saveEventTranslation(eventSaveResult.EventID!, { 
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