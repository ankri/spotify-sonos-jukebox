import { Collection } from "@custom-types/Collection";
import { Track } from "@custom-types/Track";
import * as fs from "fs";

import initialTracks from "./database/tracks.json";
import initialMusicCollection from "./database/music.json";
import initialAudiobooks from "./database/audiobooks.json";
import initialStories from "./database/stories.json";

const musicCollection: Collection[] = initialMusicCollection.map(
  (collection, index) => ({
    ...collection,
    type: "music",
    imageUrl: collection.imageUrl ?? null,
    artist: collection.artist ?? null,
    index,
  })
);
const audiobooks: Collection[] = initialAudiobooks.map((collection, index) => ({
  ...collection,
  type: "audiobook",
  imageUrl: (collection as any).imageUrl ?? null,
  artist: collection.artist ?? null,
  index,
}));

const stories: Collection[] = initialStories.map((collection, index) => ({
  ...collection,
  type: "story",
  imageUrl: (collection as any).imageUrl ?? null,
  artist: collection.artist ?? null,
  index,
}));
const tracks: Track[] = initialTracks;

export const getTrackInfo = (mediaUri: string): Promise<Track | undefined> => {
  return Promise.resolve(tracks.find((track) => track.mediaUri === mediaUri));
};

export const getCollectionInfo = (
  mediaUri: string
): Promise<Collection | undefined> => {
  return Promise.resolve(
    [...musicCollection, ...audiobooks, ...stories].find(
      (collection) => collection.mediaUri === mediaUri
    )
  );
};

export const getMusicCollection = (): Promise<Collection[]> => {
  return Promise.resolve(musicCollection);
};

export const getAllAudiobooks = (): Promise<Collection[]> => {
  return Promise.resolve(audiobooks);
};

export const getAllStories = (): Promise<Collection[]> => {
  return Promise.resolve(stories);
};
