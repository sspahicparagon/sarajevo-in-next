// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groupe, location, PrismaClient, worktime } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient();
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<location & { worktime: worktime[] } | null>
) {
    let id: string | undefined = req.query.id?.toLocaleString();
    let response = await prisma.location.findUnique({
        where: {
            LocationID: parseInt(id ?? "")
        },
        include: {
            worktime: true
        }
    });

    res.status(200).json(response);
}


