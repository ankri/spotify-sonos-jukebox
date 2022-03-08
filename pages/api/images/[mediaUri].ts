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

    // we want to be able to bypass the database to look for the original image
    const showOriginal = req.query.original !== undefined;

    if (!showOriginal && imageCache.has(mediaUri)) {
      res.redirect(302, imageCache.get(mediaUri)!);
    } else {
      let imageUrl: string | undefined = undefined;

      switch (type) {
        case "track":
          // we do not need to query the database when looking for the original image
          const trackInfo = showOriginal
            ? null
            : await Database.getTrackInfo(mediaUri);

          // when the image is available inside the database we have set a custom image
          if (trackInfo && trackInfo.imageUrl) {
            imageUrl = trackInfo.imageUrl;
          } else {
            // otherwise we query spotify for the image
            const trackInfo = await SpotifyApi.getTrackInfo(id);
            // the first image seems to always be the correct image
            imageUrl = trackInfo.album.images[0]?.url ?? undefined;
          }
          break;
        case "album":
          const albumInfo = showOriginal
            ? null
            : await Database.getCollectionInfo(mediaUri);

          if (albumInfo && albumInfo.imageUrl) {
            imageUrl = albumInfo.imageUrl;
          } else {
            const albumInfo = await SpotifyApi.getAlbumInfo(id);
            imageUrl = albumInfo.images[0]?.url ?? undefined;
          }
          break;
        case "playlist":
          const playlistInfo = showOriginal
            ? null
            : await Database.getCollectionInfo(mediaUri);
          if (playlistInfo && playlistInfo.imageUrl) {
            imageUrl = playlistInfo.imageUrl;
          } else {
            const playlistInfo = await SpotifyApi.getPlaylistInfo(id);
            imageUrl = playlistInfo.images[0]?.url ?? undefined;
          }
          break;
        case "artist": {
          const artistInfo = await Database.getArtistInfo(mediaUri);

          if (artistInfo && artistInfo.imageUrl) {
            imageUrl = artistInfo.imageUrl;
          } else {
            const artistInfo = await SpotifyApi.getArtistInfo(id);
            imageUrl = artistInfo.images[0]?.url ?? undefined;
          }
          break;
        }
        default:
          imageUrl = undefined;
      }

      if (imageUrl) {
        // we do not update the cache when looking for the original image
        if (!showOriginal) {
          // otherwise we update the cache with the image we found ...
          imageCache.set(mediaUri, imageUrl);
        }

        // ... and redirect to the correct image
        res.redirect(302, imageUrl);
      } else {
        res.status(404).end("");
      }
    }
  } else {
    res.status(400).end("No/unknown media id provided.");
  }
}
