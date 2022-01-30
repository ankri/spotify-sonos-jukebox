import type { GetServerSideProps, NextPage } from "next";
import { SonosState } from "@custom-types/Sonos";
import * as SonosApi from "@sonos/api";
import { Player } from "@components/Player";
import { RootLayout } from "@layouts/RootLayout";
import { Navigation } from "@components/Navigation";
import { useRouter } from "next/router";

const NowPlayingPage: NextPage<{
  sonosState: SonosState;
}> = ({ sonosState: initialSonosState }) => {
  const Router = useRouter();

  return (
    <RootLayout>
      <Navigation
        onBackClick={() => {
          Router.back();
        }}
      />
      <Player sonosState={initialSonosState} />
    </RootLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const playingState = await SonosApi.getState();

  return {
    props: { sonosState: playingState },
  };
};

export default NowPlayingPage;
