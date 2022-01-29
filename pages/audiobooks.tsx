import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";

const MusicHomepage: NextPage<{ audiobooks: Collection[] }> = ({
  audiobooks,
}) => {
  return <CollectionHomepageLayout collections={audiobooks} />;
};

export default MusicHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const audiobooks = Database.getAllAudiobooks();

  return {
    props: {
      audiobooks,
    },
  };
};
