import { Collection } from "@custom-types/Collection";
import { Dialog } from "@headlessui/react";
import * as React from "react";
import { MdCancel, MdCheck } from "react-icons/md";
import { EditInput } from "./EditInput";

export const EditDialog: React.FC<{
  isDialogOpen: boolean;
  onClose: () => void;
  collection: Collection;
  onUpdate: (updatedCollection: Collection) => void;
}> = ({ isDialogOpen, onClose, collection, onUpdate }) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onClose}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen ">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="relative bg-slate-800 rounded-lg max-w-sm mx-auto border border-slate-300 w-80">
          <div className="py-4 px-6">
            <Dialog.Title className="text-xl">Edit item</Dialog.Title>
            <div className="space-y-2 mt-2">
              <EditInput
                label="Name"
                name="name"
                onChange={() => {}}
                value={collection.name}
              />
              <EditInput
                label="Artist (optional)"
                name="artist"
                onChange={() => {}}
                value={collection.artist ?? ""}
              />
            </div>
          </div>
          <div className="bg-slate-700 flex py-4 px-6 space-x-4">
            <button
              className="w-full p-2 flex items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-slate-900 hover:bg-slate-800 active:bg-slate-800"
              onClick={() => {
                onClose();
              }}
            >
              <MdCancel className="w-5 h-5" />
              <span>Cancel</span>
            </button>
            <button
              className="w-full p-2 flex items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-green-900 hover:bg-green-800 active:bg-slate-800"
              onClick={() => {
                onUpdate(collection);
              }}
            >
              <MdCheck className="w-5 h-5" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
