import * as React from "react";
import { RootLayout } from "@layouts/RootLayout";
import type { GetServerSideProps, NextPage } from "next";
import * as Database from "@database/database";
import * as Converter from "@spotify/converter";
import { CoverArt } from "@components/CoverArt";
import { useRouter } from "next/router";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Collection } from "@custom-types/Collection";
import { HomepageNavigation } from "@components/HomepageNavigation";

const Home: NextPage<{}> = ({}) => {
  // TODO implement favorites now that playlists are ready
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  return {
    props: {},
    redirect: {
      destination: "/music",
    },
  };
};

export default Home;
