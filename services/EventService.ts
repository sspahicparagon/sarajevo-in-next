import { Prisma } from '@prisma/client';
import { EventFull, EventBase } from '../interfaces/EventOverride';
import prismaClient from '../lib/prisma';

const EventService = {
    saveEvent: async (name: string, time: string, date: Date, image: string, locationID: number, price: number, eventID:number | string = -1): Promise<EventBase> => {
        const id = typeof(eventID) === 'string' ? parseInt(eventID) : eventID;
        const data = {
            Name: name,
            Time: time,
            Date: date,
            Image: image.replace("/public/", '/'),
            LocationID: locationID,
            Price: new Prisma.Decimal(price)
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
    getEvents: async (): Promise<EventFull[]> => {
        return await prismaClient.event.findMany({
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
    },
    getEventsFiltered: async (): Promise<EventFull[]> => {
        const date: Date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);

        return await prismaClient.event.findMany({
            where: {
                Date: {
                    gte: firstDay,
                    lte: lastDay
                }
            },
            orderBy: {
                Date: 'asc'
            },
            include: {
                'location': true,
                'event_translation': true
            }
        })
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
    }
};

export default EventService;