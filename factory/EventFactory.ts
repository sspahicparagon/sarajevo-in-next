import path from "path";
import { EventFull, EventHTMLSafe } from "../interfaces/EventOverride";
import formidable from "formidable";
import { SaveEventProps } from "../services/EventService";
import { createRRuleStringFromForm } from "../helpers/RecurringHelper";

function EventFactoryFunction() {

    const getLesserQualityImage = (eventImage: string): string => {
        const nameOfFileWithoutExtension = path.parse(eventImage).name;

        return '/images/events/' + nameOfFileWithoutExtension + '-1.webp';
    }

    const getFullQualityImage = (eventImage:string): string => {
        return eventImage;
    }

    const prepareEventForHTML = (event: EventFull): EventHTMLSafe => {
        return {
            ... event,
            Price: +event.Price!
        }
    }

    const prepareEventForHTMLMultiple = (events: EventFull[]): EventHTMLSafe[] => {
        return events.map(event => prepareEventForHTML(event));
    }

    const createEventFromFormFields = (fields: formidable.Fields) => {
        let event: SaveEventProps = {
            name: fields.eventName.toString(), 
            time: fields.time.toString(), 
            date: new Date(fields.date.toString()), 
            image: fields.uploadedImage.toString() == '' ? 'TEMPORARY' : fields.uploadedImage.toString(), 
            locationID: parseInt(fields.location.toString()),
            price: parseFloat(fields.price.toString()),
            rrule: createRRuleStringFromForm(fields.repeatFrequency, fields.date),
            eventID: fields.eventID.toString()
        }

        return event;
    }

    // const createFormEventFromEvent = (event: )

    return {
        getLesserQualityImage,
        prepareEventForHTML,
        getFullQualityImage,
        prepareEventForHTMLMultiple,
        createEventFromFormFields
    }
}

export const EventFactory = EventFactoryFunction();