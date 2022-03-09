import * as React from "react";
import * as Converter from "@spotify/converter";
import { Swiper, SwiperSlide } from "swiper/react";
import { CoverArt } from "./CoverArt";
import { TextToSpeechHeading } from "./TextToSpeechHeading";
import { useRouter } from "next/router";

interface Track {
  id: string;
  name: string;
}

export const CollectionSwiper: React.FC<{
  tracks: Track[];
  collectionMediaUri: string;
  selectedTrackNumber?: number;
}> = ({ tracks, selectedTrackNumber, collectionMediaUri }) => {
  const Router = useRouter();

  const [slidesPerView, setSlidesPerView] = React.useState(1);
  React.useEffect(() => {
    const maxSlides = Math.floor(document.body.clientWidth / 224);
    if (tracks.length < maxSlides) {
      setSlidesPerView(tracks.length);
    } else {
      setSlidesPerView(maxSlides);
    }
  }, [tracks]);

  return (
    <div className="w-full flex flex-grow items-center p-4">
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={50}
        initialSlide={selectedTrackNumber}
      >
        {tracks.map((track, index) => {
          return (
            <SwiperSlide key={track.id}>
              <div className="flex flex-col items-center space-y-2">
                <CoverArt
                  size="md"
                  alt={track.name}
                  mediaUri={Converter.getSpotifyTrackUriFromId(track.id)}
                  onClick={async () => {
                    // TODO find a way to re-use the usePlayCollection hook here
                    if (collectionMediaUri.includes(":playlist:")) {
                      const playlistId =
                        Converter.getPlaylistIdFromSpotifyUri(
                          collectionMediaUri
                        );
                      await fetch(
                        `/api/playlist/${playlistId}/track/${index + 1}`
                      );
                    } else if (collectionMediaUri.includes(":album:")) {
                      const albumId =
                        Converter.getAlbumIdFromSpotifyUri(collectionMediaUri);
                      await fetch(`/api/album/${albumId}/track/${index + 1}`);
                    }

                    Router.push(`/player`);
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
  );
};
