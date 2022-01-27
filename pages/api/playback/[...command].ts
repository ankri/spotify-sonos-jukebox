import * as SonosApi from "@sonos/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  try {
    const [command, volumePreset] = req.query.command as string[];

    if (command !== "volume") {
      if (SonosApi.availableCommands.has(command as any)) {
        await SonosApi.sendCommand(command as SonosApi.AvailableCommands);
        res.status(200).end();
      } else {
        res.status(400).end(`Invalid command ${command}`);
      }
    } else {
      if (SonosApi.availableVolumePresets.has(volumePreset as any)) {
        await SonosApi.setVolume(
          volumePreset as SonosApi.AvailableVolumePresets
        );
        res.status(200).end();
      } else {
        res.status(400).end(`Invalid volume preset ${volumePreset}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).end(error);
  }
}
