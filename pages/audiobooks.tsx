import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import * as SonosApi from "@sonos/api";
import { SonosState } from "@custom-types/Sonos";

const MusicHomepage: NextPage<{
  audiobooks: Collection[];
  playingState: SonosState;
}> = ({ audiobooks, playingState: initialPlayingState }) => {
  return (
    <CollectionHomepageLayout
      collections={audiobooks}
      initialPlayingState={initialPlayingState}
    />
  );
};

export default MusicHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const audiobooks = Database.getAllAudiobooks();
  const playingState = await SonosApi.getState();

  return {
    props: {
      audiobooks,
      playingState,
    },
  };
};