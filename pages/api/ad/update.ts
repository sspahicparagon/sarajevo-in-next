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

  if (req.method !== "PUT") {
    res.setHeader("Allow", "PUT");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  };

  let adSaveResult: CustomAdFull = {};
  const { fields, files } = await parseForm(req);
  const parsedFields = CustomAdFactory.createCustomAdFromFormFields(fields)

  if (!parsedFields.CustomAdID) return res.status(400).json(adSaveResult);

  const existingAd = await AdService.getAd(parsedFields.CustomAdID);

  if (!existingAd || existingAd == null) return res.status(400).json(adSaveResult);

  if (Object.keys(files).length > 0 && existingAd.Image != 'TEMPORARY') {
    let removeResult = await FileService.removeImageFromRemoteServer(existingAd.Image!, 'ads');

    if (!removeResult) return res.status(500).json(adSaveResult);
  }

  try {
    adSaveResult = await AdService.saveAd(parsedFields);

    if (Object.keys(files).length == 0) return res.status(200).json(adSaveResult);
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