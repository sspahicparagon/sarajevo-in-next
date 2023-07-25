// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
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
  if (req.method !== "DELETE") {
      res.setHeader("Allow", "DELETE");
      return res.status(405).json({
        data: null,
        error: "Method Not Allowed",
      }); 
  }
  const { eventID }: { eventID: string } = req.body;
  
  let result = await EventService.deleteEvent(eventID)

  return res.status(200).json(result);
}