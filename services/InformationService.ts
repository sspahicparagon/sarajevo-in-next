import prismaClient from '../lib/prisma'

const InformationService = {
    getLocations: async () => {
        return await prismaClient.location.findMany({
            where: {
                groupe: {
                    Visible: true
                }
            },
            orderBy: [
                {
                    'groupe': {
                        'Name': 'asc'
                    },
                },
                {
                    'Name': 'asc'
                }
            ],
            include: {
                groupe: true
            }
        });
    },
    getLocationWithWorkTime: async function (id: string) {
        let response = await prismaClient.location.findUnique({
            where: {
                LocationID: parseInt(id ?? "")
            },
            include: {
                worktime: true
            }
        });
        return response;
    }
};

export default InformationService;