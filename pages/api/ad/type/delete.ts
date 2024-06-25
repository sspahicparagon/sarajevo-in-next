// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AdService } from '../../../../services/AdService';


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
  const { normalAdTypeID }: { normalAdTypeID: string } = req.body;

  let existingAdType = await AdService.getAdType(normalAdTypeID);

  if (!existingAdType || existingAdType == null) return res.status(400).json("No such ad type exists.");
  let result = await AdService.deleteAdType(normalAdTypeID);

  return res.status(200).json(result);
}