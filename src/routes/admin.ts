import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs/promises";
import { env } from "../config/env.js";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { defaultContent } from "../services/defaultContent.js";
import { normalizeContent } from "../services/normalizeContent.js";
import { readContent, writeContent } from "../services/contentStore.js";
import type { PortfolioContent } from "../types/portfolioContent.js";

export const adminRouter = Router();

adminRouter.use(requireAdmin);

adminRouter.get("/content", async (_req, res) => {
  res.json(normalizeContent(await readContent(defaultContent), defaultContent));
});

adminRouter.put("/content", async (req, res) => {
  const body = req.body as PortfolioContent;
  await writeContent(body);
  res.json({ ok: true });
});

async function ensureUploadDir() {
  const uploadPath = path.resolve(process.cwd(), env.uploadDir);
  await fs.mkdir(uploadPath, { recursive: true });
  return uploadPath;
}

const upload = multer({
  storage: multer.diskStorage({
    destination: async (_req, _file, cb) => {
      try {
        cb(null, await ensureUploadDir());
      } catch (e) {
        cb(e as Error, "");
      }
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || "");
      const safeExt = ext && ext.length <= 8 ? ext : "";
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype?.startsWith("image/")) return cb(null, true);
    return cb(new Error("Only image uploads are allowed"));
  },
});

adminRouter.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "missing_file" });
  const url = `/uploads/${file.filename}`;
  return res.json({ url });
});

