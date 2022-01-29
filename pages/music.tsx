import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";

const MusicHomepage: NextPage<{ music: Collection[] }> = ({ music }) => {
  return <CollectionHomepageLayout collections={music} />;
};

export default MusicHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const music = Database.getMusicCollection();

  return {
    props: {
      music,
    },
  };
};
