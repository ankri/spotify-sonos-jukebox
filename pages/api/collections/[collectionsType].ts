import { Collection } from "@custom-types/Collection";
import { CollectionTypes } from "@custom-types/Collection";
import * as SpotifyApi from "@spotify/api";
import * as Converter from "@spotify/converter";
import { prisma } from "@database/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const collectionsType = req.query
    .collectionsType as keyof typeof CollectionTypes;

  if (req.method === "GET") {
    const collections = await prisma.collection.findMany({
      where: {
        type: collectionsType,
      },
      orderBy: {
        index: "asc",
      },
    });
    res.status(200).json(collections);
  } else if (req.method === "PUT") {
    const data = JSON.parse(req.body) as Collection;
    await prisma.collection.update({
      where: {
        mediaUri: data.mediaUri,
      },
      data,
    });
    res.unstable_revalidate(`/${data.type}`);
    res.status(200).send("Updated");
  } else if (req.method === "POST") {
    const { mediaId, mediaType } = JSON.parse(req.body) as {
      mediaId: string;
      mediaType: "album" | "playlist";
    };

    if (mediaType == "album") {
      const albumInfo = await SpotifyApi.getAlbumInfo(mediaId);
      const numberOfCollections = await prisma.collection.count({
        where: {
          type: collectionsType,
        },
      });
      const collection = await prisma.collection.create({
        data: {
          mediaUri: Converter.getSpotifyAlbumUriFromAlbumId(mediaId),
          name: albumInfo.name,
          artist: albumInfo.artists[0].name,
          type: collectionsType,
          index: numberOfCollections + 1,
        },
      });
      return res.json(collection);
    } else if (mediaType === "playlist") {
      const playlistInfo = await SpotifyApi.getPlaylistInfo(mediaId);
      const numberOfCollections = await prisma.collection.count({
        where: {
          type: collectionsType,
        },
      });
      const collection = await prisma.collection.create({
        data: {
          mediaUri: Converter.getSpotifyPlaylistUriFromPlaylistId(mediaId),
          name: playlistInfo.name,
          type: collectionsType,
          index: numberOfCollections + 1,
        },
      });
      return res.json(collection);
    } else {
      return res.status(400).send(`Unsupported mediaType: ${mediaType}`);
    }
  } else if (req.method === "DELETE") {
    const data = JSON.parse(req.body) as { mediaUri: string };
    await prisma.collection.delete({
      where: {
        mediaUri: data.mediaUri,
      },
    });
    res.unstable_revalidate(`/${collectionsType}`);
    res
      .status(200)
      .send(`Successfully deleted collection with mediaUri: ${data.mediaUri}`);
  } else {
    return res.status(405).send("Unsupported method");
  }
};

export default handler;
