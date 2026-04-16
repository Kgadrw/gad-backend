import type { PortfolioContent } from "../types/portfolioContent.js";

/**
 * Backward-compatible normalization for older saved documents.
 * Only fills missing top-level fields; does not attempt deep merges.
 */
export function normalizeContent(
  raw: Partial<PortfolioContent>,
  fallback: PortfolioContent,
): PortfolioContent {
  return {
    profile: {
      ...(raw.profile ?? fallback.profile),
      links: {
        ...fallback.profile.links,
        ...(raw.profile?.links ?? {}),
      },
      socials: raw.profile?.socials ?? fallback.profile.socials,
    },
    about: raw.about ?? fallback.about,
    education: raw.education ?? fallback.education,
    experiences: raw.experiences ?? fallback.experiences,
    projects: raw.projects ?? fallback.projects,
    articles: raw.articles ?? fallback.articles,
    skills: raw.skills ?? fallback.skills,
    certifications: raw.certifications ?? fallback.certifications,
    contact: raw.contact ?? fallback.contact,
    sidebarBanners: raw.sidebarBanners ?? fallback.sidebarBanners,
    activityPosts: (raw.activityPosts ?? fallback.activityPosts).map((post) => ({
      ...post,
      imageUrls: post.imageUrls ?? (post.imageUrl ? [post.imageUrl] : []),
    })),
  };
}

