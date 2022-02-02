import classNames from "classnames";
import * as React from "react";
import { MdArrowBack } from "react-icons/md";
import { Button } from "./Button";
import { TextToSpeechHeading } from "./TextToSpeechHeading";

export const Navbar: React.FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "bg-slate-700 p-2 shadow-lg flex flex-row space-x-4 items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Navigation: React.FC<{
  title?: string;
  onBackClick: () => void;
  className?: string;
}> = ({ className, title, onBackClick, children }) => {
  return (
    <Navbar className={className}>
      <Button onClick={onBackClick}>
        <MdArrowBack className="w-8 h-8 text-slate-300" />
      </Button>
      {title ? (
        <TextToSpeechHeading className="text-2xl line-clamp-1" text={title} />
      ) : null}
      {children}
    </Navbar>
  );
};
