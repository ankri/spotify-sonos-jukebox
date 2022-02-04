import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import * as SonosApi from "@sonos/api";
import { SonosState } from "@custom-types/Sonos";

const MusicHomepage: NextPage<{
  audiobooks: Collection[];
  sonosState: SonosState;
}> = ({ audiobooks, sonosState: initialSonosState }) => {
  return (
    <CollectionHomepageLayout
      collections={audiobooks}
      sonosState={initialSonosState}
    />
  );
};

export default MusicHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const audiobooks = await Database.getAllAudiobooks();
  const sonosState = await SonosApi.getState();

  return {
    props: {
      audiobooks,
      sonosState,
    },
  };
};
