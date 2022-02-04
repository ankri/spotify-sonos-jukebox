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
  sonosState: SonosState;
  selectedTrackNumber: number;
}> = ({
  tracks,
  album,
  sonosState: initialSonosState,
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
        <div
          className="flex flex-col justify-between"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <CollectionSwiper
            collectionMediaUri={album.mediaUri}
            tracks={tracks}
            selectedTrackNumber={selectedTrackNumber}
          />
          <div className="flex md:flex-row flex-col justify-between p-2 space-y-4">
            <CurrentlyPlaying sonosState={initialSonosState} />
            <div className="flex items-center justify-center">
              <MiniControls sonosState={initialSonosState} />
            </div>
          </div>
        </div>
      </>
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const albumId = query.albumId as string;

  const album = await Database.getCollectionInfo(
    Converter.getSpotifyAlbumUriFromAlbumId(albumId)
  );

  const sonosState = await SonosApi.getState();
  const tracks = await Spotify.getTrackListForAlbum(albumId);
  const currentTrack = tracks.find(
    (track) => track.uri === sonosState.currentTrack.uri
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
        sonosState,
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
