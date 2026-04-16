import { Router } from "express";
import { env } from "../config/env.js";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  const password = String((req.body as { password?: unknown })?.password ?? "");

  if (!env.adminPassword) {
    return res.status(500).json({ error: "server_not_configured" });
  }

  if (password !== env.adminPassword) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  res.cookie("admin_session", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
  return res.json({ ok: true });
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie("admin_session", { path: "/" });
  res.json({ ok: true });
});

authRouter.get("/me", (req, res) => {
  const isAdmin = req.cookies?.admin_session === "1";
  res.json({ isAdmin });
});

