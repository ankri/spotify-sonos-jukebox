import * as React from "react";
import { useButtonStyles } from "@components/Button";
import { MdCancel, MdCheck, MdDelete } from "react-icons/md";
import { Popover } from "@headlessui/react";

export const RemoveButton: React.FC<{
  onRemove: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ onRemove, className, disabled }) => {
  const buttonStyles = useButtonStyles("sm", className);
  return (
    <Popover className="relative">
      <Popover.Button className={buttonStyles} disabled={disabled}>
        <MdDelete className="w-8 h-8" />
      </Popover.Button>
      <Popover.Panel className="absolute right-0 space-y-4 z-10 bg-slate-600 border border-slate-400 shadow-lg rounded-md p-4 min-w-fit w-64">
        {({ close }) => {
          return (
            <>
              <div>Do you really want to remove this item from the list?</div>

              <div className="flex flex-row justify-end space-x-2">
                <button
                  className="p-2 px-4 flex items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-slate-900 hover:bg-slate-800 active:bg-slate-800"
                  onClick={() => {
                    close();
                  }}
                >
                  <MdCancel className="w-4 h-4" /> <span>No</span>
                </button>
                <button
                  className="p-2 px-4 flex items-center space-x-2 border rounded-lg justify-center border-slate-300 bg-slate-900 hover:bg-slate-800 active:bg-slate-800"
                  onClick={() => {
                    onRemove();
                    close();
                  }}
                >
                  <MdCheck className="w-4 h-4" /> <span>Yes</span>
                </button>
              </div>
            </>
          );
        }}
      </Popover.Panel>
    </Popover>
  );
};
