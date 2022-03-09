import * as fs from "fs/promises";
import * as path from "path";
import config from "./config/config.example.json";
import artists from "./database/database/artists.example.json";
import audiobooks from "./database/database/audiobooks.example.json";
import music from "./database/database/music.example.json";
import stories from "./database/database/stories.example.json";
import tracks from "./database/database/tracks.example.json";

const copyFile = async (
  fileName: string,
  content: any,
  filePath: string = path.join(__dirname, "database", "database")
) => {
  await fs.writeFile(
    path.resolve(filePath, fileName),
    JSON.stringify(content, null, 2)
  );
};

async function main() {
  console.log("creating ./config/config.json");
  copyFile("config.json", config, path.join(__dirname, "config"));
}

main()
  .catch((error) => {})
  .finally(() => {
    console.log("Finished installing.");
  });
