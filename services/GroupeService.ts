// import { Prisma, groupe } from '@prisma/client';
import { location } from '@prisma/client';
import prisma from '../lib/prisma';

const GroupService = {
    getGroupesWithLocationAsDictionary: async () => {
        let response = await prisma.groupe.findMany({
            include: {
                location: {
                    orderBy: {
                        Name: 'asc'
                    }
                }
            },
            orderBy: {
                location: {
                    '_count': 'desc'
                }
            }
        });
        let array: { [category: string]: location[] } = {};
        response.map(item => {
            array[item.Name] = item.location;
        })
        return array;
    },
    getGroupes: async () => {
        return await prisma.groupe.findMany();
    },
    getGroupeWithLocationByName: async (groupeName: string) => {
        return await prisma.groupe.findFirst({
            where: {
                Name: groupeName
            },
            include: {
                location: {
                    orderBy: {
                        Name: 'asc'
                    }
                }
            }
        });
    },
    getGroupeWithLocationByID: async (id: number) => {
        return await prisma.groupe.findFirst({
            where: {
                GroupeID: id
            },
            include: {
                location: {
                    orderBy: {
                        Name: 'asc'
                    }
                }
            }
        });
    }
}

export default GroupService;