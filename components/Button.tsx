import * as React from "react";
import classNames from "classnames";

export const Button: React.FC<{
  size?: "sm" | "lg";
  onClick: () => void;
  className?: string;
}> = ({ onClick, children, className, size = "sm" }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={classNames(
        "border rounded-lg p-4 flex items-center justify-center shadow-lg border-slate-300 bg-slate-900 hover:bg-slate-800 active:bg-slate-800",
        {
          "w-24 h-24": size === "lg",
          "w-14 h-14": size === "sm",
        },
        className
      )}
    >
      {children}
    </button>
  );
};
