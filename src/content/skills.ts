import "server-only";
import type { SkillGroup } from "./types";
import { verifiedOn } from "./verification";

export const skills = [
  {
    publication: "published",
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "PHP", "SQL"],
    evidence: {
      verifiedOn,
      note: "Supported by authored project source, migrations, and SolarSoil PR changes.",
      references: [
        "PRISM-GUARD source",
        "SIS TypeScript routes and SQL migrations",
        "SolarSoil PR #1",
      ],
    },
  },
  {
    publication: "published",
    title: "Web & mobile",
    skills: ["React", "React Native", "Expo", "Tailwind CSS"],
    evidence: {
      verifiedOn,
      note: "Manifests cross-checked with authored UI changes.",
      references: [
        "PRISM-GUARD web/mobile source and manifests",
        "SIS client source",
      ],
    },
  },
  {
    publication: "published",
    title: "Backend & data",
    skills: ["Node.js", "Express", "Supabase", "PostgreSQL", "CodeIgniter"],
    evidence: {
      verifiedOn,
      note: "Backend routes, database migrations, access filters, and manifests inspected.",
      references: [
        "SIS server routes and migrations",
        "PRISM-GUARD API source",
        "SolarSoil PR #1",
      ],
    },
  },
  {
    publication: "published",
    title: "Tools & workflow",
    skills: ["Git", "GitHub", "Pull requests", "Code review"],
    evidence: {
      verifiedOn,
      note: "Authored commits and merged external contribution.",
      references: ["Project commit histories", "SolarSoil PR #1"],
    },
  },
] satisfies SkillGroup[];
