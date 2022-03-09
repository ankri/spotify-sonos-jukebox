import * as React from "react";
import classNames from "classnames";
import { Dialog, Transition } from "@headlessui/react";

import { FaHome, FaBars } from "react-icons/fa";
import {
  MdClose,
  MdOutlineMenuBook,
  MdOutlinePlayArrow,
  MdQueueMusic,
  MdSchool,
  MdSettings,
} from "react-icons/md";
import { CurrentlyPlaying } from "@components/CurrentlyPlaying";
import { MiniControls } from "@components/controls/MiniControls";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { useRouter } from "next/router";

const adminNavigation = [
  {
    name: "Music",
    href: "/admin/music",
    icon: BsMusicNoteBeamed,
  },
  {
    name: "Audiobooks",
    href: "/admin/audiobooks",
    icon: MdSchool,
  },
  {
    name: "Stories",
    href: "/admin/stories",
    icon: MdOutlineMenuBook,
  },
  { name: "Tracks", href: "/admin/tracks", icon: MdQueueMusic },
  { name: "Settings", href: "/admin/config", icon: MdSettings },
];

const playerNavigation = [
  { name: "Home", href: `/`, icon: FaHome },
  {
    name: "Player",
    href: `/player`,
    icon: MdOutlinePlayArrow,
  },
];

export const AdminLayout: React.FC<{}> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { asPath } = useRouter();
  const selectedRoute = React.useMemo(
    () => adminNavigation.find((entry) => asPath.startsWith(entry.href)),
    [asPath]
  )!;
  const Icon = selectedRoute.icon;

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={React.Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <MdClose
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">📻</div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto divide-y">
                  <nav className="px-2 space-y-1 my-1">
                    {adminNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          asPath.startsWith(item.href)
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            asPath.startsWith(item.href)
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                  <nav className="pt-1 px-2 space-y-1">
                    {playerNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-slate-800">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-slate-800 space-x-3">
              <span>📻</span>
              <span className="text-2xl">jukebox</span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto divide-y">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {adminNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      asPath.startsWith(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        asPath.startsWith(item.href)
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
              <nav className="flex-1 px-2 py-4 space-y-1">
                {playerNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex bg-slate-700 shadow">
            <button
              type="button"
              className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 p-3 flex justify-between">
              <CurrentlyPlaying showArtist size="sm" />
              <div className="block md:hidden">&nbsp;</div>
              <MiniControls />
            </div>
          </div>

          <main className="flex-1">
            <div className="py-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold flex flex-row items-center">
                  <Icon className="text-gray-300 mr-3 h-8 w-8" />{" "}
                  {selectedRoute?.name}
                </h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">{children}</div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
