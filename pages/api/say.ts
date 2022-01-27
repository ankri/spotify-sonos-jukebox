import type { NextApiRequest, NextApiResponse } from "next";
import * as SonosApi from "@sonos/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method === "POST") {
    const { text } = JSON.parse(req.body);
    if (text && typeof text === "string" && text.length > 0) {
      await SonosApi.textToSpeech(text);
      res.status(200).end("Text successfully sent");
    } else {
      res.status(400).end("No text attribute found in json body.");
    }
  } else {
    res.status(405).end("Only POST allowed");
  }
}
