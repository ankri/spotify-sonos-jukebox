import { config } from "@config/config";
import { SonosState } from "@custom-types/Sonos";
import { useRouter } from "next/router";
import * as React from "react";
import useSWR from "swr";
import { CoverArt } from "./CoverArt";

export const CurrentlyPlaying: React.FC<{
  playbackState?: SonosState;
  showArtist?: boolean;
}> = ({ playbackState, showArtist = false }) => {
  const Router = useRouter();
  const { data } = useSWR<SonosState>("/api/state", {
    fallbackData: playbackState,
  });

  if (!data) {
    return null;
  } else {
    if (
      data.currentTrack.title.startsWith("google-") &&
      data.currentTrack.title.endsWith(".mp3")
    ) {
      return <div />;
    } else {
      return (
        <button
          className="flex flex-row items-center space-x-0 md:space-x-4"
          onClick={() => {
            Router.push(`/${config.ui.defaultPlayer}`);
          }}
        >
          <CoverArt
            mediaUri={data.currentTrack.uri}
            alt={data.currentTrack.title}
            size="sm"
          />
          <h1
            className="text-2xl tracking-wider md:line-clamp-1 line-clamp-2"
            style={{ fontVariant: "small-caps" }}
          >
            {data.currentTrack.title}
            {showArtist ? ` - ${data.currentTrack.artist}` : null}
          </h1>
        </button>
      );
    }
  }
};
