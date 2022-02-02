import { useRouter } from "next/router";
import classNames from "classnames";
import * as React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { MdOutlineMenuBook, MdSchool } from "react-icons/md";
import { LinkButton } from "./LinkButton";
import { Navbar } from "./Navigation";

export const HomepageNavigation: React.FC = ({}) => {
  const { asPath } = useRouter();

  return (
    <Navbar className="justify-center">
      <LinkButton
        href="/music"
        className={classNames("hover:!bg-amber-700", {
          "!bg-amber-700": asPath === "/music",
        })}
      >
        <BsMusicNoteBeamed className="w-8 h-8 text-slate-300" />
      </LinkButton>
      <LinkButton
        href="/audiobooks"
        className={classNames("hover:!bg-teal-700", {
          "!bg-teal-700": asPath === "/audiobooks",
        })}
      >
        <MdSchool className="w-8 h-8 text-slate-300" />
      </LinkButton>
      <LinkButton
        href="/stories"
        className={classNames("hover:!bg-indigo-700", {
          "!bg-indigo-700": asPath === "/stories",
        })}
      >
        <MdOutlineMenuBook className="w-8 h-8 text-slate-300" />
      </LinkButton>
    </Navbar>
  );
};
