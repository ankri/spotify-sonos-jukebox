import * as React from "react";
import classNames from "classnames";

export const TextToSpeechHeading: React.FC<{
  className: string;
  text: string;
  children?: never;
  as?: "h1" | "h2";
}> = ({ className, text, as: Component = "h1" }) => {
  return (
    <Component
      className={classNames("tracking-wider", className)}
      style={{ fontVariant: "small-caps" }}
      onClick={async () => {
        await fetch("/api/say", {
          method: "POST",
          body: JSON.stringify({
            text,
          }),
        });
      }}
    >
      {text}
    </Component>
  );
};

// p {
//   display: -webkit-box;
//   max-width: 200px;
//   -webkit-line-clamp: 4;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// }
