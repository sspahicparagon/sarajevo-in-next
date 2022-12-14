// import { Prisma, groupe } from '@prisma/client';
import prisma from '../lib/prisma';

const GroupService = {
    getGroupeWithLocation: async () => {
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
        return response;
    }
}

export default GroupService;