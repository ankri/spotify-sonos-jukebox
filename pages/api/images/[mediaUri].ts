import * as Database from "@database/database";
import * as SpotifyApi from "@spotify/api";
import * as Converter from "@spotify/converter";
import { imageCache } from "@cache/cache";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const mediaUri = req.query.mediaUri;

  if (mediaUri && typeof mediaUri === "string") {
    const [source, type, id] =
      Converter.normalizePlaylistUri(mediaUri).split(":");

    if (imageCache.has(mediaUri)) {
      res.redirect(302, imageCache.get(mediaUri)!);
    } else {
      let imageUrl: string | undefined = undefined;

      switch (type) {
        case "track":
          const trackInfo = await Database.getTrackInfo(mediaUri);

          if (trackInfo && trackInfo.imageUrl) {
            imageUrl = trackInfo.imageUrl;
          } else {
            const trackInfo = await SpotifyApi.getTrackInfo(id);
            imageUrl = trackInfo.album.images[0].url;
          }
          break;
        case "album":
          const albumInfo = await Database.getCollectionInfo(mediaUri);

          if (albumInfo && albumInfo.imageUrl) {
            imageUrl = albumInfo.imageUrl;
          } else {
            const albumInfo = await SpotifyApi.getAlbumInfo(id);
            imageUrl = albumInfo.images[0].url;
          }
          break;
        case "playlist":
          const playlistInfo = await Database.getCollectionInfo(mediaUri);
          if (playlistInfo && playlistInfo.imageUrl) {
            imageUrl = playlistInfo.imageUrl;
          } else {
            const playlistInfo = await SpotifyApi.getPlaylistInfo(id);
            imageUrl = playlistInfo.images[0].url;
          }
          break;
        default:
          imageUrl = undefined;
      }

      if (imageUrl) {
        imageCache.set(mediaUri, imageUrl);
        res.redirect(302, imageUrl);
      } else {
        res.status(404).end("");
      }
    }
  } else {
    res.status(400).end("No/unknown media id provided.");
  }
}
