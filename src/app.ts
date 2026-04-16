import express from "express";
import cors from "cors";
import path from "node:path";
import cookieParser from "cookie-parser";
import multer from "multer";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/api.js";
import { authRouter } from "./routes/auth.js";
import { adminRouter } from "./routes/admin.js";

export function createApp() {
  const app = express();
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: (_origin, callback) => callback(null, true),
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use("/uploads", express.static(path.resolve(process.cwd(), env.uploadDir)));

  app.get("/health", (_req, res) => res.json({ ok: true }));
  app.use("/api/auth", authRouter);
  app.use("/api/admin", adminRouter);
  app.use("/api", apiRouter);

  app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        error: "file_too_large",
        message: "Image is too large. Maximum upload size is 5 MB.",
      });
    }

    if (err instanceof Error) {
      return res.status(500).json({
        error: "internal_error",
        message: err.message || "Unexpected server error.",
      });
    }

    return res.status(500).json({
      error: "internal_error",
      message: "Unexpected server error.",
    });
  });

  return app;
}

