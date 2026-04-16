import type { Request, Response } from "express";
import { portfolioService } from "../services/portfolioService.js";

export const portfolioController = {
  content: async (_req: Request, res: Response) =>
    res.json(await portfolioService.getContent()),
  profile: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).profile),
  about: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).about),
  education: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).education),
  experiences: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).experiences),
  skills: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).skills),
  certifications: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).certifications),
  contact: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).contact),
  projects: async (_req: Request, res: Response) =>
    res.json((await portfolioService.getContent()).projects),
};

