// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { LocationService } from '../../../services/LocationService';


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
  let { id } = req.query;
  if(!id) id = '-1';
  
  let result = await LocationService.deleteLocation(id.toString());

  return res.status(200).json(result);
}