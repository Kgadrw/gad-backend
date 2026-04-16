export type SocialLink = {
  id: string;
  platform: string;
  url: string;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  avatarUrl: string;
  coverUrl: string;
  links: {
    github: string;
    website?: string;
    email?: string;
  };
  socials: SocialLink[];
};

