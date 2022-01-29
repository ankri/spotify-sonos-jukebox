import { CoverArt } from "@components/CoverArt";
import { HomepageNavigation } from "@components/HomepageNavigation";
import { Collection } from "@custom-types/Collection";
import { useRouter } from "next/router";
import * as Converter from "@spotify/converter";
import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { RootLayout } from "./RootLayout";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";

export const CollectionHomepageLayout: React.FC<{
  collections: Collection[];
}> = ({ collections }) => {
  const Router = useRouter();

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
                      onClick={() => {
                        if (collection.mediaUri.includes(":album:")) {
                          Router.push(
                            `/album/${Converter.getAlbumIdFromSpotifyUri(
                              collection.mediaUri
                            )}`
                          );
                        } else {
                          // TODO
                          console.log(`${collection.mediaUri} not supported`);
                        }
                      }}
                    />
                    <TextToSpeechHeading
                      className="text-2xl text-center"
                      text={collection.name}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </>
    </RootLayout>
  );
};
