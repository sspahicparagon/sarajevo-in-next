// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { groupe, location } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<(groupe & { location: location[] })[]>
) {
    // let response = await prisma.groupe.findMany({
    //     include: {
    //         location: {
    //             orderBy: {
    //                 Name: 'asc'
    //             }
    //         }
    //     }
    // })
    // response.sort((first: groupe & { location: location[] }, second: groupe & { location: location[] }) => {
    //     return second.location.length - first.location.length;
    // })
    res.status(200);
}


