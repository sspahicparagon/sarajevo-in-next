// import { Prisma, groupe } from '@prisma/client';
import axios from 'axios';
import prisma from '../lib/prisma';

// const groupeWithLocationWithouthCreatedAt = Prisma.validator<Prisma.groupeArgs>()({
//     select: {
//         GroupeID: true,
//         Name: true,
//         location: {
//             select: {
//                 LocationID: true,
//                 Name: true,
//                 Phone: true,
//                 Website: true,
//                 Image: true,
//                 Adresa: true,
//                 Latitude: true,
//                 Longitude: true,
//                 CreatedAt: false,
//                 GroupeID: true
//             }
//         },
//     }
// })

const GroupService = {
    // getGroupes: async function () {
    //     let result;

    //     try {
    //         result = await axios({
    //             method: 'get',
    //             url: 'api/groupe'
    //         });
    //     } catch (e) {
    //         return Promise.resolve([]);
    //     }

    //     return result?.data;
    // },
    getGroupeWithLocationWithouthCreatedAt: async () => {
        let response = await prisma.groupe.findMany({
            include: {
                location: true
            }
        });
        return response;
    }
}

export default GroupService;