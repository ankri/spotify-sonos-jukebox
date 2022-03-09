import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const url = req.query.url as string;

  const response = await fetch(`${url}/zones`);
  if (response.ok && response.status === 200) {
    res.status(200).send("Ok");
  } else {
    res.status(400).send("Unreachable");
  }
};

export default handler;
