import { getConfig } from "@config/config";
import { NextApiHandler } from "next";
import SpotifyWebApi from "spotify-web-api-node";

const isEmpty = (value?: string): boolean => {
  return value === undefined || value.length === 0;
};

const handler: NextApiHandler = async (req, res) => {
  const config = await getConfig();

  if (
    isEmpty(config.spotify.clientId) ||
    isEmpty(config.spotify.clientSecret)
  ) {
    res.status(400).send("NOT_CONFIGURED");
  } else {
    const spotifyApi = new SpotifyWebApi({
      clientId: config.spotify.clientId,
      clientSecret: config.spotify.clientSecret,
    });

    const tokenResponse = await spotifyApi.clientCredentialsGrant();
    const accessToken = tokenResponse.body.access_token;

    try {
      if (accessToken) {
        res.status(200).send("Okay");
      } else {
        res.status(401).send("Credentials invalid");
      }
    } catch (error) {
      res.status(401).send(error);
    }
  }
};

export default handler;
