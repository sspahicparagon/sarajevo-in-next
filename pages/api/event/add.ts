// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseForm } from '../../../lib/parse-form';
import EventService from '../../../services/EventService';
import { EventFull } from '../../../interfaces/EventOverride';
import { TranslationService } from '../../../services/TranslationService';
import { EventFactory } from '../../../factory/EventFactory';
import { FileService } from '../../../services/FileService';
import { TranslationFactory } from '../../../factory/TranslationFactory';


export const config = {
    api: {
        bodyParser: false
    }
};

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

    try {
        eventSaveResult = await EventService.saveEvent(EventFactory.createEventFromFormFields(fields));
        TranslationService.saveEventTranslation(TranslationFactory.createTranslationFromFormFields(eventSaveResult.EventID!, fields));
    } catch(e) {
        console.log('Exception happened while saving Event.', {e});
    }
    // Fail if not successful
    if(eventSaveResult == undefined || !eventSaveResult?.EventID) return res.status(500).json(eventSaveResult);

    let savedImageLocation = await FileService.uploadImageToRemoteServer(files);

    //If image wasn't uploaded then delete event
    if(savedImageLocation == '') 
    {
        await EventService.deleteEvent(eventSaveResult.EventID);
        return res.status(500).json(eventSaveResult);
    }
    //Update events image with the correct location
    eventSaveResult = await EventService.saveEventImage(eventSaveResult.EventID, savedImageLocation);

    return res.status(200).json(eventSaveResult);
}