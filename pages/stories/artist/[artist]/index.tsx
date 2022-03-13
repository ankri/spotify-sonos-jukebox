import { ArtistHomepageLayout } from "@layouts/ArtistHomepageLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { Collection } from "@prisma/client";

const StoriesHomepage: NextPage<{
  artist: string;
  stories: Collection[];
}> = ({ stories, artist }) => {
  return (
    <ArtistHomepageLayout
      artist={artist}
      route="stories"
      collections={stories}
    />
  );
};

export default StoriesHomepage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const artist = (query.artist as string) ?? undefined;
  if (artist === undefined) {
    return {
      notFound: true,
    };
  } else {
    const stories = await Database.getAllStories(artist);

    return {
      props: {
        artist,
        stories,
      },
    };
  }
};
