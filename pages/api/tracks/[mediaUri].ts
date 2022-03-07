import * as Spotify from "@spotify/api";
import * as Converter from "@spotify/converter";
import { prisma } from "@database/prisma";
import { NextApiHandler } from "next";
import { Track } from "@prisma/client";
import { imageCache } from "@cache/cache";

const handler: NextApiHandler = async (req, res) => {
  const mediaUri = req.query.mediaUri as string;

  // TODO validate mediaUri

  if (req.method === "GET") {
    const spotifyTracks = await Spotify.getTrackListForMediaUri(mediaUri);
    const databaseTracks = await prisma.track.findMany({
      where: {
        mediaUri: {
          in: spotifyTracks.map((track) => track.uri),
        },
      },
    });
    const tracks = Converter.mergeTracks(spotifyTracks, databaseTracks);
    res.status(200).json(tracks);
  } else if (req.method === "PUT") {
    const trackMediaUri = mediaUri;
    const trackInfo = JSON.parse(req.body) as Track;

    await prisma.track.upsert({
      where: {
        mediaUri: trackMediaUri,
      },
      create: {
        mediaUri: trackMediaUri,
        name: trackInfo.name,
        artist: trackInfo.artist,
        imageUrl: trackInfo.imageUrl,
      },
      update: {
        name: trackInfo.name,
        artist: trackInfo.artist,
        imageUrl: trackInfo.imageUrl ?? null,
      },
    });

    imageCache.delete(trackMediaUri);

    res.status(200).send("Updated");
  } else {
    return res.status(405).send("Unsupported method");
  }
};

export default handler;
