import * as React from "react";

export const PageLayout: React.FC<{
  leftControls: React.ReactNode;
  rightControls: React.ReactNode;
}> = ({ leftControls, rightControls, children }) => {
  return (
    <div
      className="flex flex-col justify-between"
      style={{ height: "calc(100vh - 72px)" }}
    >
      <div className="w-full flex flex-grow items-center px-4 py-2">
        {children}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-2 space-y-4">
        {leftControls}
        <div className="flex items-center justify-center">{rightControls}</div>
      </div>
    </div>
  );
};
