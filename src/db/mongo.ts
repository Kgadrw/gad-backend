import { MongoClient } from "mongodb";
import { env } from "../config/env.js";

let client: MongoClient | null = null;

export async function getMongoClient() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is not set");
  }
  if (client) return client;
  client = new MongoClient(env.mongoUri);
  await client.connect();
  return client;
}

export async function getDb() {
  const c = await getMongoClient();
  return c.db(env.mongoDb);
}

