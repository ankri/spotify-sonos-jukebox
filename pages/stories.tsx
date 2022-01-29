import { Collection } from "@custom-types/Collection";
import { CollectionHomepageLayout } from "@layouts/CollectionHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";

const StoriesHomepage: NextPage<{ stories: Collection[] }> = ({ stories }) => {
  return <CollectionHomepageLayout collections={stories} />;
};

export default StoriesHomepage;

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const stories = Database.getAllStories();

  return {
    props: {
      stories,
    },
  };
};
