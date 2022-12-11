// import { Prisma } from "@prisma/client";
import axios from "axios";
import prisma from '../lib/prisma'


// const locationWithoutCreatedAt = Prisma.validator<Prisma.locationFindUniqueArgsBase>()({
//     where: {
//         LocationID: 1
//     },
//     select: {
//         LocationID: true,
//         Name: true,
//         Phone: true,
//         Website: true,
//         Image: true,
//         Adresa: true,
//         Latitude: true,
//         Longitude: true,
//         CreatedAt: false,
//         GroupeID: true
//     }
// });

const InformationService = {
    // getInformationForItem: async function (id: string) {
    //     let result;

    //     try {
    //         result = await axios({
    //             method: 'get',
    //             url: '/api/location/' + id
    //         });
    //     } catch (e) {
    //         return Promise.resolve({});
    //     }
    //     return result?.data;
    // },
    getLocationWithouthCreatedAt: async () => {
        return await prisma.location.findUnique({
            where: { LocationID: 1 },
            select: {
                LocationID: true,
                Name: true,
                Phone: true,
                Website: true,
                Image: true,
                Adresa: true,
                Latitude: true,
                Longitude: true,
                CreatedAt: false,
                GroupeID: true,
                Description: true
            }
        });
    },
    getAllLocationsWithouthCreatedAt: async () => {
        return await prisma.location.findMany();
    },
    getLocationWithouthCreatedAtForItem: async function (id: string) {
        let response = await prisma.location.findUnique({
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