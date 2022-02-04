import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import * as SonosApi from "@sonos/api";
import { SonosState } from "@custom-types/Sonos";

const StoriesHomepage: NextPage<{
  stories: Collection[];
  playingState: SonosState;
}> = ({ stories, playingState: initialPlayingState }) => {
  return (
    <CollectionHomepageLayout
      collections={stories}
      initialPlayingState={initialPlayingState}
    />
  );
};

export default StoriesHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const stories = await Database.getAllStories();
  const playingState = await SonosApi.getState();

  return {
    props: {
      stories,
      playingState,
    },
  };
};
