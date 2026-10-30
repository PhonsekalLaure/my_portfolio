import "server-only";
import { profile } from "./profile";
import { projects } from "./projects";
import { contributions } from "./contributions";
import { skills } from "./skills";
import { certifications } from "./certifications";
import type { Certification, PortfolioLink } from "./types";

export type {
  Publication,
  PortfolioLink,
  Project,
  ProjectActivity,
  Contribution,
  Certification,
  SkillGroup,
} from "./types";

// Compatibility entry point: edit content in the individual section files.
// Keep draft records and evidence notes within Server Components.
export const portfolio = {
  profile,
  projects,
  contributions,
  skills,
  certifications,
};

export function getPublishedProjects() {
  return portfolio.projects.filter((item) => item.publication === "published");
}
export function getPublishedProject(slug: string) {
  return getPublishedProjects().find((item) => item.slug === slug);
}
export function getPublishedContributions() {
  return portfolio.contributions.filter(
    (item) => item.publication === "published",
  );
}
export function getPublishedSkills() {
  return portfolio.skills.filter((item) => item.publication === "published");
}
export function getPublishedCertifications(): Certification[] {
  return portfolio.certifications.filter(
    (item: Certification) => item.publication === "published",
  );
}
export function getSocialLinks(): PortfolioLink[] {
  return [
    { label: "GitHub", href: portfolio.profile.github },
    ...(portfolio.profile.linkedin
      ? [{ label: "LinkedIn", href: portfolio.profile.linkedin }]
      : []),
    ...(portfolio.profile.email
      ? [{ label: "Email", href: `mailto:${portfolio.profile.email}` }]
      : []),
  ];
}
export function getNavigation() {
  return [
    ...(getPublishedProjects().length
      ? [{ label: "Projects", href: "/#projects" }]
      : []),
    ...(getPublishedContributions().length
      ? [{ label: "Contributions", href: "/#contributions" }]
      : []),
    ...(getPublishedSkills().length
      ? [{ label: "Skills", href: "/#skills" }]
      : []),
    ...(getPublishedCertifications().length
      ? [{ label: "Certifications", href: "/#certifications" }]
      : []),
    ...(portfolio.profile.about.length
      ? [{ label: "About", href: "/#about" }]
      : []),
    ...(getSocialLinks().length
      ? [{ label: "Contact", href: "/#contact" }]
      : []),
  ];
}
