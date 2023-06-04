import path from "path";
import { EventFull, EventHTMLSafe } from "../interfaces/EventOverride";

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

    return {
        getLesserQualityImage,
        prepareEventForHTML,
        getFullQualityImage,
        prepareEventForHTMLMultiple
    }
}

export const EventFactory = EventFactoryFunction();