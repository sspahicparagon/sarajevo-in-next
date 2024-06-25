// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseForm } from '../../../../lib/parse-form';
import { CustomAdTypeFull } from '../../../../interfaces/CustomAd';
import { AdService } from '../../../../services/AdService';
import { CustomAdFactory } from '../../../../factory/CustomAdFactory';


export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  let adSaveResult: CustomAdTypeFull = {};
  const { fields, files } = await parseForm(req);

  try {
    adSaveResult = await AdService.saveAdType(CustomAdFactory.createCustomAdTypeFromFormFields(fields));
  } catch (e) {
    console.log('Exception happened while creating Custom Ad.', { e });
  }

  if (adSaveResult == undefined || !adSaveResult?.CustomAdTypeID) return res.status(500).json(adSaveResult);

  return res.status(200).json(adSaveResult);
}