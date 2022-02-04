import { Collection as PrismaCollection } from "@prisma/client";

export type Collection = PrismaCollection;

export const CollectionTypes = {
  audiobook: "audiobook",
  music: "music",
  story: "story",
};
