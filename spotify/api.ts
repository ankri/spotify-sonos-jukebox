import SpotifyWebApi from "spotify-web-api-node";
import config from "@config/config.json";

const spotifyApi = new SpotifyWebApi({
  clientId: config.spotify.clientId,
  clientSecret: config.spotify.clientSecret,
});

const updateAccessToken = async () => {
  const tokenResponse = await spotifyApi.clientCredentialsGrant();
  const accessToken = tokenResponse.body.access_token;
  spotifyApi.setAccessToken(accessToken);
};

export const getTrackListForAlbum = async (spotifyAlbumId: string) => {
  await updateAccessToken();
  const tracksResponse = await spotifyApi.getAlbumTracks(spotifyAlbumId);

  return tracksResponse.body.items;
};

export const getTrackInfo = async (id: string) => {
  await updateAccessToken();

  const trackResponse = await spotifyApi.getTrack(id);
  return trackResponse.body;
};

export const getAlbumInfo = async (id: string) => {
  await updateAccessToken();
  const albumResponse = await spotifyApi.getAlbum(id);
  return albumResponse.body;
};
