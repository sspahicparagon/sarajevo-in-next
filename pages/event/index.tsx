import { Flex, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import { SSRConfig, useTranslation } from "next-i18next";
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
import { AdFormatsPerPage, RedisKeys } from "../../values/GlobalValues";
import { TranslationType } from "../../interfaces/TranslationType";
import NormalAd from "../../components/ad/NormalAd";
import { AdService } from "../../services/AdService";
import { CustomAdFactory } from "../../factory/CustomAdFactory";
import { CustomAdFull, CustomAdTypeFull } from "../../interfaces/CustomAd";
import useAdManager from "../../hooks/useAdManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons"
import ChakraNextLink from "../../components/ChakraNextLink";

const Event: NextPage<SSRConfig & {events: { [key: string]: EventHTMLSafe[] }, groupedAds: {[key: string]: CustomAdFull[]} }> = (props) => {
    const [eventKeys, setEventKeys] = useState<string[]>(Object.keys(props.events));
    const { t } = useTranslation<TranslationType>('common');
    const { getAd } = useAdManager(props.groupedAds);

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
                description={t('Event-Description')}
                imageUrl={''}
            />
            <ChakraNextLink
                href={'/service/event-organizer'}
                className={eventStyle['event-organizer-link']}
            >
            <Flex 
                backgroundColor={'var(--base-color)'} 
                color={'var(--color-gray)'}
                boxShadow={'var(--color-gray) 0px 4px 12px;'}
                maxWidth={'550px'}
                minWidth={'320px'}
                justify={'center'}
                align={'center'}
                borderRadius={10}
                padding={'0.5rem'}
                >
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                <Text 
                    marginLeft={'1rem'} 
                    fontSize={{"base": '0.7rem', 'sm': '0.9rem', 'md': '1rem'}}
                    fontFamily={'Poppins'}>
                    Pravite događaj? Mi smo tu za Vas! Pogledajte naše usluge.
                </Text>
            </Flex>
            </ChakraNextLink>
            <EventCalendar 
                locale={LanguageHelper.languageCodeBeingUsed(props)} 
                markDates={Object.keys(props.events)} 
                onChange={dateWasSelected} 
            />
            <Flex 
                flexDirection={'row'} 
                gap={12} 
                position={'relative'}
            >
                <Flex 
                    position={'fixed'} 
                    left={`calc(25% - ${200}px)`}
                    top={`calc(50% - ${700 / 2}px)`}
                >
                    <NormalAd customAd={getAd(200, 700)} />
                </Flex>
                <Flex
                    flexDirection={'column'}
                    key={'EventContainer'}
                    className={eventStyle['container']}
                >
                    { eventKeys.map((key: string, index) => {
                        let condition = index % 2 == 0;
                        let ad = undefined;
                        if(condition)
                            ad = getAd(550, 200);
                        return (
                            <div key={key}>
                                <EventWithDateContainer 
                                    eventKey={key} 
                                    events={props.events} 
                                    locale={props._nextI18Next?.initialLocale ?? ""}
                                    key={Math.random()}
                                />
                                <NormalAd condition={condition} customAd={ad}/>
                            </div>
                        )})
                    }
                </Flex>
            </Flex>
        </Flex>
    );
}

export async function getServerSideProps({ locale = 'en', req, res,  }: GetServerSidePropsContext) {
    res.setHeader(
        'Cache-Control',
        'public, max-age=600, s-maxage=600, stale-while-revalidate=1200'
    )
    const events = await cache.fetchCache<EventFull[], unknown[]>(RedisKeys.FilteredEventsForNextTwoMonths, EventService.getEventsFilteredNextTwoMonths, 60 * 60);

    let eventsGroupedByDate: { [key: string]: EventHTMLSafe[] } = {};

    events.map(event => {
        let dateString = normalizeDateToDate(event.Date!).toLocaleDateString('en');
        if(eventsGroupedByDate[dateString] == undefined) eventsGroupedByDate[dateString] = [];

        eventsGroupedByDate[dateString].push(EventFactory.prepareEventForHTML(event));
    });

    const customAds = CustomAdFactory.groupByWidthAndHeight(await cache.fetchCache<CustomAdFull[], CustomAdTypeFull[][]>(RedisKeys.CustomAds, AdService.getAdsByAdTypes, 60 * 60, AdFormatsPerPage['event']));

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'footer'])),
            events: eventsGroupedByDate,
            groupedAds: customAds
        }
    };
}

export default Event;