import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetStaticProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";

const MusicHomepage: NextPage<{
  music: Collection[];
}> = ({ music }) => {
  return <CollectionHomepageLayout collections={music} />;
};

export default MusicHomepage;

export const getStaticProps: GetStaticProps = async () => {
  const music = await Database.getMusicCollection();

  return {
    props: {
      music,
    },
  };
};
