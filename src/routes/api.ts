import { Router } from "express";
import { portfolioController } from "../controllers/portfolioController.js";

export const apiRouter = Router();

apiRouter.get("/content", portfolioController.content);
apiRouter.get("/profile", portfolioController.profile);
apiRouter.get("/about", portfolioController.about);
apiRouter.get("/education", portfolioController.education);
apiRouter.get("/experiences", portfolioController.experiences);
apiRouter.get("/projects", portfolioController.projects);
apiRouter.get("/skills", portfolioController.skills);
apiRouter.get("/certifications", portfolioController.certifications);
apiRouter.get("/contact", portfolioController.contact);

