import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const url = req.query.url as string;

  try {
    const response = await fetch(`${url}/zones`);
    if (response.ok && response.status === 200) {
      const json = (await response.json()) as {
        members: { roomName: string }[];
      }[];

      res
        .status(200)
        .json(
          json.flatMap((zone) => zone.members.map((member) => member.roomName))
        );
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    res.status(200).send([]);
  }
};

export default handler;
