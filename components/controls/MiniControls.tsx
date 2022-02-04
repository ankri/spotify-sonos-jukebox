import * as React from "react";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { SonosState } from "@custom-types/Sonos";
import { Button } from "../Button";
import useSWR from "swr";

export const MiniControls: React.FC<{
  sonosState?: SonosState;
}> = ({ sonosState: initialSonosState }) => {
  const { data } = useSWR<SonosState>("/api/state", {
    fallbackData: initialSonosState,
  });

  if (!data) {
    return null;
  } else {
    return (
      <div className="flex flex-row justify-between space-x-4">
        <Button
          onClick={() => {
            fetch("/api/playback/previous");
          }}
        >
          <IoPlaySkipBack className="w-14 h-14 text-slate-300" />
        </Button>
        {data.playbackState === "PAUSED_PLAYBACK" ||
        data.playbackState === "STOPPED" ? (
          <Button
            onClick={() => {
              fetch("/api/playback/play");
            }}
            className="bg-slate-800"
          >
            <IoPlay className="w-14 h-14 text-white" />
          </Button>
        ) : null}
        {data.playbackState === "PLAYING" ||
        data.playbackState === "TRANSITIONING" ? (
          <Button
            onClick={() => {
              fetch("/api/playback/pause");
            }}
          >
            <IoPause className="w-14 h-14 text-slate-300" />
          </Button>
        ) : null}
        <Button
          onClick={() => {
            fetch("/api/playback/next");
          }}
        >
          <IoPlaySkipForward className="w-14 h-14 text-slate-300" />
        </Button>
      </div>
    );
  }
};
