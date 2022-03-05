import { useButtonStyles } from "@components/Button";
import { Collection, CollectionTypes } from "@custom-types/Collection";
import * as React from "react";
import { MdPlaylistAdd, MdHelpOutline, MdCheck } from "react-icons/md";

const validateSpotifyUrl = (
  url: string
): { mediaId: string; mediaType: "album" | "playlist" } | null => {
  const pattern = new RegExp(
    /https:\/\/open\.spotify\.com\/(album|playlist)\/([A-Za-z0-9]+)(\?si=[A-Za-z0-9\-\_]+)?/gm
  );
  const result = pattern.exec(url);
  if (result) {
    console.log(result);
    const type = result[1];
    const id = result[2];
    return { mediaId: id, mediaType: type as "album" | "playlist" };
  } else {
    return null;
  }
};

export const AddAlbumOrPlaylist: React.FC<{
  collectionType: keyof typeof CollectionTypes;
  onCreateCollection: (newCollection: Collection) => void;
}> = ({ collectionType, onCreateCollection }) => {
  const [isHelpVisible, setIsHelpVisible] = React.useState(false);
  const buttonStyles = useButtonStyles("sm", "flex flex-row w-auto space-x-2");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const url = event.currentTarget.url.value;
        event.currentTarget.url.value = "";
        const validationResult = validateSpotifyUrl(url);
        if (validationResult) {
          const response = await fetch(`/api/collections/${collectionType}`, {
            method: "POST",
            body: JSON.stringify({
              mediaId: validationResult.mediaId,
              mediaType: validationResult.mediaType,
              collectionType,
            }),
          });
          const collection = (await response.json()) as Collection;
          onCreateCollection(collection);
        }
      }}
    >
      <label
        htmlFor="mediaUri"
        className="block text-sm font-medium text-slate-200"
        style={{ fontVariant: "small-caps" }}
      >
        Add a new Album or Playlist to your {collectionType} collection by
        pasting the Spotify Link here
      </label>
      <div className="flex flex-row space-x-4">
        <input
          type="url"
          name="url"
          id="url"
          pattern="https:\/\/open\.spotify\.com\/(album|playlist)\/([A-Za-z0-9]+)(\?si=[A-Za-z0-9\-]+)?"
          className="shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-50 bg-slate-800 rounded-md"
          placeholder="e.g. https://open.spotify.com/album/4g5WyR9bzlz0adcdBUB9RQ"
          required
        />
        <button type="submit" className={buttonStyles}>
          <MdPlaylistAdd className="w-6 h-6" />{" "}
          <span className="hidden md:block">add</span>
        </button>
      </div>
      <div className="mt-4">
        <span
          className="cursor-pointer text-slate-400 flex flex-row items-center space-x-2"
          onClick={() => {
            setIsHelpVisible((isVisible) => !isVisible);
          }}
        >
          <MdHelpOutline />
          <span className="hover:underline ">How do I get a Spotify Link?</span>
        </span>
      </div>
      {isHelpVisible ? (
        <>
          <ol className="list-decimal space-y-1">
            <li>
              Open your Spotify app on your device{" "}
              <span className="text-slate-400 italic">
                (computer / mobile phone / tablet)
              </span>{" "}
              or open the{" "}
              <a
                href="https://open.spotify.com/"
                className="underline underline-offset-1 hover:text-green-500"
                target="_blank"
                rel="noreferrer"
              >
                Web Player
              </a>
              .
            </li>
            <li>
              Look for the album or playlist you want to add and click on the
              three dots next to the heart.
              <img
                src="/images/admin/media-uri-help-01.png"
                alt="The location of the three dots button"
              />
            </li>
            <li>
              Click on &quot;Share&quot; and then &quot;Copy album link&quot; or
              &quot;Copy playlist link&quot;
              <img
                src="/images/admin/media-uri-help-02.png"
                alt="A menu showing Share and copy album link"
              />
            </li>
            <li className="flex flex-row items-center">
              Paste the link in the input above and hit enter or click on the{" "}
              <span className="flex flex-row border rounded-md items-center p-1 mx-2">
                <MdPlaylistAdd className="mr-1" /> add
              </span>{" "}
              button.
            </li>
          </ol>
          <button
            className={buttonStyles}
            onClick={() => {
              setIsHelpVisible(false);
            }}
          >
            <MdCheck />
            <span>Hide help</span>
          </button>
        </>
      ) : null}
    </form>
  );
};
