import NextLink from "next/link";
import { Button, useButtonStyles } from "@components/Button";
import { RootLayout } from "@layouts/RootLayout";
import type { NextPage } from "next";
import { MdHome, MdRefresh } from "react-icons/md";
import { TextToSpeechHeading } from "@components/TextToSpeechHeading";

const ErrorPage: NextPage = () => {
  const buttonStyles = useButtonStyles("lg");

  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center h-screen space-y-16">
        <TextToSpeechHeading
          text="Leider ist ein Fehler passiert"
          className="text-3xl"
        />
        <div className="flex flex-row space-x-32">
          <Button
            size="lg"
            onClick={() => {
              location.reload();
            }}
          >
            <MdRefresh className="h-36 w-36" />
          </Button>

          <NextLink passHref href="/">
            <a className={buttonStyles}>
              <MdHome className="h-36 w-36" />
            </a>
          </NextLink>
        </div>
      </div>
    </RootLayout>
  );
};

export default ErrorPage;
