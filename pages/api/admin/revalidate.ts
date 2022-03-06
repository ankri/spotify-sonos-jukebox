import { imageCache } from "@cache/cache";
import { NextApiHandler } from "next";

const availableRoutes = ["music", "stories", "audiobooks"];

const handler: NextApiHandler = async (req, res) => {
  const route = req.query.route as string;

  try {
    if (route && availableRoutes.includes(route)) {
      await res.unstable_revalidate(`/${route}`);
    } else {
      for (const route of availableRoutes) {
        await res.unstable_revalidate(`/${route}`);
      }
    }

    // we also clear the image cache so we always show the correct images
    imageCache.clear();

    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).send("Error validating");
  }
};

export default handler;
