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
  const [slidesPerView, setSlidesPerView] = React.useState(1);
  React.useEffect(() => {
    const maxSlides = Math.floor(document.body.clientWidth / 224);
    if (collections.length < maxSlides) {
      setSlidesPerView(collections.length);
    } else {
      setSlidesPerView(maxSlides);
    }
  }, [collections]);

  return (
    <RootLayout>
      <>
        <HomepageNavigation />
        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="w-full flex flex-grow items-center py-2 px-4">
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
          <div className="flex md:flex-row flex-col justify-between p-2 space-y-4">
            <CurrentlyPlaying playbackState={initialPlayingState} />
            <div className="flex items-center justify-center">
              <MiniControls playbackState={initialPlayingState} />
            </div>
          </div>
        </div>
      </>
    </RootLayout>
  );
};
