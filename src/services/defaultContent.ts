import type { PortfolioContent } from "../types/portfolioContent.js";
import { articles } from "../data/articles.js";
import { about } from "../data/about.js";
import { certifications } from "../data/certifications.js";
import { contactInfo } from "../data/contact.js";
import { education } from "../data/education.js";
import { experiences } from "../data/experiences.js";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { skills } from "../data/skills.js";

export const defaultContent: PortfolioContent = {
  profile,
  about,
  education,
  experiences,
  projects,
  articles,
  skills,
  certifications,
  contact: contactInfo,
  sidebarBanners: [
    {
      id: "banner-1",
      link: "mailto:kalisagad05@gmail.com",
    },
  ],
  activityPosts: [
    {
      id: "1",
      date: "Apr 2026",
      content:
        "Starting a new activity feed here. I’ll share progress updates, thoughts, and screenshots of what I’m building.",
    },
  ],
};

