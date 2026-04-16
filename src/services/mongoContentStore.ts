import type { Collection } from "mongodb";
import { getDb } from "../db/mongo.js";
import type { PortfolioContent } from "../types/portfolioContent.js";

type ContentDoc = {
  _id: "portfolio";
  content: PortfolioContent;
  updatedAt: Date;
};

async function getCollection(): Promise<Collection<ContentDoc>> {
  const db = await getDb();
  return db.collection<ContentDoc>("portfolio_content");
}

export async function readContent(fallback: PortfolioContent): Promise<PortfolioContent> {
  const col = await getCollection();
  const doc = await col.findOne({ _id: "portfolio" });
  if (doc?.content) return doc.content;

  await col.updateOne(
    { _id: "portfolio" },
    { $set: { content: fallback, updatedAt: new Date() } },
    { upsert: true },
  );
  return fallback;
}

export async function writeContent(content: PortfolioContent): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { _id: "portfolio" },
    { $set: { content, updatedAt: new Date() } },
    { upsert: true },
  );
}

