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
    console.log({q: req.query})
    let startDateString: string | undefined = '';
    let endDateString: string | undefined = '';
    let startDate: Date = new Date();
    let endDate: Date = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());

    if(req.body == undefined) {
        startDateString = req.query.startDate?.toString();
        endDateString = req.query.endDate?.toString();
    }
    else {
        startDateString = req.body.startDate;
        endDateString = req.body.endDate;
    }
    if(startDateString && endDateString) {
        startDate = new Date(startDateString);
        endDate = new Date(endDateString)
    }
//   const { startDate, endDate } = req.body;

  let result = await EventService.getEventsFromDateRange(startDate, endDate);

  return res.status(200).json(result);
}