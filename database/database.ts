import { Collection } from "@custom-types/Collection";
import { Track } from "@custom-types/Track";
import * as fs from "fs";

import initialTracks from "./database/tracks.json";
import initialMusicCollection from "./database/music.json";
import initialAudiobooks from "./database/audiobooks.json";
import initialStories from "./database/stories.json";

const musicCollection: Collection[] = initialMusicCollection;
const audiobooks: Collection[] = initialAudiobooks;
const stories: Collection[] = initialStories;
const tracks: Track[] = initialTracks;

export const getTrackInfo = (mediaUri: string): Track | undefined => {
  return tracks.find((track) => track.mediaUri === mediaUri);
};

export const getMusicInfo = (mediaUri: string): Collection | undefined => {
  return musicCollection.find((music) => music.mediaUri === mediaUri);
};

export const getCollectionInfo = (mediaUri: string): Collection | undefined => {
  return [...musicCollection, ...audiobooks].find(
    (collection) => collection.mediaUri === mediaUri
  );
};

export const getMusicCollection = () => {
  return musicCollection;
};

export const getAllAudiobooks = () => {
  return audiobooks;
};

export const getAllStories = () => {
  return stories;
};
