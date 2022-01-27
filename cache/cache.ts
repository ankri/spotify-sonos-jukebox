import LRUCache from "lru-cache";

export const imageCache = new LRUCache<string, string>({
  max: 200,
  // TODO find suitable max age
  maxAge: 1000 * 60 * 60 * 24,
});
