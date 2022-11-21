import { trackimage } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<trackimage[]>
) {
    let response = await prisma.trackimage.findMany();
    res.status(200).send(response);
}