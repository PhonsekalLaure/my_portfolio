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
  {
    publication: "published",
    project: "AD-SolarSoil",
    owner: "domadla",
    title: "Admin actions & account updates",
    summary:
      "Contributed plant-editing actions, username uniqueness checks, password-change handling, and profile feedback alongside other developers.",
    technologies: ["PHP", "JavaScript"],
    status: "Merged PRs #67 & #72",
    links: [
      {
        label: "Admin actions PR #67",
        href: "https://github.com/domadla/AD-SolarSoil/pull/67",
      },
      {
        label: "Account updates PR #72",
        href: "https://github.com/domadla/AD-SolarSoil/pull/72",
      },
      { label: "Repository", href: "https://github.com/domadla/AD-SolarSoil" },
    ],
    evidence: {
      verifiedOn: "2026-10-30",
      note: "Both public PRs are merged and authored by PhonsekalLaure. Reviewed file diffs and individual commit authors. These PRs contain work by other contributors, so descriptions are limited to PhonsekalLaure's plant actions, username validation, password changes, and profile feedback. This is a different repository from Marlo522/solarsoil.",
      references: [
        "https://github.com/domadla/AD-SolarSoil/pull/67",
        "https://github.com/domadla/AD-SolarSoil/pull/72",
      ],
    },
  },
] satisfies Contribution[];
