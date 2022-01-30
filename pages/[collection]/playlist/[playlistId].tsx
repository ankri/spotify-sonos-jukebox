import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { RootLayout } from "@layouts/RootLayout";
import * as Spotify from "@spotify/api";
import * as Database from "@database/database";
import * as Converter from "@spotify/converter";
import { Navigation } from "@components/Navigation";
import { MiniControls } from "@components/controls/MiniControls";
import { SonosState } from "@custom-types/Sonos";
import * as SonosApi from "@sonos/api";
import { CurrentlyPlaying } from "@components/CurrentlyPlaying";
import { Collection } from "@custom-types/Collection";
import { CollectionSwiper } from "@components/CollectionSwiper";

const SinglePlaylistPage: NextPage<{
  tracks: SpotifyApi.PlaylistTrackObject[];
  playlist: Collection;
  playingState: SonosState;
  selectedTrackNumber: number;
}> = ({
  tracks,
  playlist,
  playingState: initialPlayingState,
  selectedTrackNumber,
}) => {
  const Router = useRouter();
  const collection = Router.query.collection;

  return (
    <RootLayout>
      <>
        <Navigation
          title={playlist.name}
          onBackClick={() => {
            Router.replace(`/${collection}`);
          }}
        />
        <CollectionSwiper
          collectionMediaUri={playlist.mediaUri}
          tracks={tracks.map(({ track }) => ({ ...track }))}
          selectedTrackNumber={selectedTrackNumber}
        />
        <div className="flex flex-row justify-between p-2">
          <CurrentlyPlaying playbackState={initialPlayingState} />
          <MiniControls playbackState={initialPlayingState} />
        </div>
      </>
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const collection = query.collection as string;

  if (collection !== "music") {
    return {
      notFound: true,
      redirect: {
        destination: "/music",
      },
    };
  }

  const playlistId = query.playlistId as string;

  const playlist = Database.getCollectionInfo(
    Converter.getSpotifyPlaylistUriFromPlaylistId(playlistId)
  );

  const playingState = await SonosApi.getState();
  const tracks = await Spotify.getTrackListForPlaylist(playlistId);
  const currentTrack = tracks.find(
    (track) => track.track.uri === playingState.currentTrack.uri
  );
  const selectedTrackNumber =
    currentTrack && currentTrack.track.track_number > 1
      ? currentTrack.track.track_number - 2
      : 0;

  if (playlist && playlist.mediaUri.includes(":playlist:")) {
    return {
      props: {
        tracks,
        playlist,
        playingState,
        selectedTrackNumber,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default SinglePlaylistPage;
