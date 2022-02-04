import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import * as SonosApi from "@sonos/api";
import { SonosState } from "@custom-types/Sonos";

const StoriesHomepage: NextPage<{
  stories: Collection[];
  sonosState: SonosState;
}> = ({ stories, sonosState: initialSonosState }) => {
  return (
    <CollectionHomepageLayout
      collections={stories}
      sonosState={initialSonosState}
    />
  );
};

export default StoriesHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const stories = await Database.getAllStories();
  const sonosState = await SonosApi.getState();

  return {
    props: {
      stories,
      sonosState,
    },
  };
};
