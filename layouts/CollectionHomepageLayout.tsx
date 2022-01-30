import { CoverArt } from "@components/CoverArt";
import { HomepageNavigation } from "@components/HomepageNavigation";
import { Collection } from "@custom-types/Collection";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RootLayout } from "./RootLayout";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";
import { CurrentlyPlaying } from "@components/CurrentlyPlaying";
import { MiniControls } from "@components/controls/MiniControls";
import { SonosState } from "@custom-types/Sonos";
import { usePlayCollection } from "@hooks/usePlayCollection";

export const CollectionHomepageLayout: React.FC<{
  collections: Collection[];
  initialPlayingState: SonosState;
}> = ({ collections, initialPlayingState }) => {
  const playCollection = usePlayCollection();
  const slidesPerView = React.useMemo(() => {
    if (collections.length < 3) {
      return collections.length;
    } else {
      return 3;
    }
  }, [collections]);

  return (
    <RootLayout>
      <>
        <HomepageNavigation />
        <div className="w-full flex flex-grow items-center p-4">
          <Swiper slidesPerView={slidesPerView} spaceBetween={50}>
            {collections.map((collection) => {
              return (
                <SwiperSlide key={collection.mediaUri}>
                  <div className="flex flex-col items-center space-y-4">
                    <CoverArt
                      alt={collection.name}
                      mediaUri={collection.mediaUri}
                      size="md"
                      onClick={async () => {
                        await playCollection(collection.mediaUri);
                      }}
                    />
                    <TextToSpeechHeading
                      className="text-lg text-center line-clamp-2"
                      text={collection.name}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex flex-row justify-between p-2">
          <CurrentlyPlaying playbackState={initialPlayingState} />
          <MiniControls playbackState={initialPlayingState} />
        </div>
      </>
    </RootLayout>
  );
};
