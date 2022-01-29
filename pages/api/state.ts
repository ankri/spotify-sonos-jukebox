import type { NextApiRequest, NextApiResponse } from "next";
import * as SonosApi from "@sonos/api";
import { SonosState } from "@custom-types/Sonos";

let previousState: SonosState | null = null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SonosState>
) {
  const data = await SonosApi.getState();
  if (
    data.currentTrack.title.includes("google-") &&
    data.currentTrack.title.endsWith(".mp3")
  ) {
    if (previousState !== null) {
      res.json(previousState);
    } else {
      res.json(data);
    }
  } else {
    previousState = data;
    res.json(data);
  }
}
