import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetStaticProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";

const StoriesHomepage: NextPage<{
  stories: Collection[];
}> = ({ stories }) => {
  return <CollectionHomepageLayout collections={stories} />;
};

export default StoriesHomepage;

export const getStaticProps: GetStaticProps = async ({}) => {
  const stories = await Database.getAllStories();

  return {
    props: {
      stories,
    },
  };
};
