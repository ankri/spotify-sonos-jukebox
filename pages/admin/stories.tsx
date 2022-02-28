import { AddAlbumOrPlaylist } from "@components/admin/AddAlbumOrPlaylist";
import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { Collection } from "@custom-types/Collection";
import { CollectionList } from "@components/admin/CollectionList";
import useSWR from "swr";

const AdminPage: NextPage<{ storyCollections: Collection[] }> = ({
  storyCollections: initialStoryCollections,
}) => {
  const { data: storyCollections, mutate: setStoryCollections } = useSWR(
    "/api/collections/story",
    {
      fallbackData: initialStoryCollections,
      refreshInterval: 60 * 1000,
    }
  );

  return (
    <AdminLayout>
      {storyCollections ? (
        <>
          <AddAlbumOrPlaylist
            collectionType="story"
            onCreateCollection={(newCollection: Collection) => {
              setStoryCollections((oldCollections) => {
                if (oldCollections) {
                  return [...oldCollections, newCollection];
                }
              });
            }}
          />
          <div className="mt-4">
            <div>re-order or edit your music albums and playlists</div>
            <CollectionList
              collections={storyCollections}
              collectionsType="story"
            />
          </div>
        </>
      ) : null}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const storyCollections = await Database.getAllStories();

  return {
    props: {
      storyCollections,
    },
  };
};

export default AdminPage;
