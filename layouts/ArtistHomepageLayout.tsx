import { CoverArt } from "@components/CoverArt";
import { Navigation } from "@components/Navigation";
import { Collection, CollectionTypes } from "@custom-types/Collection";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RootLayout } from "./RootLayout";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";
import { CurrentlyPlaying } from "@components/CurrentlyPlaying";
import { MiniControls } from "@components/controls/MiniControls";
import { usePlayCollection } from "@hooks/usePlayCollection";
import { PageLayout } from "./PageLayout";
import { useRouter } from "next/router";

export const ArtistHomepageLayout: React.FC<{
  artist: string;
  route: "stories";
  collections: Collection[];
}> = ({ route, collections, artist }) => {
  const Router = useRouter();
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
        <Navigation
          title={artist}
          onBackClick={() => {
            Router.replace(`/${route}`);
          }}
        />{" "}
        <PageLayout
          leftControls={<CurrentlyPlaying />}
          rightControls={<MiniControls />}
        >
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
        </PageLayout>
      </>
    </RootLayout>
  );
};
