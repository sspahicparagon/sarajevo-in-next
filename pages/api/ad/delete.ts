// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AdService } from '../../../services/AdService';
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
  const { id }: { id: string } = req.body;

  let existingAd = await AdService.getAd(id);

  if (!existingAd || existingAd == null) return res.status(400).json("No such ad exists.");
  let result = await AdService.deleteAd(id);

  let removeResult = await FileService.removeImageFromRemoteServer(existingAd.Image!, 'ads');

  if (!removeResult) return res.status(500).json(existingAd);

  return res.status(200).json(result);
}