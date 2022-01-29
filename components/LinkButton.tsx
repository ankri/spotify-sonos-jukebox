import * as React from "react";
import Link from "next/link";
import { ButtonSize, useButtonStyles } from "./Button";

export const LinkButton: React.FC<{
  size?: ButtonSize;
  href: string;
  className?: string;
}> = ({ href, children, className, size = "sm" }) => {
  const buttonStyles = useButtonStyles(size, className);

  return (
    <Link href={href} passHref>
      <a className={buttonStyles}>{children}</a>
    </Link>
  );
};
