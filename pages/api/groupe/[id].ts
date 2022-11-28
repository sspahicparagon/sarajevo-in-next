// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groupe, location } from '@prisma/client'
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<groupe & { location: location[] } | null>
) {
    let id: string | undefined = req.query.id?.toLocaleString();
    let response = await prisma.groupe.findUnique({
        where: {
            GroupeID: parseInt(id ?? "")
        },
        include: {
            location: true
        }
    });
    res.status(200).json(response);
}


