export type ProjectCategory = "Individual" | "Team" | "Open Source" | "Client";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  links: ProjectLink[];
  tech: string[];
  featured?: boolean;
};

