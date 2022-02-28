import { Collection } from "@custom-types/Collection";
import { prisma } from "@database/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body) as Collection[];
    for (const collection of data) {
      await prisma.collection.update({
        where: {
          mediaUri: collection.mediaUri,
        },
        data: {
          index: collection.index,
        },
      });
    }

    res.unstable_revalidate(`/${data[0].type}`);
    res.status(200).send("Updated");
  } else {
    return res.status(405).send("Unsupported method");
  }
};

export default handler;
