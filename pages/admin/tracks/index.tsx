import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { Collection } from "@custom-types/Collection";
import useSWR from "swr";
import { useRouter } from "next/router";

import { CoverArt } from "@components/CoverArt";

const AdminPage: NextPage<{ musicCollections: Collection[] }> = ({
  musicCollections: initialMusicCollections,
}) => {
  const Router = useRouter();
  const { data: musicCollections } = useSWR("/api/collections/music", {
    fallbackData: initialMusicCollections,
    refreshInterval: 60 * 1000,
  });

  return (
    <AdminLayout>
      {musicCollections ? (
        <div className="flex flex-col">
          {musicCollections.map((collection) => (
            <div
              key={collection.mediaUri}
              className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-slate-800 active:bg-slate-800 focus:bg-slate-800"
              onClick={() => {
                Router.push(`/admin/tracks/${collection.mediaUri}`);
              }}
            >
              <CoverArt
                mediaUri={collection.mediaUri}
                alt={collection.name}
                size="sm"
              />
              <div className="flex-grow">
                <h1
                  className="text-md md:text-2xl tracking-wide text-slate-50"
                  style={{ fontVariant: "small-caps" }}
                >
                  {collection.name}
                </h1>
                <h2
                  className="text-xs md:text-md tracking-wide text-slate-300"
                  style={{ fontVariant: "small-caps" }}
                >
                  {collection.artist}
                </h2>
              </div>
            </div>
          ))}
        </div>
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
