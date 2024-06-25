// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { parseForm } from '../../../../lib/parse-form';
import { CustomAdFactory } from '../../../../factory/CustomAdFactory';
import { AdService } from '../../../../services/AdService';
import { CustomAdTypeFull } from '../../../../interfaces/CustomAd';


export const config = {
  api: {
    bodyParser: false
  }
};
const SUCCESSFUL_FILE_UPLOAD: number = 226;
const IMAGE_EXTENSION_WITH_BEST_QUALITY: string = "";


const fileUploadConfig: { quality: number, nameExtended: string }[] = [
  { quality: 30, nameExtended: '-1' },
  { quality: 100, nameExtended: '' }
];

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
  }
  let adTypeSaveResult: CustomAdTypeFull = {};
  const { fields, files } = await parseForm(req);
  const parsedFields = CustomAdFactory.createCustomAdTypeFromFormFields(fields);

  const existingAdType = await AdService.getAdType(parsedFields.CustomAdTypeID!);

  if (!existingAdType || existingAdType == null) return res.status(400).json(adTypeSaveResult);

  try {
    adTypeSaveResult = await AdService.saveAdType(parsedFields)
  } catch (e) {
    console.log('Exception happened while saving Custom Ad.', { e });
  }

  return res.status(200).json(adTypeSaveResult);
}