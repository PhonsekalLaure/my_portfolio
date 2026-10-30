import "server-only";
import type { Contribution } from "./types";

export const contributions = [
  {
    publication: "published",
    project: "SolarSoil",
    owner: "Marlo522",
    title: "Authentication & guest access",
    summary:
      "Contributed role-aware route filters, guest redirects, and unauthorized-access handling to another developer’s CodeIgniter application.",
    technologies: ["PHP", "CodeIgniter"],
    status: "Merged PR #1",
    links: [
      {
        label: "View pull request",
        href: "https://github.com/Marlo522/solarsoil/pull/1",
      },
      { label: "Repository", href: "https://github.com/Marlo522/solarsoil" },
    ],
    evidence: {
      verifiedOn: "2026-10-30",
      note: "GitHub API confirms closed, merged PR authored by PhonsekalLaure. Reviewed route, auth filter, guest filter, controller, and unauthorized page diffs, and the current public auth/guest filter source. Do not attribute the entire application to Ronn.",
      references: [
        "https://github.com/Marlo522/solarsoil/pull/1",
        "Merge commit: af885948b7acefecf74714c207685b4fc7a6449f",
      ],
    },
  },
] satisfies Contribution[];
