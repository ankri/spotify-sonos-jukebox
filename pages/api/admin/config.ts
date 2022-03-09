import { getConfig, saveConfig } from "@config/config";
import { Config } from "@custom-types/Config";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    // we do not want to expose the spotify credentials
    const { spotify, ...config } = await getConfig();

    res.json(config);
  } else if (req.method === "PUT") {
    const config = JSON.parse(req.body) as Partial<Config>;
    await saveConfig(config);

    res.status(200).send("Successfully saved config");
  } else {
    res.status(405).send("Method not supported");
  }
};

export default handler;
