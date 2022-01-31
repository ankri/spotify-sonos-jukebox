import type { GetServerSideProps, NextPage } from "next";
import { SonosState } from "@custom-types/Sonos";
import * as SonosApi from "@sonos/api";
import { Player } from "@components/Player";
import { RootLayout } from "@layouts/RootLayout";
import { Navigation } from "@components/Navigation";
import { useRouter } from "next/router";
import { Button } from "@components/Button";
import { HiOutlineMenu } from "react-icons/hi";

const NowPlayingPage: NextPage<{
  sonosState: SonosState;
}> = ({ sonosState: initialSonosState }) => {
  const Router = useRouter();

  return (
    <RootLayout>
      <Navigation
        className="justify-between"
        onBackClick={() => {
          Router.back();
        }}
      >
        <Button
          onClick={() => {
            Router.replace("/queue");
          }}
        >
          <HiOutlineMenu className="w-8 h-8 rotate-90 text-white"></HiOutlineMenu>
        </Button>
      </Navigation>
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
