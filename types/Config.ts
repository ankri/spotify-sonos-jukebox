export interface Config {
  api: {
    url: string;
    room: string;
  };
  ui: {
    defaultPlayer: "player" | "covers";
  };
  spotify: {
    clientId: string;
    clientSecret: string;
  };
  tts: {
    locale: string;
  };
  volumes: {
    "preset-0": number;
    "preset-1": number;
    "preset-2": number;
    "preset-3": number;
    "preset-4": number;
  };
}
