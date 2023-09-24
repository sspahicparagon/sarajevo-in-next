import { Flex } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EventCalendar from "../../components/event/EventCalendar";
import { EventFactory } from "../../factory/EventFactory";
import { EventFull, EventHTMLSafe } from "../../interfaces/EventOverride";
import EventService from "../../services/EventService";
import eventStyle from '../../styles/Event.module.css';
import { LanguageHelper } from "../../helpers/LanguageHelper";
import { useState } from "react";
import EventWithDateContainer from "../../components/event/EventWithDateContainer";
import SEO from "../../components/SEO";
import cache from "../../lib/cache";
import { normalizeDateToDate } from "../../helpers/DateHelper";
import { RedisKeys } from "../../values/GlobalValues";

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

export async function getServerSideProps({ locale = 'en', req, res }: GetServerSidePropsContext) {
    res.setHeader(
        'Cache-Control',
        'public, max-age=600, s-maxage=600, stale-while-revalidate=1200'
    )
    const events = await cache.fetchCache<EventFull[]>(RedisKeys.FilteredEventsForNextTwoMonths, EventService.getEventsFilteredNextTwoMonths, 60 * 60);

    let eventsGroupedByDate: { [key: string]: EventHTMLSafe[] } = {};

    events.map(event => {
        let dateString = normalizeDateToDate(event.Date!).toLocaleDateString('en');
        if(eventsGroupedByDate[dateString] == undefined) eventsGroupedByDate[dateString] = []

        eventsGroupedByDate[dateString].push(EventFactory.prepareEventForHTML(event))
    });


    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
            events: eventsGroupedByDate,
        }
    };
}

export default Event;