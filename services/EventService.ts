import { Prisma } from '@prisma/client';
import { EventFull, EventBase } from '../interfaces/EventOverride';
import prismaClient from '../lib/prisma';
import { RRule, RRuleSet, rrulestr } from 'rrule';

const EventService = {
    saveEvent: async (name: string, time: string, date: Date, image: string, locationID: number, price: number, rrule: string | null, eventID:number | string = -1): Promise<EventBase> => {
        const id = typeof(eventID) === 'string' ? parseInt(eventID) : eventID;
        const data = {
            Name: name,
            Time: time,
            Date: date,
            Image: image.replace("/public/", '/'),
            LocationID: locationID,
            Price: new Prisma.Decimal(price),
            recurring_rule: rrule
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

        let rruleSet = new RRuleSet();
        let rruleParsed = rrulestr(event.recurring_rule) as RRuleSet;
        // If it doesn't have already an exception date, then it is considered a RRule
        // Check if the RRuleSet explicit method exdate is undefined
        if(!rruleParsed.exdate) rruleSet.rrule(rruleParsed as RRule);
        else rruleSet = rruleParsed;

        rruleSet.exdate(exceptionDate);
        return await prismaClient.event.update({
            where: {
                EventID: parseInt(eventID)
            },
            data: {
                recurring_rule: rruleSet.toString() //+ `\nEXDATE:${dateString}`
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
            include: {
                'location': true
            }
        });

        let todaysDate = new Date();
        return await EventService.appendRecurrances(result, new Date(todaysDate.getFullYear(), 0, 0), new Date(todaysDate.getFullYear() + 1, 0, 0))
    },
    getEventsFilteredNextTwoMonths: async (): Promise<EventFull[]> => {
        const date: Date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

        let result = await prismaClient.event.findMany({
            select: {
                Name: true,
                Image: true,
                location: true,
                Time: true,
                Date: true,
                EventID: true,
                recurring_rule: true
            },
            where: {
                Date: {
                    gte: firstDay,
                    lte: lastDay
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
        events.map((event) => {
            if(event.recurring_rule != null) {

                let rruleSet = rrulestr(event.recurring_rule, { 'forceset': true })

                let repeatDates = rruleSet.between(firstDay, lastDay, true);
                repeatDates.map((date) => date = new Date(date.getTime() - date.getTimezoneOffset()*6000))
                
                repeatDates.map((date, index) => {
                    if(index == 0) return;
                    let rEvent = {...event, Date: date};
                    recurringEvents.push(rEvent);
                })
            }
        })

        if(recurringEvents.length > 0)
        events.push.apply(events, recurringEvents);
        
        events = events.sort((event1, event2) => {
            let date1 = event1.Date!.getTime();
            let date2 = event2.Date!.getTime();
            return date1 > date2 ? 1 : date1 < date2 ? -1 : 0;
        })

        return events;
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
    }
};

export default EventService;