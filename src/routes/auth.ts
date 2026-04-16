import { Router } from "express";
import { env } from "../config/env.js";

export const authRouter = Router();

function cookieOptions(req: Parameters<typeof authRouter.post>[1] extends never ? never : any) {
  const isSecure = req.secure || req.get("x-forwarded-proto") === "https";
  return {
    httpOnly: true,
    sameSite: isSecure ? "none" : "lax",
    secure: isSecure,
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  } as const;
}

authRouter.post("/login", (req, res) => {
  const password = String((req.body as { password?: unknown })?.password ?? "");

  if (!env.adminPassword) {
    return res.status(500).json({ error: "server_not_configured" });
  }

  if (password !== env.adminPassword) {
    return res.status(401).json({ error: "invalid_credentials" });
  }

  res.cookie("admin_session", "1", cookieOptions(req));
  return res.json({ ok: true });
});

authRouter.post("/logout", (req, res) => {
  const { maxAge: _maxAge, ...clearOptions } = cookieOptions(req);
  res.clearCookie("admin_session", clearOptions);
  res.json({ ok: true });
});

authRouter.get("/me", (req, res) => {
  const isAdmin = req.cookies?.admin_session === "1";
  res.json({ isAdmin });
});

