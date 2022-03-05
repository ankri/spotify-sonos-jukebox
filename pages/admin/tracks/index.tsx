import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import * as Database from "@database/database";
import { Collection } from "@custom-types/Collection";
import useSWR from "swr";
import { CoverArt } from "@components/CoverArt";
import { useRouter } from "next/router";

const AdminPage: NextPage<{ musicCollections: Collection[] }> = ({
  musicCollections: initialMusicCollections,
}) => {
  const Router = useRouter();
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
          <div className="flex flex-col">
            {musicCollections.map((collection) => (
              <div
                key={collection.mediaUri}
                className="grid items-center gap-2 gap-y-0 p-2 collection-list-item cursor-pointer"
                onClick={() => {
                  Router.push(`/admin/tracks/${collection.mediaUri}`);
                }}
              >
                <div className="order-2 max-w-fit">
                  <CoverArt
                    mediaUri={collection.mediaUri}
                    alt={collection.name}
                    size="sm"
                  />
                </div>
                <div className="max-w-full order-last md:order-3 col-start-2 col-span-3 md:col-start-3 md:col-span-1">
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
