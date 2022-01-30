import { useRouter } from "next/router";
import * as Converter from "@spotify/converter";
import React from "react";

export const usePlayer = () => {
  const Router = useRouter();
  const path = Router.asPath;

  return React.useCallback(
    async (mediaUri: string) => {
      if (mediaUri.includes(":album:")) {
        if (path === "/music") {
          Router.push(
            `${path}/album/${Converter.getAlbumIdFromSpotifyUri(mediaUri)}`
          );
        } else {
          const albumId = Converter.getAlbumIdFromSpotifyUri(mediaUri);
          await fetch(`/api/album/${albumId}/track/1`);
          Router.push("/player");
        }
      } else if (mediaUri.includes(":playlist:")) {
        if (path === "/music") {
          Router.push(
            `${path}/playlist/${Converter.getPlaylistIdFromSpotifyUri(
              mediaUri
            )}`
          );
        } else {
          const playlistId = Converter.getPlaylistIdFromSpotifyUri(mediaUri);
          await fetch(`/api/playlist/${playlistId}/track/1`);
          Router.push("/player");
        }
      }
    },
    [Router]
  );
};
