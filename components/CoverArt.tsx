import classNames from "classnames";
import * as React from "react";

export const useCoverArtStyles = (
  size: React.ComponentProps<typeof CoverArt>["size"],
  className?: string
) => {
  let sizeInPx = 320;
  switch (size) {
    case "sm":
      sizeInPx = 56;
      break;
    case "md":
      sizeInPx = 224;
      break;
    default:
      sizeInPx = 320;
  }

  return React.useMemo(
    () => ({
      style: {
        width: sizeInPx,
        height: sizeInPx,
        minHeight: sizeInPx,
        minWidth: sizeInPx,
        maxHeight: sizeInPx,
        maxWidth: sizeInPx,
      },
      className: classNames(
        "rounded-lg border border-slate-900 shadow-lg object-cover",
        className
      ),
    }),
    [sizeInPx, className]
  );
};

export const CoverArt: React.FC<{
  size: "lg" | "md" | "sm";
  mediaUri: string;
  alt: string;
  onClick?: () => void;
  progress?: number;
  showOriginal?: boolean;
  noCache?: boolean;
  className?: string;
}> = ({
  mediaUri,
  alt,
  progress,
  size,
  onClick,
  showOriginal = false,
  noCache = false,
  className: additionalClassName,
}) => {
  const { style, className } = useCoverArtStyles(size, additionalClassName);

  return (
    <div className="relative">
      <img
        onClick={onClick}
        style={style}
        alt={alt}
        className={className}
        src={`/api/images/${mediaUri}${showOriginal ? "?original" : ""}${
          noCache ? "?" + Date.now() : ""
        }`}
      />
      {typeof progress !== "undefined" ? (
        <>
          <div
            className="absolute h-2 opacity-50 bg-black w-full rounded-b-lg"
            style={{ bottom: 1, left: 1 }}
          ></div>
          <div
            className="bg-white absolute h-2 rounded-bl-lg opacity-80"
            style={{
              width: `calc(100% * ${progress})`,
              bottom: 1,
              left: 1,
              borderBottomRightRadius: progress < 1 ? "none" : "0.5rem",
              transition: "width 1s",
            }}
          />
        </>
      ) : null}
    </div>
  );
};
