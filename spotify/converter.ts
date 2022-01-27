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

export const getSpotifyAlbumUriFromAlbumId = (albumId: string) =>
  `spotify:album:${albumId}`;

export const getAlbumIdFromSpotifyUri = (spotifyUri: string) =>
  spotifyUri.replace("spotify:album:", "");

export const getSpotifyTrackUriFromId = (trackId: string) =>
  `spotify:track:${trackId}`;

export const getTrackIdFromSpotifyTrackUri = (spotifyTrackUri: string) =>
  spotifyTrackUri.replace("spotify:track:", "");
