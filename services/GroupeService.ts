// import { Prisma, groupe } from '@prisma/client';
import { location } from '@prisma/client';
import prismaClient from '../lib/prisma';

const GroupService = {
    getGroupesWithLocationAsDictionary: async () => {
        let response = await prismaClient.groupe.findMany({
            where: {
                Visible: true
            },
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
        return await prismaClient.groupe.findMany({
            where: {
                Visible: true
            },
            orderBy: {
                Name: 'asc'
            }
        });
    },
    getGroupesAll: async () => {
        return await prismaClient.groupe.findMany({
            orderBy: {
                Name: 'asc'
            }
        });
    },
    getGroupeWithLocationByName: async (groupeName: string) => {
        return await prismaClient.groupe.findFirst({
            where: {
                Name: groupeName,
                Visible: true
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
        return await prismaClient.groupe.findFirst({
            where: {
                GroupeID: id,
                Visible: true
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