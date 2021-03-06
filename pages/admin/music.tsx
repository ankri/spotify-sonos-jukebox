import { AddAlbumOrPlaylist } from "@components/admin/AddAlbumOrPlaylist";
import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { Collection } from "@custom-types/Collection";
import { CollectionList } from "@components/admin/CollectionList";
import useSWR from "swr";

const AdminPage: NextPage<{ musicCollections: Collection[] }> = ({
  musicCollections: initialMusicCollections,
}) => {
  const { data: musicCollections, mutate: setMusicCollections } = useSWR(
    "/api/collections/music",
    {
      fallbackData: initialMusicCollections,
      refreshInterval: 60 * 1000,
    }
  );

  return (
    <AdminLayout>
      {musicCollections ? (
        <>
          <AddAlbumOrPlaylist
            collectionType="music"
            onCreateCollection={(newCollection: Collection) => {
              setMusicCollections((oldCollections) => {
                if (oldCollections) {
                  return [...oldCollections, newCollection];
                }
              });
            }}
          />
          <div className="mt-4">
            <div>re-order or edit your music albums and playlists</div>
            <CollectionList
              collections={musicCollections}
              collectionsType="music"
            />
          </div>
        </>
      ) : null}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const musicCollections = await Database.getMusicCollection();

  return {
    props: {
      musicCollections,
    },
  };
};

export default AdminPage;
