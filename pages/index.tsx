import * as React from "react";
import { RootLayout } from "@layouts/RootLayout";
import type { GetServerSideProps, NextPage } from "next";
import * as Database from "@database/database";
import * as Converter from "@spotify/converter";
import { CoverArt } from "@components/CoverArt";
import { useRouter } from "next/router";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navbar } from "@components/Navigation";
import { Button } from "@components/Button";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { MdOutlineMenuBook, MdFavorite } from "react-icons/md";
import classNames from "classnames";
import { Collection } from "@custom-types/Collection";
import { HomepageNavigation } from "@components/HomepageNavigation";

const Home: NextPage<{ music: Collection[]; audiobooks: Collection[] }> = ({
  music,
  audiobooks,
}) => {
  const Router = useRouter();

  const [selectedFilter, setSelectedFilter] = React.useState<
    "music" | "audiobooks"
  >("music");

  const selectedCollections = React.useMemo(() => {
    if (selectedFilter === "music") {
      return music;
    } else if (selectedFilter === "audiobooks") {
      return audiobooks;
    } else {
      return [];
    }
    // we can ignore music and audiobooks as dependencies because they can only be changed when the page is re-rendered
  }, [selectedFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const slidesPerView = React.useMemo(() => {
    if (selectedCollections.length < 3) {
      return selectedCollections.length;
    } else {
      return 3;
    }
  }, [selectedCollections]);

  return (
    <RootLayout>
      <>
        <HomepageNavigation />
        <div className="w-full flex flex-grow items-center p-4">
          <Swiper slidesPerView={slidesPerView} spaceBetween={50}>
            {selectedCollections.map((collection) => {
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

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const music = Database.getMusicCollection();
  const audiobooks = Database.getAllAudiobooks();

  return {
    props: {
      music,
      audiobooks,
    },
  };
};

export default Home;
