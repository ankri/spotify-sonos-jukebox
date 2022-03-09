import { SonosState } from "@custom-types/Sonos";
import { useRouter } from "next/router";
import * as React from "react";
import useSWR from "swr";
import { CoverArt } from "./CoverArt";
import classNames from "classnames";

export const CurrentlyPlaying: React.FC<{
  sonosState?: SonosState;
  showArtist?: boolean;
  size?: "sm" | "lg";
}> = ({ size = "lg", sonosState: initialSonosState, showArtist = false }) => {
  const Router = useRouter();
  const { data } = useSWR<SonosState>("/api/state", {
    fallbackData: initialSonosState,
  });

  if (!data || !data.currentTrack || !data.currentTrack.title) {
    return <div />;
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
            Router.push(`/player`);
          }}
        >
          <CoverArt
            mediaUri={data.currentTrack.uri}
            alt={data.currentTrack.title}
            size="sm"
          />
          <h1
            className={classNames("text-2xl tracking-wider", {
              "hidden md:block md:line-clamp-1": size === "sm",
              "md:line-clamp-1 line-clamp-2": size === "lg",
            })}
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
