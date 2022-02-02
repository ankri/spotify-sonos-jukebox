import * as React from "react";

const isDev = process.env.NODE_ENV === "development";

export const RootLayout: React.FC = ({ children }) => {
  return (
    <div
      className="flex flex-col"
      style={{
        // width: 800,
        // height: 480,
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
};
