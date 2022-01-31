import { SimpleSonosTrack, SonosState } from "@custom-types/Sonos";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as SonosApi from "@sonos/api";
import { RootLayout } from "@layouts/RootLayout";
import { Navigation } from "@components/Navigation";
import { useRouter } from "next/router";
import useSWR from "swr";
import Swiper from "swiper";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";
import { CoverArt } from "@components/CoverArt";
import { Button } from "@components/Button";
import { IoPause, IoPlay } from "react-icons/io5";
import { BsCollectionPlay } from "react-icons/bs";
import { VolumeControls } from "@components/controls/VolumeControls";
import { MiniControls } from "@components/controls/MiniControls";

const QueuePage: NextPage<{
  queue: SimpleSonosTrack[];
  playingState: SonosState;
}> = ({ queue, playingState: initialPlayingState }) => {
  const Router = useRouter();
  const swiperRef = React.useRef<Swiper | null>(null);
  const { data } = useSWR<SonosState>("/api/state", {
    fallbackData: initialPlayingState,
  });
  const currentTrackIndex = React.useMemo(() => {
    if (data) {
      return queue.findIndex((track) => track.uri === data.currentTrack.uri);
    } else {
      return 0;
    }
  }, [data, queue]);
  const slidesPerView = React.useMemo(() => {
    if (queue.length < 3) {
      return queue.length;
    } else {
      return 3;
    }
  }, [queue]);

  React.useEffect(() => {
    if (data) {
      if (swiperRef.current) {
        swiperRef.current.slideTo(currentTrackIndex - 1);
      }
    }
  }, [currentTrackIndex]);

  if (!data) {
    return null;
  } else {
    return (
      <RootLayout>
        <>
          <Navigation
            onBackClick={() => {
              Router.back();
            }}
            className="justify-between"
          >
            <Button
              onClick={() => {
                Router.replace("/player");
              }}
            >
              <BsCollectionPlay className="w-8 h-8 text-white" />
            </Button>
          </Navigation>
          <div className="w-full flex flex-grow items-center p-4">
            <ReactSwiper
              slidesPerView={slidesPerView}
              spaceBetween={50}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {queue.map((track, index) => {
                return (
                  <SwiperSlide key={track.uri}>
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <CoverArt
                          alt={track.title}
                          mediaUri={track.uri}
                          size="md"
                          onClick={async () => {
                            if (currentTrackIndex !== index) {
                              await fetch(`/api/playback/seek/${index + 1}`);
                            }
                          }}
                          progress={
                            currentTrackIndex === index
                              ? data.elapsedTime / data.currentTrack.duration
                              : undefined
                          }
                        />
                        {currentTrackIndex === index ? (
                          <div className="absolute flex w-full h-full items-center justify-center bg-slate-900 bg-opacity-90 top-0">
                            {data.playbackState === "STOPPED" ||
                            data.playbackState === "PAUSED_PLAYBACK" ? (
                              <Button
                                size="lg"
                                onClick={() => {
                                  fetch("/api/playback/play");
                                }}
                              >
                                <IoPlay className="w-14 h-14 text-white" />
                              </Button>
                            ) : null}
                            {data.playbackState === "PLAYING" ||
                            data.playbackState === "TRANSITIONING" ? (
                              <Button
                                size="lg"
                                onClick={() => {
                                  fetch("/api/playback/pause");
                                }}
                              >
                                <IoPause className="w-14 h-14 text-white" />
                              </Button>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                      <TextToSpeechHeading
                        className="text-lg text-center line-clamp-2"
                        text={track.title}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </ReactSwiper>
          </div>
          <div className="flex flex-row justify-between space-x-2 px-4 py-2">
            <VolumeControls />
            <MiniControls />
          </div>
        </>
      </RootLayout>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const queue = await SonosApi.getQueue();
  const playingState = await SonosApi.getState();

  return {
    props: {
      queue,
      playingState,
    },
  };
};

export default QueuePage;
