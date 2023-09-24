import { Prisma } from '@prisma/client';
import { EventFull, EventBase } from '../interfaces/EventOverride';
import prismaClient from '../lib/prisma';
import { RRuleSet, rrulestr } from 'rrule';
import { sortDatesAsc } from '../helpers/DateHelper';

const getEventsFilteredNextTwoMonthsSelect = {
    Name: true,
    Image: true,
    location: true,
    Time: true,
    Date: true,
    EventID: true,
    recurring_rule: true
}

const appendRecurrancesSelect = {
    Name: true,
    Image: true,
    location: true,
    Time: true,
    Date: true,
    EventID: true,
    recurring_rule: true
}

export type SaveEventProps = {
    name: string;
    time: string;
    date: Date,
    image: string;
    locationID: number;
    price: number;
    rrule: string | null;
    eventID: number | string;
}

const EventService = {
    saveEvent: async (props: SaveEventProps): Promise<EventBase> => {
        const id = typeof(props.eventID) === 'string' ? parseInt(props.eventID) : props.eventID;
        const data = {
            Name: props.name,
            Time: props.time,
            Date: props.date,
            Image: props.image.replace("/public/", '/'),
            LocationID: props.locationID,
            Price: new Prisma.Decimal(props.price),
            recurring_rule: props.rrule
        };

        if(id > 0) {
            return await prismaClient.event.update({
                data: data,
                where: {
                    EventID: id
                }
            });
        }
        return await prismaClient.event.create({
            data: data
        })
    },
    editEventRecurring: async (exceptionDate: Date, eventID: string) => {
        let event = await prismaClient.event.findFirst({ where: { EventID: parseInt(eventID) } });
        if(!event?.recurring_rule) return null;

        let rruleSet = rrulestr(event.recurring_rule, { 'forceset': true }) as RRuleSet;


        rruleSet.exdate(exceptionDate);
        return await prismaClient.event.update({
            where: {
                EventID: parseInt(eventID)
            },
            data: {
                recurring_rule: rruleSet.toString()
            }
        });
        return null;
    },
    getEventsFromDateRange: async (firstDay: Date, lastDay: Date): Promise<EventFull[]> => {
        let result = await prismaClient.event.findMany({
            orderBy: [
                {
                    'Date': 'desc'
                },
                {
                    'Name': 'asc'
                },
            ],
            include: {
                'location': true
            }
        });

        return await EventService.appendRecurrances(result, firstDay, lastDay);
    },
    getAllEvents:  async (): Promise<EventFull[]> => {
        let result = await prismaClient.event.findMany({
            orderBy: [
                {
                    'Date': 'desc'
                },
                {
                    'Name': 'asc'
                },
            ],
            where: {
                recurring_rule: {
                    equals: null
                }
            },
            include: {
                'location': true
            }
        });
        
        let todaysDate = new Date();
        return await EventService.appendRecurrances(result, new Date(todaysDate.getFullYear(), 0, 0, 0, 0, 0, 0), new Date(todaysDate.getFullYear() + 1, 0, 0, 0, 0, 0, 0))
    },
    getEventsFilteredNextTwoMonths: async (): Promise<EventFull[]> => {
        const date: Date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

        let result = await prismaClient.event.findMany({
            select: getEventsFilteredNextTwoMonthsSelect,
            where: {
                AND: {
                    Date: {
                        gte: firstDay,
                        lte: lastDay
                    },
                    recurring_rule: {
                        equals: null
                    }
                }
            },
            orderBy: {
                Date: 'asc'
            }
        });
        return await EventService.appendRecurrances(result, firstDay, lastDay);
    },
    appendRecurrances: async (events: EventFull[], firstDay: Date, lastDay: Date): Promise<EventFull[]> => {
        let recurringEvents: typeof events = [];

        let onlyRecurrances = await EventService.getOnlyRecurringEvents();

        onlyRecurrances.map((event) => {
            let rruleSet = rrulestr(event.recurring_rule!, { 'forceset': true })

            let repeatDates = rruleSet.between(firstDay, lastDay, true);
            repeatDates.map((date, index) => {
                let rEvent = { ...event, Date: date } as typeof event;
                recurringEvents.push(rEvent);
            });
        });

        if(recurringEvents.length > 0)
            events.push.apply(events, recurringEvents);
        
        events = events.sort((event1, event2) => sortDatesAsc(event1.Date!.getTime(), event2.Date!.getTime()));

        return events;
    },
    getOnlyRecurringEvents: async () => {
        return await prismaClient.event.findMany({
            select: appendRecurrancesSelect,
            where: {
                recurring_rule: {
                    not: null
                }
            },
        });
    },
    getEvent: async (eventID: number | string): Promise<EventFull | null> => {
        return await prismaClient.event.findFirst({
            where: {
                EventID: typeof(eventID) === 'string' ? parseInt(eventID) : eventID
            },
            include: {
                'location': true,
                'event_translation': true
            }
        });
    },
    deleteEvent: async (eventID: number | string) => {
        return await prismaClient.event.delete({ where: { EventID: typeof(eventID) === 'string' ? parseInt(eventID) : eventID } })
    },
    saveEventImage: async (eventID: number | string, image: string) => {
        return await prismaClient.event.update({
            where: {
                EventID: typeof(eventID) === 'string' ? parseInt(eventID) : eventID
            },
            data: {
                Image: image
            }
        });
    }
};

export default EventService;