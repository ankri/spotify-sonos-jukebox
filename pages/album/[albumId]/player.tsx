import type { GetServerSideProps, NextPage } from "next";
import { SonosState } from "@custom-types/Sonos";
import * as SonosApi from "@sonos/api";
import { Player } from "@components/Player";
import * as Database from "@database/database";
import * as Converter from "@spotify/converter";
import { RootLayout } from "@layouts/RootLayout";
import { Navigation } from "@components/Navigation";
import { useRouter } from "next/router";

const NowPlayingPage: NextPage<{
  sonosState: SonosState;
  albumName: string;
}> = ({ albumName: albumName, sonosState: initialSonosState }) => {
  const Router = useRouter();

  return (
    <RootLayout>
      <Navigation
        title={albumName}
        onBackClick={() => {
          Router.back();
        }}
      />
      <Player albumName={albumName} sonosState={initialSonosState} />
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const playingState = await SonosApi.getState();
  const album = Database.getCollectionInfo(
    Converter.getSpotifyAlbumUriFromAlbumId(query.albumId as string)
  );

  if (album) {
    return {
      props: { ...playingState, albumName: album.name },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

export default NowPlayingPage;
