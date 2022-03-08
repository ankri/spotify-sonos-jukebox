import { ArtistHomepageLayout } from "@layouts/ArtistHomepageLayout";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
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

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await Database.getArtists("story");
  const paths = artists.map((artist) => ({
    params: { artist: artist.name },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const artist = (params?.artist as string) ?? undefined;
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
