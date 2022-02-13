import { AddAlbumOrPlaylist } from "@components/admin/AddAlbumOrPlaylist";
import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { Collection } from "@custom-types/Collection";
import { CollectionList } from "@components/admin/CollectionList";

const AdminPage: NextPage<{ musicCollection: Collection[] }> = ({
  musicCollection,
}) => {
  return (
    <AdminLayout>
      <AddAlbumOrPlaylist collectionType="music" />
      <div className="mt-4">
        <div>re-order or edit your music albums and playlists</div>
        <CollectionList collections={musicCollection}></CollectionList>
      </div>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const musicCollection = await Database.getMusicCollection();

  return {
    props: {
      musicCollection,
    },
  };
};

export default AdminPage;
