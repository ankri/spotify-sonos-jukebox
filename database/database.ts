import { Artist } from "@custom-types/Artist";
import { Collection, CollectionTypes } from "@custom-types/Collection";
import { Track } from "@custom-types/Track";
import { prisma } from "./prisma";

export const getTrackInfo = async (mediaUri: string): Promise<Track | null> => {
  return prisma.track.findUnique({
    where: {
      mediaUri,
    },
  });
};

export const getCollectionInfo = (
  mediaUri: string
): Promise<Collection | null> => {
  return prisma.collection.findUnique({
    where: {
      mediaUri,
    },
  });
};

export const getMusicCollection = (): Promise<Collection[]> => {
  return prisma.collection.findMany({
    where: {
      type: CollectionTypes.music,
    },
    orderBy: {
      index: "asc",
    },
  });
};

export const getAllAudiobooks = (): Promise<Collection[]> => {
  return prisma.collection.findMany({
    where: {
      type: CollectionTypes.audiobook,
    },
    orderBy: {
      index: "asc",
    },
  });
};

export const getAllStories = (artist?: string): Promise<Collection[]> => {
  return prisma.collection.findMany({
    where: {
      type: CollectionTypes.story,
      artist,
    },
    orderBy: {
      index: "asc",
    },
  });
};

export const getArtistInfo = (mediaUri: string): Promise<Artist | null> => {
  return prisma.artist.findUnique({
    where: {
      mediaUri,
    },
  });
};

export const getArtists = (
  collectionType: keyof typeof CollectionTypes
): Promise<Artist[]> => {
  return prisma.artist.findMany({
    where: {
      type: collectionType,
    },
    orderBy: {
      index: "asc",
    },
  });
};
