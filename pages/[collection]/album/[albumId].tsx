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

const SingleAlbumPage: NextPage<{
  tracks: SpotifyApi.TrackObjectSimplified[];
  album: Collection;
  playingState: SonosState;
  selectedTrackNumber: number;
}> = ({
  tracks,
  album,
  playingState: initialPlayingState,
  selectedTrackNumber,
}) => {
  const Router = useRouter();
  const collection = Router.query.collection;

  return (
    <RootLayout>
      <>
        <Navigation
          title={album.name}
          onBackClick={() => {
            Router.replace(`/${collection}`);
          }}
        />
        <CollectionSwiper
          collectionMediaUri={album.mediaUri}
          tracks={tracks}
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
  const albumId = query.albumId as string;

  const album = Database.getCollectionInfo(
    Converter.getSpotifyAlbumUriFromAlbumId(albumId)
  );

  const playingState = await SonosApi.getState();
  const tracks = await Spotify.getTrackListForAlbum(albumId);
  const currentTrack = tracks.find(
    (track) => track.uri === playingState.currentTrack.uri
  );
  const selectedTrackNumber =
    currentTrack && currentTrack.track_number > 1
      ? currentTrack.track_number - 2
      : 0;

  if (album && album.mediaUri.includes(":album:")) {
    return {
      props: {
        tracks,
        album,
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

export default SingleAlbumPage;