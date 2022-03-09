import { Listbox } from "@headlessui/react";
import classNames from "classnames";
import * as React from "react";
import { HiSelector } from "react-icons/hi";
import { MdCheck, MdSpeaker } from "react-icons/md";
import useSWR from "swr";

export const SelectRoom: React.FC<{
  url: string;
  selectedRoom: string;
  onSelectRoom: (selectedZone: string) => void;
}> = ({ url, selectedRoom, onSelectRoom }) => {
  const { data } = useSWR<string[]>(`/api/admin/rooms?url=${url}`);

  if (!data) {
    return <div>Loading speaker list</div>;
  } else {
    if (data.length === 0) {
      return (
        <div>
          Cannot load speaker list. Please fix the Sonos HTTP API URL above.
        </div>
      );
    } else {
      return (
        <div>
          <Listbox value={selectedRoom} onChange={onSelectRoom}>
            <Listbox.Label
              className="flex flex-row items-center space-x-2 text-sm font-medium text-slate-200"
              style={{ fontVariant: "small-caps" }}
            >
              <MdSpeaker /> <span>Bind to this speaker</span>
            </Listbox.Label>

            <div className="mt-1 relative">
              <Listbox.Button className="bg-slate-800 relative w-full border border-slate-50 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                <span className="block truncate">{selectedRoom}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <HiSelector className="h-5 w-5 text-gray-400" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-slate-800 border-slate-50 border shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                {data.map((room) => (
                  <Listbox.Option
                    key={room}
                    value={room}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-white",
                        "cursor-pointer select-none relative py-2 pl-3 pr-9"
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {room}
                        </span>

                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-white">
                            <MdCheck className="h-5 w-5" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      );
    }
  }
};
