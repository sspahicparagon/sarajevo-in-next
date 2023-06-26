import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EventCalendar from "../../components/EventCalendar";
import { EventFactory } from "../../factory/EventFactory";
import { EventHTMLSafe } from "../../interfaces/EventOverride";
import EventService from "../../services/EventService";
import eventStyle from '../../styles/Event.module.css';
import { LanguageHelper } from "../../helpers/LanguageHelper";
import { useState } from "react";
import EventWithDateContainer from "../../components/EventWithDateContainer";
import SEO from "../../components/SEO";

const Event: NextPage<SSRConfig & {events: { [key: string]: EventHTMLSafe[] } }> = (props) => {
    const [eventKeys, setEventKeys] = useState<string[]>(Object.keys(props.events));

    const dateWasSelected = (date: Date, dateString: string):void => {
        if(Object.keys(props.events).includes(dateString))
            setEventKeys([dateString]);
        else setEventKeys(Object.keys(props.events));
    }

    return (
        <Flex 
            className={`${eventStyle['container-wrapper']}`}
            flexDirection={'column'}
            alignItems={'center'}
        >
            <SEO
                title={'SarajevoIN Events'}
                canonicalRelativeRoute={'event'}
                description={''}
                imageUrl={''}
            />
            <EventCalendar locale={LanguageHelper.languageCodeBeingUsed(props)} markDates={Object.keys(props.events)} onChange={dateWasSelected}/>
            <Flex
                flexDirection={'column'}
                key={'EventContainer'}
                className={eventStyle['container']}
            >
                {
                    eventKeys.map((key: string) => {

                        return (
                                <EventWithDateContainer 
                                    eventKey={key} 
                                    events={props.events} 
                                    locale={props._nextI18Next?.initialLocale ?? ""}
                                    key={Math.random()}
                                />        
                            )
                    })
                }
            </Flex>
        </Flex>
    );
}

export async function getServerSideProps(context: any) {

    const events = await EventService.getEventsFiltered();

    let eventsGroupedByDate: { [key: string]: EventHTMLSafe[] } = {};

    events.map(event => {
        let dateString = event.Date!.toLocaleDateString('en');
        if(eventsGroupedByDate[dateString] == undefined) eventsGroupedByDate[dateString] = []

        eventsGroupedByDate[dateString].push(EventFactory.prepareEventForHTML(event))
    });


    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
            events: eventsGroupedByDate,
        }
    };
}

export default Event;