import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { RootLayout } from "@layouts/RootLayout";
import { HomepageNavigation } from "@components/HomepageNavigation";
import { PageLayout } from "@layouts/PageLayout";
import { CurrentlyPlaying } from "@components/CurrentlyPlaying";
import { MiniControls } from "@components/controls/MiniControls";
import { Swiper, SwiperSlide } from "swiper/react";
import { CoverArt } from "@components/CoverArt";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";
import { useRouter } from "next/router";

const StoriesHomepage: NextPage<{
  artists: { name: string; mediaUri: string }[];
}> = ({ artists }) => {
  const Router = useRouter();
  const [slidesPerView, setSlidesPerView] = React.useState(1);
  React.useEffect(() => {
    const maxSlides = Math.floor(document.body.clientWidth / 224);
    if (artists.length < maxSlides) {
      setSlidesPerView(artists.length);
    } else {
      setSlidesPerView(maxSlides);
    }
  }, [artists]);

  return (
    <RootLayout>
      <>
        <HomepageNavigation />
        <PageLayout
          leftControls={<CurrentlyPlaying />}
          rightControls={<MiniControls />}
        >
          <Swiper slidesPerView={slidesPerView} spaceBetween={50}>
            {artists.map((artist) => {
              return (
                <SwiperSlide key={artist.mediaUri}>
                  <div className="flex flex-col items-center space-y-2">
                    <CoverArt
                      className="!rounded-full border-2 border-black cursor-pointer"
                      alt={artist.name}
                      mediaUri={artist.mediaUri}
                      size="md"
                      onClick={async () => {
                        Router.push(`/stories/artist/${artist.name}`);
                      }}
                    />
                    <TextToSpeechHeading
                      className="text-xl text-center line-clamp-3 font-medium"
                      text={artist.name}
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

export default StoriesHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const artists = await Database.getArtists("story");

  return {
    props: {
      artists,
    },
  };
};
