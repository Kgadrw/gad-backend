import type { Project } from "../types/project.js";

export const projects: Project[] = [
  {
    id: "p1",
    title: "Social Coder Showcase",
    category: "Individual",
    summary: "A LinkedIn-style portfolio with an admin studio for content editing.",
    description:
      "Built a social profile layout with a compact activity feed, skills, certifications, and a full admin dashboard to manage content, media uploads, and backups.",
    tech: ["React", "TypeScript", "Tailwind", "Node.js", "MongoDB"],
    links: [
      { label: "GitHub", url: "https://github.com/" },
    ],
    featured: true,
  },
];

