import { Collection } from "@custom-types/Collection";
import { prisma } from "@database/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body) as Collection;
    await prisma.collection.update({
      where: {
        mediaUri: data.mediaUri,
      },
      data,
    });
    res.unstable_revalidate(`/${data.type}`);
    res.status(200).send("Updated");
  } else {
    return res.status(405).send("Unsupported method");
  }
};

export default handler;
