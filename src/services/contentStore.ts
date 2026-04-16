import fs from "node:fs/promises";
import path from "node:path";
import type { PortfolioContent } from "../types/portfolioContent.js";
import * as mongoStore from "./mongoContentStore.js";

const dataDir = path.resolve(process.cwd(), "data-store");
const contentPath = path.join(dataDir, "content.json");

async function ensureDir() {
  await fs.mkdir(dataDir, { recursive: true });
}

async function writeAtomic(filePath: string, data: string) {
  const tmp = `${filePath}.tmp`;
  await fs.writeFile(tmp, data, "utf8");
  await fs.rename(tmp, filePath);
}

async function readLocalContent(fallback: PortfolioContent): Promise<PortfolioContent> {
  await ensureDir();
  try {
    const raw = await fs.readFile(contentPath, "utf8");
    return JSON.parse(raw) as PortfolioContent;
  } catch {
    await writeLocalContent(fallback);
    return fallback;
  }
}

async function writeLocalContent(content: PortfolioContent): Promise<void> {
  await ensureDir();
  await writeAtomic(contentPath, JSON.stringify(content, null, 2));
}

export async function readContent(fallback: PortfolioContent): Promise<PortfolioContent> {
  try {
    return await mongoStore.readContent(fallback);
  } catch (error) {
    // Keep the admin usable when MongoDB is temporarily unavailable.
    console.warn("[contentStore] Mongo read failed, using local file store instead.", error);
    return await readLocalContent(fallback);
  }
}

export async function writeContent(content: PortfolioContent): Promise<void> {
  try {
    await mongoStore.writeContent(content);
  } catch (error) {
    console.warn("[contentStore] Mongo write failed, using local file store instead.", error);
    await writeLocalContent(content);
  }
}

