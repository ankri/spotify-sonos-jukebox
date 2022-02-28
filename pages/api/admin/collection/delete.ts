import { prisma } from "@database/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body) as { mediaUri: string };
    const deletedCollection = await prisma.collection.delete({
      where: {
        mediaUri: data.mediaUri,
      },
    });
    res.unstable_revalidate(`/${deletedCollection.type}`);
    res
      .status(200)
      .send(`Successfully deleted collection with mediaUri: ${data.mediaUri}`);
  } else {
    return res.status(405).send("Unsupported method");
  }
};

export default handler;
