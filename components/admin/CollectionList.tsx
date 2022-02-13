import { Collection } from "@custom-types/Collection";
import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { CollectionItem } from "./CollectionItem";

const reorder = function <E>(list: E[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const CollectionList: React.FC<{ collections: Collection[] }> = ({
  collections: initialCollections,
}) => {
  const [collections, setCollections] =
    React.useState<Collection[]>(initialCollections);

  const onDragEnd = React.useCallback(
    (result: DropResult) => {
      if (
        result.destination &&
        result.destination.index !== result.source.index
      ) {
        setCollections((unorderedCollections) => {
          return reorder(
            unorderedCollections,
            result.source.index,
            result.destination!.index
          );
        });
      }
    },
    [setCollections]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="divide-y-2 divide-slate-600"
          >
            {collections.map((collection, index) => {
              return (
                <CollectionItem
                  collection={collection}
                  key={collection.mediaUri}
                  index={index}
                  onUpdate={(newCollection) => {
                    console.log(newCollection);
                  }}
                  onRemove={() => {
                    console.log("TODO remove from database");
                    setCollections((oldCollections) => {
                      return oldCollections.filter(
                        (col) => col.mediaUri !== collection.mediaUri
                      );
                    });
                  }}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
