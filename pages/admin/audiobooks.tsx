import { AddAlbumOrPlaylist } from "@components/admin/AddAlbumOrPlaylist";
import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { Collection } from "@custom-types/Collection";
import { CollectionList } from "@components/admin/CollectionList";
import useSWR from "swr";

const AdminPage: NextPage<{ audiobookCollections: Collection[] }> = ({
  audiobookCollections: initialAudiobookCollections,
}) => {
  const { data: audiobookCollections, mutate: setAudiobookCollections } =
    useSWR("/api/collections/audiobook", {
      fallbackData: initialAudiobookCollections,
      refreshInterval: 60 * 1000,
    });

  return (
    <AdminLayout>
      {audiobookCollections ? (
        <>
          <AddAlbumOrPlaylist
            collectionType="audiobook"
            onCreateCollection={(newCollection: Collection) => {
              setAudiobookCollections((oldCollections) => {
                if (oldCollections) {
                  return [...oldCollections, newCollection];
                }
              });
            }}
          />
          <div className="mt-4">
            <div>re-order or edit your music albums and playlists</div>
            <CollectionList
              collections={audiobookCollections}
              collectionsType="audiobook"
            />
          </div>
        </>
      ) : null}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const audiobookCollections = await Database.getAllAudiobooks();

  return {
    props: {
      audiobookCollections,
    },
  };
};

export default AdminPage;
