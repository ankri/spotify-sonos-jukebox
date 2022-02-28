import { Collection, CollectionTypes } from "@custom-types/Collection";
import * as React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useSWRConfig } from "swr";
import { CollectionItem } from "./CollectionItem";

const reorder = function <E>(list: E[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const CollectionList: React.FC<{
  collections: Collection[];
  collectionsType: keyof typeof CollectionTypes;
}> = ({ collections, collectionsType }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { mutate } = useSWRConfig();
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpdate = React.useCallback(async (newCollection: Collection) => {
    const response = await fetch(`/api/collections/${collectionsType}`, {
      method: "PUT",
      body: JSON.stringify(newCollection),
    });

    if (response.status === 200) {
      mutate(
        `/api/collections/${collectionsType}`,
        (oldCollections: Collection[]) => {
          if (oldCollections) {
            const index = oldCollections.findIndex(
              (collection) => collection.mediaUri === newCollection.mediaUri
            );
            oldCollections[index] = newCollection;
            return [...oldCollections];
          }
        }
      );
    }
  }, []);

  const onRemove = React.useCallback(async (collection: Collection) => {
    const response = await fetch(`/api/collections/${collectionsType}`, {
      method: "DELETE",
      body: JSON.stringify(collection),
    });
    if (response.status === 200) {
      mutate(
        `/api/collections/${collectionsType}`,
        (oldCollections: Collection[]) => {
          if (oldCollections) {
            return oldCollections.filter(
              (col) => col.mediaUri !== collection.mediaUri
            );
          }
        }
      );
    }
  }, []);

  const onDragEnd = React.useCallback(
    async (result: DropResult) => {
      if (
        result.destination &&
        result.destination.index !== result.source.index
      ) {
        const newlyOrderedCollections = reorder(
          collections,
          result.source.index,
          result.destination!.index
        ).map((collection, index) => ({
          ...collection,
          index: index + 1,
        }));

        mutate(
          `/api/collections/${collectionsType}`,
          newlyOrderedCollections,
          false
        );
        console.log(newlyOrderedCollections);

        await fetch(`/api/collections/reorder`, {
          method: "POST",
          body: JSON.stringify(newlyOrderedCollections),
        });
        mutate(`/api/collections/${collectionsType}`);
      }
    },
    [collections]
  );

  if (isMounted) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div
              className="divide-y-2 divide-slate-600"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {collections.map((collection, index) => {
                return (
                  <CollectionItem
                    key={collection.mediaUri}
                    collection={collection}
                    index={index}
                    onUpdate={onUpdate}
                    onRemove={() => {
                      onRemove(collection);
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
  } else {
    return <div />;
  }
};
