import * as React from "react";

export const CoverArt: React.FC<{
  size: "lg" | "md" | "sm";
  mediaUri: string;
  alt: string;
  onClick?: () => void;
  progress?: number;
}> = ({ mediaUri, alt, progress, size, onClick }) => {
  const sizeInPx = React.useMemo(() => {
    switch (size) {
      case "sm":
        return 56;
      case "md":
        return 224;
      default:
        return 320;
    }
  }, [size]);

  return (
    <div className="relative">
      <img
        onClick={onClick}
        style={{
          width: sizeInPx,
          height: sizeInPx,
          minHeight: sizeInPx,
          minWidth: sizeInPx,
          maxHeight: sizeInPx,
          maxWidth: sizeInPx,
        }}
        alt={alt}
        className="rounded-lg border border-slate-900 shadow-lg object-cover"
        src={`/api/images/${mediaUri}`}
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
