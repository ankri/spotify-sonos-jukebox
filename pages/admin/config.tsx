import { AdminLayout } from "@layouts/AdminLayout";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import { getConfig } from "@config/config";
import { Config } from "@custom-types/Config";
import { Input } from "@components/admin/Input";
import { TestConnection } from "@components/admin/TestConnection";
import {
  MdLanguage,
  MdLink,
  MdSave,
  MdSignalCellular1Bar,
  MdSignalCellular2Bar,
  MdSignalCellular3Bar,
  MdSignalCellular4Bar,
  MdVolumeUp,
} from "react-icons/md";
import { useButtonStyles } from "@components/Button";
import { SelectRoom } from "@components/admin/SelectRoom";
import { TestSpotifyConnection } from "@components/admin/TestSpotifyConnection";

const AdminPage: NextPage<{ config: Config }> = ({ config: initialConfig }) => {
  const buttonStyles = useButtonStyles("sm", "w-24 space-x-2");
  const [config, setConfig] = React.useState<Config>(initialConfig);
  const [locale, setLocale] = React.useState(initialConfig.tts.locale);
  React.useEffect(() => {
    setLocale(navigator.language.toLocaleLowerCase());
  }, []);

  return (
    <AdminLayout>
      <form
        className="flex flex-col space-y-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch("/api/admin/config", {
            method: "PUT",
            body: JSON.stringify(config),
          });
          if (response.ok && response.status === 200) {
            // TODO show success message
          } else {
            // TODO show error message
          }
        }}
      >
        <TestSpotifyConnection />
        <div className="flex flex-col space-y-2">
          <Input
            name="api.url"
            label={
              <>
                <MdLink />
                <span>Sonos HTTP API URL</span>
              </>
            }
            type="url"
            value={config.api.url}
            onChange={(event) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                api: {
                  ...oldConfig.api,
                  url: event.target.value,
                },
              }));
            }}
            placeholder="http://localhost:5005"
            required
          />
          <TestConnection url={config.api.url} />
        </div>
        <div className="flex flex-col space-y-2">
          <SelectRoom
            url={config.api.url}
            selectedRoom={config.api.room}
            onSelectRoom={(selectedRoom) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                api: {
                  ...oldConfig.api,
                  room: selectedRoom,
                },
              }));
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Input
            name="tts.locale"
            label={
              <>
                <MdLanguage /> <span>Text To Speech locale</span>
              </>
            }
            type="text"
            pattern="[a-z][a-z]-[a-z][a-z]"
            value={config.tts.locale}
            onChange={(event) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                tts: {
                  ...oldConfig.tts,
                  locale: event.target.value,
                },
              }));
            }}
            placeholder="e.g. en-en"
            required
          />
          <div>
            The locale, all lowercase. Recommended locale <em>{locale}</em>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-8">
          <h1 className="flex flex-row space-x-2 items-center text-xl">
            <MdVolumeUp /> <span>Volume settings</span>
          </h1>
          <p className="text-slate-200">
            Below you can set the volume presets for the 5 volume buttons. Tips:
            If the speaker is in reach of your child you can set the max volume
            for your speaker in the app or disable the physical controls
            completely.
          </p>
          <Input
            name="volumes.preset-0"
            label={
              <>
                <MdSignalCellular4Bar className="opacity-50" />{" "}
                <span>Preset 1</span>
              </>
            }
            type="number"
            min={0}
            max={100}
            step={5}
            value={config.volumes["preset-0"]}
            onChange={(event) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                volumes: {
                  ...oldConfig.volumes,
                  "preset-0": Number(event.target.value),
                },
              }));
            }}
            placeholder="Recommended: 10"
            required
          />
          <Input
            name="volumes.preset-1"
            label={
              <>
                <MdSignalCellular1Bar /> <span>Preset 2</span>
              </>
            }
            type="number"
            min={0}
            max={100}
            step={5}
            value={config.volumes["preset-1"]}
            onChange={(event) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                volumes: {
                  ...oldConfig.volumes,
                  "preset-1": Number(event.target.value),
                },
              }));
            }}
            placeholder="Recommended: 15"
            required
          />
          <Input
            name="volumes.preset-2"
            label={
              <>
                <MdSignalCellular2Bar /> <span>Preset 3</span>
              </>
            }
            type="number"
            min={0}
            max={100}
            step={5}
            value={config.volumes["preset-2"]}
            onChange={(event) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                volumes: {
                  ...oldConfig.volumes,
                  "preset-2": Number(event.target.value),
                },
              }));
            }}
            placeholder="Recommended: 20"
            required
          />
          <Input
            name="volumes.preset-3"
            label={
              <>
                <MdSignalCellular3Bar /> <span>Preset 4</span>
              </>
            }
            type="number"
            min={0}
            max={100}
            step={5}
            value={config.volumes["preset-3"]}
            onChange={(event) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                volumes: {
                  ...oldConfig.volumes,
                  "preset-3": Number(event.target.value),
                },
              }));
            }}
            placeholder="Recommended: 25"
            required
          />
          <Input
            name="volumes.preset-4"
            label={
              <>
                <MdSignalCellular4Bar /> <span>Preset 5</span>
              </>
            }
            type="number"
            min={0}
            max={100}
            step={5}
            value={config.volumes["preset-4"]}
            onChange={(event) => {
              setConfig((oldConfig) => ({
                ...oldConfig,
                volumes: {
                  ...oldConfig.volumes,
                  "preset-4": Number(event.target.value),
                },
              }));
            }}
            placeholder="Recommended: 30"
            required
          />
        </div>

        <div className="pt-8">
          <button type="submit" className={buttonStyles}>
            <MdSave className="w-4 h-4" /> <span>Save</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({}) => {
  const { spotify, ...config } = await getConfig();

  return {
    props: {
      config,
    },
  };
};

export default AdminPage;
