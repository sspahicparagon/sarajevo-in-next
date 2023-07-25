// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prismaClient from '../../../lib/prisma';
import EventService from '../../../services/EventService';


export const config = {
    api: {
        bodyParser: true
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method !== "PUT") {
      res.setHeader("Allow", "PUT");
      return res.status(405).json({
        data: null,
        error: "Method Not Allowed",
      }); 
  }
  const { date, eventID }: { date: string, eventID: string } = req.body;
  
  let dateWithOffset = new Date(new Date(date).getTime() - new Date(date).getTimezoneOffset()*60000);
  let result = await EventService.editEventRecurring(dateWithOffset, eventID)

  return res.status(200).json(result);
}