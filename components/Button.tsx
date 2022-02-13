import * as React from "react";
import classNames from "classnames";

export type ButtonSize = "sm" | "lg";

export const useButtonStyles = (size: ButtonSize, className?: string) =>
  React.useMemo(() => {
    return classNames(
      "border rounded-lg p-4 flex items-center justify-center shadow-lg border-slate-300 bg-slate-900 hover:bg-slate-800 active:bg-slate-800",
      {
        "w-24 h-24": size === "lg",
        "w-14 h-14": size === "sm",
      },
      className
    );
  }, [size, className]);

export const Button: React.FC<{
  size?: ButtonSize;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}> = ({ onClick, disabled, children, className, size = "sm" }) => {
  const buttonStyles = useButtonStyles(size, className);

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
