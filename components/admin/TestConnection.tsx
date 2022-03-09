import * as React from "react";
import { MdCheckCircle, MdError, MdPending } from "react-icons/md";

export const TestConnection: React.FC<{ url: string }> = ({ url }) => {
  const [status, setStatus] = React.useState<
    "pending" | "success" | "failed" | "initial"
  >("initial");

  React.useEffect(() => {
    if (status !== "pending") {
      setStatus("pending");
      const testConnectionUrl = "/api/admin/test-connection";
      const params = new URLSearchParams({ url: url });

      fetch(`${testConnectionUrl}?${params.toString()}`)
        .then((response) => {
          if (response.ok) {
            setStatus("success");
          } else {
            setStatus("failed");
          }
        })
        .catch(() => {
          setStatus("failed");
        });
    }
  }, [url]);

  if (status === "success") {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <MdCheckCircle className="text-green-300" />{" "}
        <span>Connection successful</span>
      </div>
    );
  } else if (status === "failed") {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <MdError className="text-red-400" />{" "}
        <span>
          Connection failed. Please check if the server is running and the URL
          is correct.
        </span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row space-x-2 items-center">
        <MdPending /> <span>Checking connection</span>
      </div>
    );
  }
};
