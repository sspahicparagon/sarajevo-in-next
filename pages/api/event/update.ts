// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseForm } from '../../../lib/parse-form';
import EventService from '../../../services/EventService';
import { EventFull } from '../../../interfaces/EventOverride';
import { TranslationService } from '../../../services/TranslationService';
import { EventFactory } from '../../../factory/EventFactory';
import { TranslationFactory } from '../../../factory/TranslationFactory';
import { FileService } from '../../../services/FileService';


export const config = {
    api: {
        bodyParser: false
    }
};

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
    const parsedFields = EventFactory.createEventFromFormFields(fields);

    const existingEvent = await EventService.getEvent(parsedFields.eventID);

    if(!existingEvent || existingEvent == null) return res.status(400).json(eventSaveResult);

    // Remove image
    if(Object.keys(files).length > 0 && existingEvent.Image != 'TEMPORARY') {
        let removeResult = await FileService.removeImageFromRemoteServer(existingEvent.Image!);

        if(!removeResult) return res.status(500).json(eventSaveResult);
    }

    try {
        eventSaveResult = await EventService.saveEvent(EventFactory.createEventFromFormFields(fields));
        TranslationService.updateEventTranslation(TranslationFactory.createTranslationFromFormFields(eventSaveResult.EventID!, fields));

        //If no image was uploaded then finish
        if(Object.keys(files).length == 0) return res.status(200).json(eventSaveResult);

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