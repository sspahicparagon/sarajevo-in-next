import { Box, Button, CloseButton, Flex, HStack, Heading, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Text, useDisclosure } from "@chakra-ui/react";
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
import { useState } from "react";

const Calendar: NextPage<SSRConfig & { events: EventHTMLSafe[] }> = (props) => {
    const router = useRouter();
    const { t } = useTranslation<TranslationType>(props._nextI18Next?.ns);
    const [selectedEvent, setSelectedEvent] = useState<EventHTMLSafe | null>(null);    
    const { onOpen, isOpen } = useDisclosure();

    const handleEdit = () => router.push(`/admin-event/${selectedEvent?.EventID}/edit`);

    const handleAddException = async() => {
        let result = await axios({ 
            url: '/api/event/edit_recurring', 
            data: { date: selectedEvent?.Date?.toDateString(), eventID: selectedEvent?.EventID },
            method: 'PUT'
        });

        if(result.status != HttpStatusCode.Ok) return; // Display Toast message that something failed
        router.push(`/admin-event/${selectedEvent?.EventID}/edit_recurring?date=${selectedEvent?.Date?.toDateString()}&locationID=${selectedEvent?.location?.LocationID}`);
    };

    const handleDelete = async() => {
        let result = await axios({
            url: '/api/event/delete',
            data: { eventID: selectedEvent?.EventID },
            method: 'DELETE'
        });

        if(result.status != HttpStatusCode.Ok) return; // Display Toast message that something failed
        setSelectedEvent(null);
        router.push('/admin-event');
    };

    const handle = async (arg: EventClickArg) => {
        const event = arg.event.extendedProps.event as EventHTMLSafe;
        if(event.recurring_rule == null || event.recurring_rule == undefined) return router.push(`/admin-event/${event.EventID}/edit`);
        else {
            onOpen();
            setSelectedEvent(event);
        }
    }
    return (
        <>
            { selectedEvent &&
                <Modal
                    isOpen={isOpen}
                    onClose={() => setSelectedEvent(null)}
                    size={{'base': 'full', 'md': 'lg'}}
                >
                    <ModalContent>
                        <CloseButton 
                            size='lg' 
                            onClick={() => setSelectedEvent(null)}
                        />
                        <ModalHeader>
                            <Heading as={'h2'}>Edit event</Heading>
                        </ModalHeader>
                        <ModalBody>
                            <Text>Suggested actions for your event.</Text>
                        </ModalBody>
                        <ModalFooter>
                            <HStack
                                gap={3}
                            >
                                <Button colorScheme="blue" onClick={handleEdit}>Edit</Button>
                                <Button colorScheme="teal" onClick={handleAddException}>Add exception</Button>
                                <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            }
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
                    <Button onClick={(e) => router.push('/admin-event/-1/add')}
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

function renderEventContent(content: EventContentArg) {
    return (
        <Flex flexDirection={'row'}>
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
                event: event
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