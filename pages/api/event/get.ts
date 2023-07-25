// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '../../../lib/prisma';
import EventService from '../../../services/EventService';


export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  const { startDate, endDate } = req.body;

  let result = await EventService.getEventsFromDateRange(startDate, endDate);
}