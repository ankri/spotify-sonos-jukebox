import { useRouter } from "next/router";
import * as React from "react";
import { CoverArt } from "./CoverArt";

export const CurrentlyPlaying: React.FC<{
  title: string;
  mediaUri: string;
}> = ({ title, mediaUri }) => {
  const Router = useRouter();

  if (title.startsWith("google-") && title.endsWith(".mp3")) {
    return <div />;
  } else {
    return (
      <button
        className="flex flex-row space-x-4 items-center"
        onClick={() => {
          Router.push(`${Router.asPath}/player`);
        }}
      >
        <CoverArt mediaUri={mediaUri} alt={title} size="sm" />
        <h1
          className="text-2xl tracking-wider"
          style={{ fontVariant: "small-caps" }}
        >
          {title}
        </h1>
      </button>
    );
  }
};
