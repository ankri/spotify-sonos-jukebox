import { SonosState } from "@custom-types/Sonos";
import * as React from "react";
import useSWR from "swr";
import { Controls } from "./controls/Controls";
import { VolumeControls } from "./controls/VolumeControls";
import { CoverArt } from "./CoverArt";
import { TextToSpeechHeading } from "./TextToSpeechHeading";

export const Player: React.FC<{
  sonosState: SonosState;
}> = ({ sonosState: initialSonosState }) => {
  const { data } = useSWR<SonosState>("/api/state", {
    fallbackData: initialSonosState,
  });

  if (!data) {
    return <>Loading</>;
  } else {
    return (
      <div className="p-4 flex items-center w-full flex-grow">
        <div className="flex flex-row space-x-4 w-full">
          <CoverArt
            size="lg"
            alt={`${data.currentTrack.artist} - ${data.currentTrack.title}`}
            mediaUri={data.currentTrack.uri}
            progress={data.elapsedTime / data.currentTrack.duration}
          />
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col space-y-4 p-4">
              <TextToSpeechHeading
                className="text-4xl text-center font-semibold line-clamp-3"
                text={data.currentTrack.title}
              />
              <TextToSpeechHeading
                className="text-md text-center"
                text={data.currentTrack.artist}
              />
            </div>
            <div className="flex flex-col space-y-4">
              <Controls playbackState={data.playbackState} />
              <VolumeControls />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
