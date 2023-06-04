import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import groupeStyle from '../../styles/Groupe.module.css';
import 'react-calendar/dist/Calendar.css';
import { SSRConfig, useTranslation } from "next-i18next";
import EventService from "../../services/EventService";
import Card from "../../components/ImageCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryIconsJson } from "../../values/GlobalValues";
import { useRouter } from "next/router";
import { EventFactory } from "../../factory/EventFactory";
import { EventHTMLSafe } from "../../interfaces/EventOverride";

const Calendar: NextPage<SSRConfig & { events: EventHTMLSafe[] }> = (props) => {
    const router = useRouter();
    const { t } = useTranslation(props._nextI18Next?.ns);
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
                <Flex
                    flexDirection={'column'}
                    margin={'auto'}
                    width={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <main>
                        <Grid
                            className={`center ${groupeStyle['grid-container']}`}
                            marginTop={'5rem'}
                        >
                            {
                                props.events.map((event: EventHTMLSafe) => {
                                    return (
                                        // <Link
                                        //     href={{ pathname: '/admin/event/[id]', query: { id: event.LocationID } }}
                                        //     locale={locale}
                                        //     key={Math.random()}
                                        // >
                                            <Grid
                                                height={'400px'}
                                                className={groupeStyle['card-container']}
                                                key={event.EventID}
                                            >
                                                <Flex
                                                    height={'250px'}
                                                    width={'100%'}
                                                    flexDirection={'column'}
                                                    position={'relative'}
                                                >
                                                    <Card image={event.Image} enableClick={false} alt={event.Name ?? ""} />
                                                </Flex>
                                                <Flex
                                                    width={'100%'}
                                                    height={'150px'}
                                                    flexDirection={'column'}
                                                    className={`center ${groupeStyle['card-text-container']}`}
                                                >
                                                    <Flex
                                                        flexDirection={'column'}
                                                        justifyContent={'center'}
                                                        alignItems={'center'}
                                                    >
                                                        <Flex
                                                            flexDirection={'row'}
                                                        >
                                                            <Flex
                                                                flexDirection={'column'}
                                                                height={'100%'}
                                                                margin={'auto'}
                                                                justifyContent={'center'}
                                                            >
                                                                <Text>{event.Name}</Text>
                                                            </Flex>
                                                            <Flex
                                                                flexDirection={'column'}
                                                                height={'100%'}
                                                                margin={'auto'}
                                                                justifyContent={'center'}
                                                            >
                                                                <Text>{event.Price.toString()}</Text>
                                                            </Flex>
                                                        </Flex>
                                                        <Flex
                                                            flexDirection={'column'}
                                                            height={'100%'}
                                                            margin={'auto'}
                                                            justifyContent={'center'}
                                                        >
                                                            <Flex
                                                                flexDirection={'row'}
                                                            >
                                                                <Flex
                                                                    flexDirection={'column'}
                                                                    height={'100%'}
                                                                    margin={'auto'}
                                                                    justifyContent={'center'}
                                                                >
                                                                    <Text>{event.Date?.toLocaleDateString('bs') ?? ""}</Text>
                                                                </Flex>
                                                                <Flex
                                                                    flexDirection={'column'}
                                                                    height={'100%'}
                                                                    margin={'auto'}
                                                                    justifyContent={'center'}
                                                                >
                                                                    <Text>&nbsp;{event.Time}</Text>
                                                                </Flex>
                                                            </Flex>
                                                        </Flex>
                                                        <Flex
                                                            flexDirection={'column'}
                                                            height={'100%'}
                                                            margin={'auto'}
                                                            justifyContent={'center'}
                                                        >
                                                            <FontAwesomeIcon size={'1x'} icon={CategoryIconsJson[event.location?.GroupeID ?? -1]} />
                                                        </Flex>
                                                    </Flex>
                                                </Flex>
                                            </Grid>
                                        // </Link>
                                    )
                                })
                            }
                        </Grid>
                    </main>
                </Flex>
            </Flex>
        </>
    )
};

export async function getServerSideProps(context: any) {
    const events = await EventService.getEvents();
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common', 'footer'])),
            events: EventFactory.prepareEventForHTMLMultiple(events)
        }
    };
}

export default Calendar;