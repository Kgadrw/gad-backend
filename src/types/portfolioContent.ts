import type { About } from "./about.js";
import type { Certification } from "./certification.js";
import type { ContactItem } from "./contact.js";
import type { Education } from "./education.js";
import type { Experience } from "./experience.js";
import type { Profile } from "./profile.js";
import type { Project } from "./project.js";
import type { Skill } from "./skill.js";

export type ActivityPost = {
  id: string;
  date: string;
  content: string;
  imageUrl?: string;
  imageUrls?: string[];
  imageAlt?: string;
};

export type Article = {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  imageUrl?: string;
  imageAlt?: string;
  link?: string;
};

export type SidebarBanner = {
  id: string;
  link?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type PortfolioContent = {
  profile: Profile;
  about: About;
  education: Education;
  experiences: Experience[];
  projects: Project[];
  articles: Article[];
  skills: Skill[];
  certifications: Certification[];
  contact: ContactItem[];
  sidebarBanners: SidebarBanner[];
  activityPosts: ActivityPost[];
};

