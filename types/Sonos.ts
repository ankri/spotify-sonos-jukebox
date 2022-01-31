export type PlaybackState =
  | "PAUSED_PLAYBACK"
  | "PLAYING"
  | "TRANSITIONING"
  | "STOPPED";

export interface SonosTrack {
  absoluteAlbumArtUri: string;
  album: string;
  artist: string;
  duration: number;
  stationName: string;
  title: string;
  trackUri: string;
  type: "track" | "?";
  uri: string;
}

export type SimpleSonosTrack = Pick<
  SonosTrack,
  "album" | "absoluteAlbumArtUri" | "artist" | "title" | "uri"
>;

export interface SonosState {
  currentTrack: SonosTrack;
  elapsedTime: number;
  elapsedTimeFormatted: string;
  equalizer: {
    bass: number;
    treble: number;
    loudness: boolean;
  };
  mute: boolean;
  nextTrack: Omit<SonosTrack, "type" | "stationName">;
  playMode: { repeat: "none" | "?"; shuffle: boolean; crossfade: boolean };
  playbackState: PlaybackState;
  trackNo: number;
  volume: number;
}
