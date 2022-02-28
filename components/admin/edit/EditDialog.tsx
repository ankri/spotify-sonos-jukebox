import { CoverArt, useCoverArtStyles } from "@components/CoverArt";
import { Collection } from "@custom-types/Collection";
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

export const EditDialog: React.FC<{
  isDialogOpen: boolean;
  onClose: () => void;
  collection: Collection;
  onUpdate: (updatedCollection: Collection) => void;
}> = ({ isDialogOpen, onClose, collection: initialCollection, onUpdate }) => {
  const [collection, setCollection] = React.useState(initialCollection);
  const [imageUrl, setImageUrl] = React.useState(initialCollection.imageUrl);
  const coverArtStyles = useCoverArtStyles("md");

  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-slate-800 rounded-lg max-w-sm lg:max-w-lg xl:max-w-xl mx-auto border border-slate-300 w-full">
          <div className="py-4 px-6">
            <Dialog.Title className="text-xl">Edit item</Dialog.Title>
            <div className="space-y-2 mt-2">
              <EditInput
                label="Name"
                name="name"
                onChange={(newName) => {
                  setCollection((collection: Collection) => ({
                    ...collection,
                    name: newName,
                  }));
                }}
                value={collection.name}
                autoFocus
              />
              <EditInput
                label="Artist (optional)"
                name="artist"
                onChange={(newArtist) => {
                  setCollection((collection: Collection) => ({
                    ...collection,
                    artist: newArtist,
                  }));
                }}
                value={collection.artist ?? ""}
              />
              <img
                alt={collection.name}
                src={
                  imageUrl
                    ? imageUrl
                    : `/api/images/${collection.mediaUri}?original`
                }
                {...coverArtStyles}
              />
              <EditInput
                label="Cover Art URL (optional)"
                name="imageUrl"
                onChange={(newUrl) => {
                  const newImageUrl =
                    newUrl && newUrl.length > 0 ? newUrl : null;
                  setImageUrl(newImageUrl);
                }}
                type="url"
                value={imageUrl ?? ""}
              />
              <hr />
              <PlayButton mediaUri={collection.mediaUri} />
            </div>
          </div>
          <div className="bg-slate-700 flex py-4 px-6 flex-row-reverse">
            <button
              className="w-full p-2 flex ml-4 items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-green-900 hover:bg-green-800 active:bg-slate-800"
              onClick={() => {
                onUpdate(collection);
              }}
            >
              <MdCheck className="w-5 h-5" />
              <span>Save</span>
            </button>
            <button
              className="w-full p-2 flex items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-slate-900 hover:bg-slate-800 active:bg-slate-800"
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
    </Dialog>
  );
};
