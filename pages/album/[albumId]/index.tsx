import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { RootLayout } from "@layouts/RootLayout";
import * as Spotify from "@spotify/api";
import * as Database from "@database/database";
import * as Converter from "@spotify/converter";
import { Navigation } from "@components/Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { MiniControls } from "@components/controls/MiniControls";
import { SonosState } from "@custom-types/Sonos";
import * as SonosApi from "@sonos/api";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";
import { CoverArt } from "@components/CoverArt";
import { CurrentlyPlaying } from "@components/CurrentlyPlaying";
import { Collection } from "@custom-types/Collection";

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

  return (
    <RootLayout>
      <>
        <Navigation
          title={album.name}
          onBackClick={() => {
            Router.replace("/");
          }}
        />
        <div className="w-full flex flex-grow items-center p-4">
          <Swiper
            slidesPerView={3}
            spaceBetween={50}
            initialSlide={selectedTrackNumber}
          >
            {tracks.map((track) => {
              return (
                <SwiperSlide key={track.id}>
                  <div className="flex flex-col items-center space-y-2">
                    <CoverArt
                      size="md"
                      alt={track.name}
                      mediaUri={Converter.getSpotifyTrackUriFromId(track.id)}
                      onClick={async () => {
                        const albumId = Converter.getAlbumIdFromSpotifyUri(
                          album.mediaUri
                        );
                        await fetch(
                          `/api/album/${albumId}/track/${track.track_number}`
                        );
                        Router.push(`/album/${albumId}/player`);
                      }}
                    />
                    <TextToSpeechHeading
                      className="text-lg text-center text-ellipsis max-h-12"
                      text={track.name}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex flex-row justify-between p-4">
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
