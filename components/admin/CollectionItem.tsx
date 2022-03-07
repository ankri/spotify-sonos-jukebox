import * as React from "react";
import { CoverArt } from "@components/CoverArt";
import { Collection } from "@custom-types/Collection";
import { Draggable } from "react-beautiful-dnd";
import { Button } from "@components/Button";
import { MdSwapVert, MdEdit } from "react-icons/md";
import { RemoveButton } from "./edit/RemoveButton";
import { EditDialog } from "./edit/EditDialog";

export const CollectionItem: React.FC<{
  collection: Collection;
  index: number;
  onRemove: () => void;
  onUpdate: (newCollection: Collection) => void;
}> = ({ collection, index, onRemove, onUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <Draggable draggableId={collection.mediaUri} index={index}>
        {(provided) => (
          <div
            className="grid items-center gap-2 gap-y-0 p-2 collection-list-item cursor-pointer hover:bg-slate-800 active:bg-slate-800 focus:bg-slate-800"
            ref={provided.innerRef}
            onClick={(event) => {
              // we cannot call stopPropagation in Popover.Button so we have to skip it here
              if (
                !(
                  event.target instanceof SVGElement ||
                  event.target instanceof HTMLButtonElement
                )
              ) {
                setIsDialogOpen(true);
              }
            }}
            {...provided.draggableProps}
          >
            <div className="text-xl md:text-2xl text-right text-slate-300 tracking-wider order-1 max-w-fit">
              {index + 1}
            </div>
            <div className="order-2 max-w-fit">
              <CoverArt
                mediaUri={collection.mediaUri}
                alt={collection.name}
                size="sm"
              />
            </div>
            <div className="max-w-full order-last md:order-3 col-start-2 col-span-3 md:col-start-3 md:col-span-1">
              <h1
                className="text-md md:text-2xl tracking-wide text-slate-50"
                style={{ fontVariant: "small-caps" }}
              >
                {collection.name}
              </h1>
              <h2
                className="text-xs md:text-md tracking-wide text-slate-300"
                style={{ fontVariant: "small-caps" }}
              >
                {collection.artist}
              </h2>
            </div>
            <div className="flex flex-row space-x-2 order-4 max-w-fit justify-self-end">
              <Button
                size="sm"
                onClick={(event) => {
                  event.stopPropagation();
                }}
                className="hover:bg-yellow-900 cursor-grab"
                {...provided.dragHandleProps}
              >
                {/* <MdEdit className="w-8 h-8" /> */}
                <MdSwapVert className="w-8 h-8" />
              </Button>

              <RemoveButton onRemove={onRemove} className="hover:bg-red-900" />
            </div>
          </div>
        )}
      </Draggable>
      <EditDialog
        mediaUri={collection.mediaUri}
        item={collection}
        isDialogOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
        onUpdate={(updatedCollection) => {
          setIsDialogOpen(false);
          onUpdate({ ...collection, ...updatedCollection });
        }}
      />
    </>
  );
};
