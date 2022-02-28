import { CollectionTypes } from "@custom-types/Collection";
import * as SpotifyApi from "@spotify/api";
import * as Converter from "@spotify/converter";
import { prisma } from "@database/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const { mediaId, mediaType, collectionType } = JSON.parse(req.body) as {
      mediaId: string;
      mediaType: "album" | "playlist";
      collectionType: keyof typeof CollectionTypes;
    };
    if (mediaType == "album") {
      const albumInfo = await SpotifyApi.getAlbumInfo(mediaId);
      const numberOfCollections = await prisma.collection.count({
        where: {
          type: collectionType,
        },
      });
      const collection = await prisma.collection.create({
        data: {
          mediaUri: Converter.getSpotifyPlaylistUriFromPlaylistId(mediaId),
          name: albumInfo.name,
          artist: albumInfo.artists[0].name,
          type: collectionType,
          index: numberOfCollections + 1,
        },
      });
      return res.json(collection);
    } else if (mediaType === "playlist") {
      const playlistInfo = await SpotifyApi.getPlaylistInfo(mediaId);
      const numberOfCollections = await prisma.collection.count({
        where: {
          type: collectionType,
        },
      });
      const collection = await prisma.collection.create({
        data: {
          mediaUri: Converter.getSpotifyPlaylistUriFromPlaylistId(mediaId),
          name: playlistInfo.name,
          type: collectionType,
          index: numberOfCollections + 1,
        },
      });
      return res.json(collection);
    } else {
      return res.status(400).send(`Unsupported mediaType: ${mediaType}`);
    }
  } else {
    return res.status(405).send("Unsupported method");
  }
};

export default handler;
