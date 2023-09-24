// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import EventService from '../../../services/EventService';
import { FileService } from '../../../services/FileService';


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
  
  let existingEvent = await EventService.getEvent(eventID);

  if(!existingEvent || existingEvent == null) return res.status(400).json("No such event exists.");
  let result = await EventService.deleteEvent(eventID);

  if(existingEvent.Image != 'TEMPORARY')
    await FileService.removeImageFromRemoteServer(existingEvent.Image!);

  return res.status(200).json(result);
}