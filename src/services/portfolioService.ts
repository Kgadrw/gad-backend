import { defaultContent } from "./defaultContent.js";
import { readContent } from "./contentStore.js";
import { normalizeContent } from "./normalizeContent.js";

export const portfolioService = {
  getContent: async () => normalizeContent(await readContent(defaultContent), defaultContent),
};

