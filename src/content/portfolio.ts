import "server-only";
import { profile } from "./profile";
import { projects } from "./projects";
import { skills } from "./skills";
import { certifications } from "./certifications";
import type { Certification, PortfolioLink } from "./types";

export type {
  PortfolioLink,
  Project,
  Certification,
  SkillGroup,
} from "./types";

// Assemble content on the server; edit records in the individual section files.
export const portfolio = {
  profile,
  projects,
  skills,
  certifications,
};

export function getPublishedProjects() {
  return portfolio.projects.filter((item) => item.publication === "published");
}
export function getPublishedProject(slug: string) {
  return portfolio.projects.find(
    (item) => item.publication === "published" && item.slug === slug,
  );
}
export function getPublishedSkills() {
  return portfolio.skills.filter((item) => item.publication === "published");
}
export function getPublishedCertifications(): Certification[] {
  return portfolio.certifications
    .filter((item) => item.publication === "published")
    .sort((a, b) =>
      (b.issuedOn ?? b.year ?? "").localeCompare(a.issuedOn ?? a.year ?? ""),
    );
}
export function getContactEmails() {
  return [
    ...(portfolio.profile.email
      ? [{ label: "Personal email", address: portfolio.profile.email }]
      : []),
    ...(portfolio.profile.secondaryEmail
      ? [
          {
            label: "Academic email",
            address: portfolio.profile.secondaryEmail,
          },
        ]
      : []),
  ];
}
export function getSocialLinks(): PortfolioLink[] {
  return [
    ...(portfolio.profile.github
      ? [{ label: "GitHub", href: portfolio.profile.github }]
      : []),
    ...(portfolio.profile.linkedin
      ? [{ label: "LinkedIn", href: portfolio.profile.linkedin }]
      : []),
  ];
}
export function getNavigation() {
  return [
    ...(getPublishedProjects().length
      ? [{ label: "Projects", href: "/#projects" }]
      : []),
    ...(getPublishedSkills().length
      ? [{ label: "Skills", href: "/#skills" }]
      : []),
    ...(portfolio.certifications.some(
      (item) => item.publication === "published",
    )
      ? [{ label: "Certifications", href: "/#certifications" }]
      : []),
    ...(portfolio.profile.about.length
      ? [{ label: "About", href: "/#about" }]
      : []),
    ...(getContactEmails().length || getSocialLinks().length
      ? [{ label: "Contact", href: "/#contact" }]
      : []),
  ];
}
