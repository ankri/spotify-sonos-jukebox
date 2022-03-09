import { Config } from "@custom-types/Config";
import * as fs from "fs/promises";
import * as path from "path";

const PATH_TO_CONFIG = path.resolve("config", "config.json");

let configCache: Config | null = null;

export const getConfig = async (): Promise<Config> => {
  if (configCache !== null) {
    return configCache;
  } else {
    const buffer = await fs.readFile(PATH_TO_CONFIG);
    const config = JSON.parse(buffer.toString("utf-8")) as Config;
    configCache = config;
    return config;
  }
};

export const saveConfig = async (
  partialConfig: Partial<Config>
): Promise<void> => {
  const originalConfig = await getConfig();
  const mergedConfig = { ...originalConfig, ...partialConfig };
  configCache = mergedConfig;
  await fs.writeFile(
    PATH_TO_CONFIG,
    JSON.stringify(mergedConfig, null, 2),
    "utf-8"
  );
};
