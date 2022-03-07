import { CoverArt } from "@components/CoverArt";
import * as React from "react";
import { EditDialog, Item } from "./edit/EditDialog";

export const EditableTrackItem: React.FC<{
  item: Item;
  onUpdate: (updatedItem: Item) => void;
}> = ({ item, onUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <div
      key={item.mediaUri}
      className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-slate-800 active:bg-slate-800 focus:bg-slate-800"
      onClick={() => {
        setIsDialogOpen(true);
      }}
    >
      <CoverArt mediaUri={item.mediaUri} alt={item.name} size="sm" noCache />
      <div className="flex-grow">
        <h1
          className="text-md md:text-2xl tracking-wide text-slate-50"
          style={{ fontVariant: "small-caps" }}
        >
          {item.name}
        </h1>
        <h2
          className="text-xs md:text-md tracking-wide text-slate-300"
          style={{ fontVariant: "small-caps" }}
        >
          {item.artist}
        </h2>
      </div>

      <EditDialog
        isDialogOpen={isDialogOpen}
        item={item}
        mediaUri={item.mediaUri}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onUpdate={(updatedItem) => {
          setIsDialogOpen(false);
          onUpdate(updatedItem);
        }}
      />
    </div>
  );
};
