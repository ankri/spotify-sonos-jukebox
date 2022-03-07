import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import useSWR from "swr";
import * as Spotify from "@spotify/api";
import * as Converter from "@spotify/converter";
import { prisma } from "@database/prisma";
import { Track } from "@custom-types/Track";
import { EditableTrackItem } from "@components/admin/EditableTrackItem";

const AdminPage: NextPage<{
  tracks: Track[];
  mediaUri: string;
}> = ({ tracks: initialTracks, mediaUri }) => {
  const { data: tracks, mutate: setTracks } = useSWR<Track[]>(
    `/api/tracks/${mediaUri}`,
    {
      fallbackData: initialTracks,
    }
  );

  return (
    <AdminLayout>
      {tracks ? (
        <>
          <div className="flex flex-col">
            {tracks.map((track) => {
              return (
                <EditableTrackItem
                  key={`${track.mediaUri}-${track.imageUrl}`}
                  item={track}
                  onUpdate={async (updatedTrack) => {
                    await fetch(`/api/tracks/${updatedTrack.mediaUri}`, {
                      method: "PUT",
                      body: JSON.stringify(updatedTrack),
                    });

                    setTracks((oldTracks) => {
                      if (oldTracks) {
                        const index = oldTracks.findIndex(
                          (track) => track.mediaUri === updatedTrack.mediaUri
                        );
                        oldTracks[index] = updatedTrack;
                        return [...oldTracks];
                      }
                    });
                  }}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mediaUri = context.query.mediaUri as string;
  const spotifyTracks = await Spotify.getTrackListForMediaUri(mediaUri);
  const databaseTracks = await prisma.track.findMany({
    where: {
      mediaUri: {
        in: spotifyTracks.map((track) => track.uri),
      },
    },
  });
  const tracks = Converter.mergeTracks(spotifyTracks, databaseTracks);

  return {
    props: {
      tracks,
      mediaUri,
    },
  };
};

export default AdminPage;
