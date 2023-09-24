import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import style from '../../../styles/Event.module.css';
import 'react-calendar/dist/Calendar.css';
import { SSRConfig } from "next-i18next";
import { useRouter } from "next/router"
import { RRuleSet, rrulestr } from "rrule";
import EventService from "../../../services/EventService";
import { LocationService } from "../../../services/LocationService";
import EventForm from "../../../components/event/EventForm";
import { LocationFull } from "../../../interfaces/LocationOverride";
import { FormEvent } from "../../../hooks/useFormEvent";

const Edit: NextPage<SSRConfig & { locations: LocationFull[] } & { sentFormValues: FormEvent | null}> = (props) => {
    const router = useRouter();
    if(props.sentFormValues == null) router.push('/admin-event');

    return (
        <>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                className={style.container}
                marginTop={'var(--toolbar-container-height)'}
            >
                <EventForm ns={props._nextI18Next?.ns} locations={props.locations} action={'update'} method={'PUT'} sentFormValues={props.sentFormValues!} />
            </Flex>
      </>
    );
};

export async function getServerSideProps(context: any) {
    const locations = await LocationService.getAllLocations();
    const eventID: string = context.params.id;
    let sentFormValues: FormEvent | null = null;
    if(eventID != '-1') {
        const event = await EventService.getEvent(eventID);
        if(event != null) {
            let rruleSet: RRuleSet | undefined;
            if(event.recurring_rule != null)
                rruleSet = rrulestr(event.recurring_rule, { 'forceset': true }) as RRuleSet;
            sentFormValues = {
                eventID: `${event.EventID}`,
                eventName: event.Name!,
                time: event.Time!,
                location: `${event.location?.LocationID}`,
                date: event.Date?.toLocaleDateString(),
                price: `${event.Price}`,
                repeatFrequency: rruleSet ? `${rruleSet?._rrule[0].options?.freq}` : '-1',
                uploadedImage: event.Image,
                rruleSet: rruleSet?.toString()
            };
            event.event_translation?.map((translation) => sentFormValues![`${translation.Key}_${translation.Language}`] = translation.Translation);
        }
    }
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer', 'admin'])),
            locations: locations,
            sentFormValues
        }
    };
}

export default Edit;