import { getConfig } from "@config/config";
import * as Converter from "@spotify/converter";
import { SimpleSonosTrack, SonosState } from "@custom-types/Sonos";
import { Config } from "@custom-types/Config";

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
    const config = await getConfig();

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

export type AvailableVolumePresets = keyof Config["volumes"];
export const availableVolumePresets: Set<AvailableVolumePresets> = new Set();
availableVolumePresets.add("preset-0");
availableVolumePresets.add("preset-1");
availableVolumePresets.add("preset-2");
availableVolumePresets.add("preset-3");
availableVolumePresets.add("preset-4");

export const setVolume = async (
  volumePreset: AvailableVolumePresets
): Promise<void> => {
  const config = await getConfig();

  // only allow positive (incl. 0 but wwyd that?) integers
  let volume = Math.floor(Math.abs(config.volumes[volumePreset])) ?? 25;
  if (volume > 100) {
    volume = 100;
  }

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
  const config = await getConfig();
  const albumUri = Converter.getSpotifyAlbumUriFromAlbumId(albumId);

  console.log(`playing album: ${albumUri} track #${trackNumber}`);

  await fetch(`${config.api.url}/${config.api.room}/clearqueue`);
  await fetch(`${config.api.url}/${config.api.room}/spotify/now/${albumUri}`);
  // there is a bug trying to directly seek the first track after choosing an album/playlist.
  // but it plays automatically anyways so we can just skip the call
  if (trackNumber && parseInt(trackNumber) > 1) {
    await fetch(
      `${config.api.url}/${config.api.room}/trackseek/${trackNumber}`
    );
  }
};

export const playPlaylist = async (
  playlistId: string,
  trackNumber?: string
) => {
  const config = await getConfig();
  const playlistUri = Converter.getSpotifyPlaylistUriFromPlaylistId(playlistId);

  console.log(`playing playlist: ${playlistUri} ${trackNumber}`);

  await fetch(`${config.api.url}/${config.api.room}/clearqueue`);
  await fetch(
    `${config.api.url}/${config.api.room}/spotify/now/${playlistUri}`
  );
  if (trackNumber && parseInt(trackNumber) > 1) {
    await fetch(
      `${config.api.url}/${config.api.room}/trackseek/${trackNumber}`
    );
  }
};

export const playTrack = async (trackNumber: number) => {
  const config = await getConfig();
  await fetch(`${config.api.url}/${config.api.room}/trackseek/${trackNumber}`);
};

export const getState = async (): Promise<SonosState> => {
  const config = await getConfig();
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
  const config = await getConfig();

  await fetch(
    `${config.api.url}/${config.api.room}/say/${text}/${config.tts.locale}/${config.volumes["preset-2"]}`
  );
};

export const getQueue = async (): Promise<SimpleSonosTrack[]> => {
  const config = await getConfig();

  const response = await fetch(
    `${config.api.url}/${config.api.room}/queue/detailed`
  );
  const queue = (await response.json()) as SimpleSonosTrack[];

  return queue.map((track) => ({
    ...track,
    uri: Converter.getSpotifyUriFromSonosUri(track.uri) ?? "unknown",
  }));
};
