import * as SonosApi from "@sonos/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  try {
    const [command, argument] = req.query.command as string[];

    if (command !== "volume" && command !== "seek") {
      if (SonosApi.availableCommands.has(command as any)) {
        await SonosApi.sendCommand(command as SonosApi.AvailableCommands);
        res.status(200).end();
      } else {
        res.status(400).end(`Invalid command ${command}`);
      }
    } else if (command === "seek") {
      try {
        const trackNumber = parseInt(argument, 10);
        await SonosApi.playTrack(trackNumber);
        res.status(200).end();
      } catch (error) {
        res.status(400).end(`Invalid track number ${argument}`);
      }
    } else {
      if (SonosApi.availableVolumePresets.has(argument as any)) {
        await SonosApi.setVolume(argument as SonosApi.AvailableVolumePresets);
        res.status(200).end();
      } else {
        res.status(400).end(`Invalid volume preset ${argument}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).end(error);
  }
}
