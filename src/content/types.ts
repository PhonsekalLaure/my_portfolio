export type Publication = "draft" | "published";

export type PortfolioLink = { label: string; href: string };

export type Evidence = {
  note: string;
  references: string[];
  verifiedOn: string;
};

type Publishable = { publication: Publication; evidence: Evidence };

export type Profile = {
  name: string;
  shortName: string;
  initials: string;
  photo?: string;
  headline: string;
  heroTitle: [string, string];
  introduction: string;
  description: string;
  github: string;
  linkedin?: string;
  email?: string;
  secondaryEmail?: string;
  resume?: string;
  location: { publication: Publication; value: string };
  education: {
    publication: Publication;
    school: string;
    program: string;
    graduation: string;
  };
  about: string[];
  principles: { number: string; title: string; description: string }[];
};

export type ProjectActivity = {
  title: string;
  summary: string;
  repository: string;
  date: string;
  kind: "Commit" | "Merged PR";
  reference: string;
  href: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title?: string;
  caption?: string;
};

export type Project = Publishable & {
  slug: string;
  title: string;
  category: string;
  context: string;
  status: string;
  summary: string;
  role: string;
  technologies: string[];
  overview: string;
  contributions: string[];
  features: string[];
  challenge: { title: string; description: string };
  links: PortfolioLink[];
  visual: "prism" | "sis" | "itso";
  activity: ProjectActivity[];
  diagram: { label: string; title: string; nodes: string[]; caption: string };
  screenshots: ProjectScreenshot[];
  preview?: { title: string; url: string; description: string };
};

export type Certification = Publishable & {
  name: string;
  issuer?: string;
  year?: string;
  issuedOn?: string;
  badgeImage?: string;
  verificationUrl?: string;
  kind?: "Certification" | "Course completion";
  expiresOn?: string;
};

export type SkillGroup = Publishable & { title: string; skills: string[] };
