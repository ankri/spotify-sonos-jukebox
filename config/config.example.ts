import { Config } from "@custom-types/Config";

export const config: Config = {
  api: {
    url: "http://localhost:5005",
    room: "Living Room",
  },
  ui: {
    defaultPlayer: "player", // or queue
  },
  spotify: {
    // create your spotify developer account here: https://developer.spotify.com/dashboard/applications
    clientId: "",
    clientSecret: "",
  },
  tts: {
    // your locale for the text to speech engine e.g. 'de-de' or 'en-us' or 'fr-fr'
    locale: "de-de",
  },
  volumes: {
    // numbers ranging from 0-100 - think twice about choosing numbers > 50
    "preset-0": 10,
    "preset-1": 15,
    "preset-2": 20,
    "preset-3": 25,
    "preset-4": 30,
  },
};
