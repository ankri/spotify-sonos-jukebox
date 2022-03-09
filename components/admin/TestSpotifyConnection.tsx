import * as React from "react";
import { FaSpotify } from "react-icons/fa";
import { MdCheckCircle, MdError, MdPending } from "react-icons/md";

export const TestSpotifyConnection: React.FC<{}> = ({}) => {
  const [status, setStatus] = React.useState<
    "pending" | "successful" | "error"
  >("pending");

  React.useEffect(() => {
    fetch("/api/admin/test-spotify")
      .then((response) => {
        if (response.ok && response.status === 200) {
          setStatus("successful");
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  if (status === "successful") {
    return (
      <div className="rounded-md bg-green-900 p-4 mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <MdCheckCircle className="text-green-100" />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-green-50 flex flex-row items-center space-x-1">
              <span className="mr-1">Connection to</span>
              <FaSpotify className="text-spotify" />
              <span>Spotify established successfully</span>
            </p>
          </div>
        </div>
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="rounded-md bg-red-50 p-4 mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <MdError className="text-red-400" />{" "}
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-red-700">
              Connection to Spotify failed. Please add your spotify credentials
              to <code>./config/config.json</code> - Follow the steps in the{" "}
              <a
                href="https://github.com/ankri/spotify-sonos-jukebox"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                readme
              </a>{" "}
              for more information
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <MdPending /> <span>Checking connection to spotify</span>
      </div>
    );
  }
};
