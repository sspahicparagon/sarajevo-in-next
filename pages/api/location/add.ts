// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { LocationService } from '../../../services/LocationService';
import { LocationFull } from '../../../interfaces/LocationOverride';
import { parseOnlyFields } from '../../../lib/parse-form';


export const config = {
    api: {
        bodyParser: true
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({
        data: null,
        error: "Method Not Allowed",
      }); 
  }
  let locationSaveResult: LocationFull = {'Name': 'Test'};
  const { body }: { body: { Latitude: string, Longitude: string, Image: string, Name: string, GroupeID: number } } = req;
  
  let result = await LocationService.saveLocation(body.Name, body.GroupeID, body.Latitude, body.Longitude, body.Image);

  return res.status(200).json(locationSaveResult);
}