import audiobooks from "../database/database/audiobooks.json";
import music from "../database/database/music.json";
import stories from "../database/database/stories.json";
import tracks from "../database/database/tracks.json";
import { PrismaClient } from "@prisma/client";
import { CollectionTypes } from "../types/Collection";

const prisma = new PrismaClient();

async function main() {
  console.log("seeding audiobooks");
  let audiobookIndex = 0;
  for (const audiobook of audiobooks) {
    await prisma.collection.upsert({
      where: {
        mediaUri: audiobook.mediaUri,
      },
      create: {
        ...audiobook,
        type: CollectionTypes.audiobook,
        index: audiobookIndex,
      },
      update: {
        ...audiobook,
        index: audiobookIndex,
      },
    });

    audiobookIndex++;
  }

  console.log("seeding music");
  let musicIndex = 0;
  for (const musicCollection of music) {
    await prisma.collection.upsert({
      where: {
        mediaUri: musicCollection.mediaUri,
      },
      create: {
        ...musicCollection,
        type: CollectionTypes.music,
        index: musicIndex,
      },
      update: {
        ...musicCollection,
        index: musicIndex,
      },
    });

    musicIndex++;
  }

  console.log("seeding stories");
  let storyIndex = 0;
  for (const story of stories) {
    await prisma.collection.upsert({
      where: {
        mediaUri: story.mediaUri,
      },
      create: {
        ...story,
        type: CollectionTypes.story,
        index: storyIndex,
      },
      update: {
        ...story,
        index: storyIndex,
      },
    });

    storyIndex++;
  }

  console.log("seeding tracks");
  for (const track of tracks) {
    await prisma.track.upsert({
      where: {
        mediaUri: track.mediaUri,
      },
      create: {
        ...track,
      },
      update: {
        ...track,
      },
    });
  }
}

main()
  .then(() => {})
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
