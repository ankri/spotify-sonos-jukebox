import { useCoverArtStyles } from "@components/CoverArt";
import { Dialog } from "@headlessui/react";
import * as React from "react";
import { FaSpotify } from "react-icons/fa";
import { MdCancel, MdCheck } from "react-icons/md";
import { EditInput } from "./EditInput";

const PlayButton: React.FC<{ mediaUri: string }> = ({ mediaUri }) => {
  return (
    <a
      className="flex flex-row group items-center justify-center space-x-2 hover:text-slate-200 p-2 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-100"
      href={mediaUri}
    >
      <FaSpotify className="text-spotify group-hover:text-green-600" />
      <span>Play on Spotify</span>
    </a>
  );
};

export interface Item {
  name: string;
  mediaUri: string;
  artist: string | null;
  imageUrl: string | null;
}

export const EditDialog: React.FC<{
  mediaUri: string;
  isDialogOpen: boolean;
  onClose: () => void;
  item: Item;
  onUpdate: (updatedItem: Item) => void;
}> = ({ mediaUri, isDialogOpen, onClose, item: initialItem, onUpdate }) => {
  const [item, setItem] = React.useState(initialItem);
  const [imageUrl, setImageUrl] = React.useState(initialItem.imageUrl);
  const coverArtStyles = useCoverArtStyles("md");
  const title = React.useMemo(() => {
    if (mediaUri.includes(":album:")) {
      return "Edit album";
    } else if (mediaUri.includes(":playlist:")) {
      return "Edit playlist";
    } else if (mediaUri.includes(":track:")) {
      return "Edit track";
    }
  }, [mediaUri]);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onUpdate({ ...item, imageUrl });
        }}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-slate-800 rounded-lg max-w-sm lg:max-w-lg xl:max-w-xl mx-auto border border-slate-300 w-full">
            <div className="py-4 px-6">
              <Dialog.Title className="text-xl">{title}</Dialog.Title>
              <div className="space-y-2 mt-2">
                <EditInput
                  label="Name"
                  name="name"
                  onChange={(newName) => {
                    setItem((item: Item) => ({
                      ...item,
                      name: newName,
                    }));
                  }}
                  value={item.name}
                  required
                  autoFocus
                />
                <EditInput
                  label="Artist (optional)"
                  name="artist"
                  onChange={(newArtist) => {
                    setItem((item: Item) => ({
                      ...item,
                      artist: newArtist,
                    }));
                  }}
                  value={item.artist ?? ""}
                />
                <img
                  alt={item.name}
                  src={
                    imageUrl
                      ? imageUrl
                      : `/api/images/${item.mediaUri}?original`
                  }
                  {...coverArtStyles}
                />
                <EditInput
                  label="Image URL (optional)"
                  placeholder="Leave blank to use the original image"
                  name="imageUrl"
                  onChange={(newUrl) => {
                    const newImageUrl =
                      newUrl && newUrl.length > 0 ? newUrl : null;
                    setImageUrl(newImageUrl);
                  }}
                  type="url"
                  value={imageUrl ?? ""}
                  onReset={() => {
                    setImageUrl(null);
                  }}
                />
                <hr />
                <PlayButton mediaUri={item.mediaUri} />
              </div>
            </div>
            <div className="bg-slate-700 flex py-4 px-6 flex-row-reverse">
              <button
                className="w-full p-2 flex ml-4 items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-green-900 hover:bg-green-800 active:bg-slate-800"
                type="submit"
              >
                <MdCheck className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button
                className="w-full p-2 flex items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-slate-900 hover:bg-slate-800 active:bg-slate-800"
                type="button"
                onClick={() => {
                  onClose();
                }}
              >
                <MdCancel className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};
