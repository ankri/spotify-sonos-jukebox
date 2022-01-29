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
          className="flex flex-row space-x-4 items-center"
          onClick={() => {
            Router.push(`${Router.asPath}/player`);
          }}
        >
          <CoverArt
            mediaUri={data.currentTrack.uri}
            alt={data.currentTrack.title}
            size="sm"
          />
          <h1
            className="text-2xl tracking-wider"
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
