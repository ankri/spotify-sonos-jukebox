import SpotifyWebApi from "spotify-web-api-node";
import * as Converter from "./converter";
import { getConfig } from "@config/config";

let spotifyApi: SpotifyWebApi | null = null;

const updateAccessToken = async () => {
  if (spotifyApi === null) {
    const config = await getConfig();
    spotifyApi = new SpotifyWebApi({
      clientId: config.spotify.clientId,
      clientSecret: config.spotify.clientSecret,
    });
  }

  const tokenResponse = await spotifyApi.clientCredentialsGrant();
  const accessToken = tokenResponse.body.access_token;
  spotifyApi.setAccessToken(accessToken);
  return spotifyApi;
};

export const getTrackListForAlbum = async (spotifyAlbumId: string) => {
  const spotifyApi = await updateAccessToken();
  const tracksResponse = await spotifyApi.getAlbumTracks(spotifyAlbumId);

  return tracksResponse.body.items;
};

export const getTrackInfo = async (id: string) => {
  const spotifyApi = await updateAccessToken();

  const trackResponse = await spotifyApi.getTrack(id);
  return trackResponse.body;
};

export const getPlaylistInfo = async (id: string) => {
  const spotifyApi = await updateAccessToken();

  const playlistResponse = await spotifyApi.getPlaylist(id);
  return playlistResponse.body;
};

export const getArtistInfo = async (id: string) => {
  const spotifyApi = await updateAccessToken();

  const artistResponse = await spotifyApi.getArtist(id);
  return artistResponse.body;
};

export const getTrackListForPlaylist = async (spotifyPlaylistId: string) => {
  const spotifyApi = await updateAccessToken();

  const playlistResponse = await spotifyApi.getPlaylistTracks(
    spotifyPlaylistId
  );
  return playlistResponse.body.items;
};

export const getTrackListForMediaUri = async (mediaUri: string) => {
  // TODO add mediaUri validation
  if (mediaUri.includes(":album:")) {
    return getTrackListForAlbum(Converter.getAlbumIdFromSpotifyUri(mediaUri));
  } else if (mediaUri.includes(":playlist:")) {
    const items = await getTrackListForPlaylist(
      Converter.getPlaylistIdFromSpotifyUri(mediaUri)
    );
    return items.map((item) => item.track);
  } else {
    throw new Error("Wrong mediaUri provided");
  }
};

export const getAlbumInfo = async (id: string) => {
  const spotifyApi = await updateAccessToken();
  const albumResponse = await spotifyApi.getAlbum(id);
  return albumResponse.body;
};
