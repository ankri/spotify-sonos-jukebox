import LRUCache from "lru-cache";

// @ts-ignore ttl is not part of @types/lru-cache yet
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/58853
export const imageCache = new LRUCache<string, string>({
  max: 200,
  // TODO find suitable max age
  ttl: 1000 * 60 * 60 * 24,
});
