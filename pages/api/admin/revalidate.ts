import { imageCache } from "@cache/cache";
import { prisma } from "@database/prisma";
import { NextApiHandler } from "next";

const availableRoutes = ["music", "stories", "audiobooks"];

const handler: NextApiHandler = async (req, res) => {
  try {
    for (const route of availableRoutes) {
      await res.unstable_revalidate(`/${route}`);
    }

    const storyArtists = await prisma.artist.findMany({
      where: {
        type: "story",
      },
    });

    for (const artist of storyArtists) {
      await res.unstable_revalidate(`/stories/artist/${artist.mediaUri}`);
    }

    // we also clear the image cache so we always show the correct images
    imageCache.clear();

    return res.json({ revalidated: true });
  } catch (error) {
    return res.status(500).send("Error validating");
  }
};

export default handler;
