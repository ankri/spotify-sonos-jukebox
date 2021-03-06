import * as React from "react";
import {
  IoPlay,
  IoPause,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { PlaybackState } from "@custom-types/Sonos";
import { Button } from "../Button";

export const Controls: React.FC<{
  playbackState: PlaybackState;
}> = ({ playbackState }) => {
  return (
    <div className="flex flex-row justify-between">
      <Button
        size="lg"
        onClick={() => {
          fetch("/api/playback/previous");
        }}
      >
        <IoPlaySkipBack className="w-14 h-14 text-slate-300" />
      </Button>
      {playbackState === "PAUSED_PLAYBACK" || playbackState === "STOPPED" ? (
        <Button
          size="lg"
          onClick={() => {
            fetch("/api/playback/play");
          }}
          className="bg-slate-800"
        >
          <IoPlay className="w-14 h-14 text-white" />
        </Button>
      ) : null}
      {playbackState === "PLAYING" || playbackState === "TRANSITIONING" ? (
        <Button
          size="lg"
          onClick={() => {
            fetch("/api/playback/pause");
          }}
        >
          <IoPause className="w-14 h-14 text-slate-300" />
        </Button>
      ) : null}
      <Button
        size="lg"
        onClick={() => {
          fetch("/api/playback/next");
        }}
      >
        <IoPlaySkipForward className="w-14 h-14 text-slate-300" />
      </Button>
    </div>
  );
};
