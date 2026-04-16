import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../middleware/requireAdmin.js";
import { defaultContent } from "../services/defaultContent.js";
import { uploadImageBuffer } from "../services/cloudinary.js";
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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype?.startsWith("image/")) return cb(null, true);
    return cb(new Error("Only image uploads are allowed"));
  },
});

adminRouter.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "missing_file" });

  const result = await uploadImageBuffer(file.buffer);
  return res.json({ url: result.secure_url });
});

