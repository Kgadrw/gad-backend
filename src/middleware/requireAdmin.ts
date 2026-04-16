import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const isAdmin = req.cookies?.admin_session === "1";
  if (!isAdmin) return res.status(401).json({ error: "not_admin" });
  return next();
}

