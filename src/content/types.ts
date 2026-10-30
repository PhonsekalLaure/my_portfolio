export type Publication = "draft" | "published";

export type PortfolioLink = { label: string; href: string };

export type Evidence = {
  note: string;
  references: string[];
  verifiedOn: string;
};

type Publishable = { publication: Publication; evidence: Evidence };

export type ProjectActivity = {
  title: string;
  summary: string;
  repository: string;
  date: string;
  kind: "Commit" | "Merged PR";
  reference: string;
  href: string;
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
  screenshots: { src: string; alt: string; width: number; height: number }[];
};

export type Contribution = Publishable & {
  title: string;
  project: string;
  owner: string;
  summary: string;
  technologies: string[];
  status: string;
  links: PortfolioLink[];
};

export type Certification = Publishable & {
  name: string;
  issuer?: string;
  year?: string;
  verificationUrl?: string;
};

export type SkillGroup = Publishable & { title: string; skills: string[] };
