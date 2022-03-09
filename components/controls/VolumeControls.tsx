import * as React from "react";
import {
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
  MdSignalCellular4Bar,
} from "react-icons/md";
import { Config } from "@custom-types/Config";
import { Button } from "../Button";

export const VolumeControls: React.FC = () => {
  const setVolume = React.useCallback(
    async (volumePreset: keyof Config["volumes"]) => {
      return fetch(`/api/playback/volume/${volumePreset}`);
    },
    []
  );

  return (
    <div className="flex flex-row space-x-4">
      <Button
        onClick={() => {
          setVolume("preset-0");
        }}
      >
        <MdSignalCellular4Bar className="opacity-50 w-8 h-8 text-slate-300" />
      </Button>
      <Button
        onClick={() => {
          setVolume("preset-1");
        }}
      >
        <MdSignalCellular1Bar className="w-8 h-8 text-slate-300" />
      </Button>
      <Button
        onClick={() => {
          setVolume("preset-2");
        }}
      >
        <MdSignalCellular2Bar className="w-8 h-8 text-slate-300" />
      </Button>
      <Button
        onClick={() => {
          setVolume("preset-3");
        }}
      >
        <MdSignalCellular3Bar className="w-8 h-8 text-slate-300" />
      </Button>
      <Button
        onClick={() => {
          setVolume("preset-4");
        }}
      >
        <MdSignalCellular4Bar className="w-8 h-8 text-slate-300" />
      </Button>
    </div>
  );
};
