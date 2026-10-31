import "server-only";
import type { Evidence, SkillGroup } from "./types";

const resumeEvidence: Evidence = {
  verifiedOn: "2026-10-31",
  note: "Skills from the owner-supplied resume technical skills screenshot, grouped by area of work for the portfolio.",
  references: [
    "Owner-supplied resume technical skills screenshot (2026-10-31)",
  ],
};

export const skills = [
  {
    publication: "published",
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React"],
    evidence: resumeEvidence,
  },
  {
    publication: "published",
    title: "Backend & Data",
    skills: [
      "Node.js",
      "Express.js",
      "PHP",
      "CodeIgniter",
      "PostgreSQL",
      "MySQL",
      "Supabase",
      "Firebase",
      "REST APIs",
      "Database Administration",
    ],
    evidence: resumeEvidence,
  },
  {
    publication: "published",
    title: "Mobile",
    skills: ["React Native", "Kotlin", "Swift"],
    evidence: resumeEvidence,
  },
  {
    publication: "published",
    title: "Tools & Workflow",
    skills: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "Docker",
      "Composer",
      "Figma",
      "Software Testing",
      "Technical Documentation",
    ],
    evidence: resumeEvidence,
  },
  {
    publication: "published",
    title: "Additional Languages",
    skills: ["Python", "Java", "C++"],
    evidence: resumeEvidence,
  },
] satisfies SkillGroup[];
