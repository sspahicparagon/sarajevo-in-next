import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import groupeStyle from '../../styles/Groupe.module.css';
import 'react-calendar/dist/Calendar.css';
import { SSRConfig, useTranslation } from "next-i18next";
import EventService from "../../services/EventService";
import router, { useRouter } from "next/router";
import { EventFactory } from "../../factory/EventFactory";
import { EventHTMLSafe } from "../../interfaces/EventOverride";
import { TranslationType } from "../../interfaces/TranslationType";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { EventClickArg, EventContentArg, EventInput, EventSourceInput } from "@fullcalendar/core";
import listPlugin from '@fullcalendar/list';
import rrulePlugin from '@fullcalendar/rrule';
import { RRuleSet, rrulestr } from "rrule";
import axios, { HttpStatusCode } from "axios";

const Calendar: NextPage<SSRConfig & { events: EventHTMLSafe[] }> = (props) => {
    const router = useRouter();
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);
    return (
        <>
            <Flex
                className={`center ${groupeStyle.container}`}
                margin={'auto'}
                flexDirection={'column'}
            >
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    margin={'auto'}
                    paddingTop={'5rem'}
                    width={'100%'}
                >
                    <Button onClick={(e) => router.push('/admin-event/-1')}
                    >
                        {t('Add Event')}
                    </Button>
                </Flex>
                    <main>
                    <Box display={{ 'base': 'none', 'lg': 'block'}} mb={'1.5em'}>
                        <FullCalendar 
                            plugins={[rrulePlugin, dayGridPlugin]}
                            weekends={true}
                            initialView={'dayGridMonth'}
                            events={parseEvents(props.events)}
                            eventContent={renderEventContent}
                            height={'100vh'}
                            eventClick={handle}
                        />
                    </Box>
                    <Box display={{ 'base': 'block', 'lg': 'none' }} h={'100vh'} marginBlock={'1.5em'}>
                        <FullCalendar 
                            plugins={[rrulePlugin, listPlugin]}
                            events={parseEvents(props.events)}
                            initialView={'listMonth'}
                            eventContent={renderEventContent}
                            height={'100vh'}
                            eventClick={handle}
                        />
                    </Box>
                    </main>
            </Flex>
        </>
    )
};

async function handle(arg: EventClickArg) {
    if(!arg.event.extendedProps.recurring) return router.push(`/admin-event/${arg.event._def.extendedProps.eventID}`);

    let rrule: RRuleSet = arg.event.extendedProps.rrule;
    let eventDate = arg.event.start as Date;
    let originalEventStartDate = rrule?.dtstart() as Date;

    // Original event is being edited
    if(eventDate.toDateString() == originalEventStartDate.toDateString()) return router.push(`/admin-event/${arg.event._def.extendedProps.eventID}`);

    let result = await axios({ 
        url: '/api/event/edit_recurring', 
        data: { date: arg.event.start?.toDateString(), eventID: arg.event._def.extendedProps.eventID },
        method: 'PUT'
    })
    if(result.status != HttpStatusCode.Ok) return; // Display Toast message that something failed
    router.push(`/admin-event/-1?date=${eventDate.toDateString()}&locationID=${arg.event.extendedProps.locationID}`)
}

function renderEventContentList(content: EventContentArg) {
    // Pristupa se preko content.event._def
    // Ovako izgleda struktura
    // PublicId je EventID
    // {
    //     "title": "1 - Recurring",
    //     "groupId": "",
    //     "publicId": "10",
    //     "url": "",
    //     "recurringDef": null,
    //     "defId": "295",
    //     "sourceId": "291",
    //     "allDay": false,
    //     "hasEnd": false,
    //     "ui": {
    //         "display": null,
    //         "constraints": [],
    //         "overlap": null,
    //         "allows": [],
    //         "backgroundColor": "blue",
    //         "borderColor": "blue",
    //         "textColor": "",
    //         "classNames": []
    //     },
    //     "extendedProps": {
    //         "color": "var(--indicator-color)"
    //     }
    // }
    // <Flex
    //     flexDirection={'row'}

    // >

    // </Flex>
}

function renderEventContent(content: EventContentArg) {
    return (
        <Flex flexDirection={'row'} color={content.event.extendedProps.color}>
            <Text 
                as={'p'} 
                overflow={'hidden'} 
                textOverflow={'ellipsis'} 
                whiteSpace={'nowrap'} 
                w={'150px'}
                h={'30px'}
            >
                {content.event.title}
            </Text>
        </Flex>
    )
}


function parseEvents(events: EventHTMLSafe[]): EventInput[] {
    let es = events.map((event) => {
        let rrule: RRuleSet | undefined = undefined;
        if(event.recurring_rule) {
            rrule = rrulestr(event.recurring_rule!!, { 'forceset': true }) as RRuleSet;
        };
        return {
            id:`${Math.random()}`,
            start: event.Date,
            end: event.Date,
            title: `${event.Name} - ${event.Time}`,
            extendedProps: { 
                color: event.recurring_rule ? 'var(--indicator-color)' : 'var(--base-color)', 
                recurring: event.recurring_rule != null && event.recurring_rule != undefined,
                locationID: event.LocationID,
                eventID: event.EventID,
                rrule: rrule
            },
        }
    })
    return es;
}

export async function getServerSideProps(context: any) {
    const events = await EventService.getAllEvents();
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
            events: EventFactory.prepareEventForHTMLMultiple(events)
        }
    };
}

export default Calendar;