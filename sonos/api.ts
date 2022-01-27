import config from "@config/config.json";
import * as Converter from "@spotify/converter";
import { SonosState } from "@custom-types/Sonos";

export type AvailableCommands = "play" | "pause" | "next" | "previous";
export const availableCommands: Set<AvailableCommands> = new Set();
availableCommands.add("play");
availableCommands.add("pause");
availableCommands.add("next");
availableCommands.add("previous");

export const sendCommand = async (
  command: AvailableCommands
): Promise<void> => {
  if (!availableCommands.has(command)) {
    throw new Error(`Invalid command: ${command}`);
  } else {
    const response = await fetch(
      `${config.api.url}/${config.api.room}/${command}`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.status !== "success") {
        throw new Error(data);
      }
    } else {
      throw new Error("Fetch ran into an error.");
    }
  }
};

export type AvailableVolumePresets = keyof typeof config.volumes;
export const availableVolumePresets: Set<AvailableVolumePresets> = new Set();
availableVolumePresets.add("preset-0");
availableVolumePresets.add("preset-1");
availableVolumePresets.add("preset-2");
availableVolumePresets.add("preset-3");
availableVolumePresets.add("preset-4");

export const setVolume = async (
  volumePreset: AvailableVolumePresets
): Promise<void> => {
  const volume = config.volumes[volumePreset] ?? 25;

  const response = await fetch(
    `${config.api.url}/${config.api.room}/volume/${volume}`
  );

  if (response.ok) {
    const data = await response.json();
    if (data.status !== "success") {
      throw new Error(data);
    }
  } else {
    throw new Error("Setting volume ran into an error.");
  }
};

export const playAlbum = async (albumId: string, trackNumber?: string) => {
  const albumUri = `spotify:album:${albumId}`;

  console.log(`playing album: ${albumUri} ${trackNumber}`);

  await fetch(`${config.api.url}/${config.api.room}/clearqueue`);
  await fetch(`${config.api.url}/${config.api.room}/spotify/now/${albumUri}`);
  if (trackNumber && parseInt(trackNumber) > 1) {
    await fetch(
      `${config.api.url}/${config.api.room}/trackseek/${trackNumber}`
    );
  }
};

export const getState = async (): Promise<SonosState> => {
  const response = await fetch(`${config.api.url}/${config.api.room}/state`);
  const data: SonosState = await response.json();

  return {
    ...data,
    currentTrack: {
      ...data.currentTrack,
      uri:
        Converter.getSpotifyUriFromSonosUri(data.currentTrack.uri) ?? "unknown",
      trackUri:
        Converter.getSpotifyUriFromSonosUri(data.currentTrack.uri) ?? "unknown",
    },
    nextTrack: {
      ...data.nextTrack,
      uri:
        Converter.getSpotifyUriFromSonosUri(data.currentTrack.uri) ?? "unknown",
      trackUri:
        Converter.getSpotifyUriFromSonosUri(data.currentTrack.uri) ?? "unknown",
    },
  };
};

export const textToSpeech = async (text: string): Promise<void> => {
  await fetch(
    `${config.api.url}/${config.api.room}/say/${text}/${config.tts.locale}/${config.volumes["preset-2"]}`
  );
};
