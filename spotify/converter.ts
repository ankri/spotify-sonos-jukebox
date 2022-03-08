import { Track } from "@custom-types/Track";

export const getSpotifyUriFromSonosUri = (uri: string): string | null => {
  const spotifyTrackRegExp = new RegExp(/x\-sonos\-spotify\:(.+)\?.+/gi);

  if (uri.startsWith("x-sonos-spotify")) {
    const cleanUri = spotifyTrackRegExp.exec(uri);
    if (cleanUri === null || cleanUri.length < 2) {
      return null;
    } else {
      return decodeURIComponent(cleanUri[1]);
    }
  } else {
    return null;
  }
};

export const normalizePlaylistUri = (spotifyUri: string) =>
  spotifyUri.replace("spotify:user:spotify:playlist:", "spotify:playlist:");

export const getPlaylistIdFromSpotifyUri = (spotifyUri: string) =>
  spotifyUri.replace("spotify:user:spotify:playlist:", "");

export const getSpotifyPlaylistUriFromPlaylistId = (playlistId: string) =>
  `spotify:user:spotify:playlist:${playlistId}`;

export const getSpotifyAlbumUriFromAlbumId = (albumId: string) =>
  `spotify:album:${albumId}`;

export const getAlbumIdFromSpotifyUri = (spotifyUri: string) =>
  spotifyUri.replace("spotify:album:", "");

export const getSpotifyTrackUriFromId = (trackId: string) =>
  `spotify:track:${trackId}`;

export const getTrackIdFromSpotifyTrackUri = (spotifyTrackUri: string) =>
  spotifyTrackUri.replace("spotify:track:", "");

export const mergeTracks = (
  spotifyTracks: SpotifyApi.TrackObjectSimplified[],
  databaseTracks: Track[]
): Track[] => {
  return spotifyTracks.map((spotifyTrack) => {
    const maybeTrack = databaseTracks.find(
      (databaseTrack) => databaseTrack.mediaUri === spotifyTrack.uri
    );
    return {
      artist: maybeTrack?.artist ?? spotifyTrack.artists[0].name,
      imageUrl: maybeTrack?.imageUrl ?? null,
      mediaUri: spotifyTrack.uri,
      name: maybeTrack?.name ?? spotifyTrack.name,
    };
  });
};

export const getArtistIdFromSpotifyArtistId = (spotifyArtistUri: string) =>
  spotifyArtistUri.replace("spotify:artist:", "");
