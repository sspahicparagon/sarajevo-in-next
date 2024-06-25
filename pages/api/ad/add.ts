// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseForm } from '../../../lib/parse-form';
import { CustomAdFull } from '../../../interfaces/CustomAd';
import { AdService } from '../../../services/AdService';
import { FileService } from '../../../services/FileService';
import { CustomAdFactory } from '../../../factory/CustomAdFactory';


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
  };

  let adSaveResult: CustomAdFull = {};
  const { fields, files } = await parseForm(req);

  try {
    adSaveResult = await AdService.saveAd(CustomAdFactory.createCustomAdFromFormFields(fields));
  } catch (e) {
    console.log('Exception happened while creating Custom Ad.', { e });
  }

  if (adSaveResult == undefined || !adSaveResult?.CustomAdID) return res.status(500).json(adSaveResult);

  let savedImageLocation = await FileService.uploadImageToRemoteServer(files, 'ads');

  if (savedImageLocation == '') {
    await AdService.deleteAd(adSaveResult.CustomAdID);
    return res.status(500).json(adSaveResult);
  }

  adSaveResult = await AdService.saveAdImage(adSaveResult.CustomAdID!, savedImageLocation);

  return res.status(200).json(adSaveResult);
}