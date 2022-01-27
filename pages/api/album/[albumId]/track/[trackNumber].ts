import * as SonosApi from "@sonos/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  try {
    const albumId = req.query.albumId as string;
    const trackNumber = req.query.trackNumber as string;

    await SonosApi.playAlbum(albumId, trackNumber);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(500).end(error);
  }
}
