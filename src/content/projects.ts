import "server-only";
import type { Project } from "./types";
import { profile } from "./profile";
import { unverified } from "./verification";
import { projectActivity } from "./project-activity";
import { prismGuardScreenshots } from "./project-screenshots";

const github = profile.github;

export const projects = [
  {
    publication: "published",
    slug: "prism-guard",
    title: "PRISM-GUARD",
    category: "Web & mobile · Team capstone",
    context: "Collaborative academic capstone",
    status: "Completed",
    summary:
      "Connecting agency administration, client operations, and guard-facing workflows across web and mobile.",
    role: "Project manager, database administrator, and lead developer / backend developer.",
    technologies: ["React", "React Native", "Expo", "Express", "Supabase"],
    overview:
      "PRISM-GUARD is a completed collaborative academic capstone for security-agency operations. The project connects an administrative web application, client-facing workflows, and a mobile experience for guards. I served as project manager, database administrator, and lead developer with a focus on backend development.",
    contributions: [
      "Contributed HRIS payroll tables, filters, breakdown views, and export helpers through merged PR #76.",
      "Built guard-facing earnings screens and connected service and formatting helpers through merged mobile PR #27.",
      "Added authorized representative and business information fields to client management forms and details.",
      "Enforced deployment permissions across client and employee setup workflows.",
      "Added selfie evidence to mobile attendance contests and its corresponding HRIS review view.",
      "Contributed guard document uploads and document audit details in the mobile profile.",
    ],
    features: [
      "HRIS payroll review and breakdown interfaces",
      "Guard-facing mobile earnings workflows",
      "Client and employee management workflows",
      "Permission-aware guard deployment",
      "Mobile attendance contest evidence",
      "Guard profile document submission",
    ],
    challenge: {
      title: "Keeping connected workflows consistent",
      description:
        "Attendance evidence needs to make sense on both sides of the workflow: the guard submitting it on mobile and the administrator reviewing it on the web. My changes connect those submission and review surfaces while preserving their different responsibilities.",
    },
    links: [
      {
        label: "Web app (login required)",
        href: "https://prism-guard.vercel.app/",
      },
      { label: "Promotional site", href: "https://psiai.vercel.app/" },
      { label: "Web repository", href: `${github}/prism-guard-web` },
      { label: "Mobile repository", href: `${github}/prism-guard-mobile` },
      { label: "Promotional repository", href: `${github}/prism-guard-promo` },
      {
        label: "My web commits",
        href: `${github}/prism-guard-web/commits/master/?author=PhonsekalLaure`,
      },
      {
        label: "My mobile commits",
        href: `${github}/prism-guard-mobile/commits/master/?author=PhonsekalLaure`,
      },
    ],
    visual: "prism",
    activity: projectActivity.prismGuard,
    diagram: {
      label: "Connected workflows",
      title: "One workflow. Both sides.",
      nodes: ["Guard mobile app", "Application API", "Agency web app"],
      caption: "A simplified workflow diagram, not an application screenshot.",
    },
    screenshots: prismGuardScreenshots,
    preview: {
      title: "Promotional website",
      url: "https://psiai.vercel.app/",
      description:
        "Explore the public promotional website. The PRISM-GUARD operations app is separate and requires an account.",
    },
    evidence: {
      verifiedOn: "2026-10-30",
      note: "The owner confirmed project completion and their roles as project manager, database administrator, and lead developer / backend developer on 2026-10-30. Reviewed public repository manifests, live authored commit diffs, and merged web PR #76, mobile PR #27, and promotional PR #7 using authenticated GitHub CLI. Public repository homepage URLs resolve to the listed web and promotional pages; this is URL availability, not full end-to-end deployment verification. Team ownership remains explicit.",
      references: [
        "prism-guard-web: 1bb8380, 52b89aa, b173324",
        "prism-guard-mobile: 305c07e, 2c0590b, fce11fc",
        "Web, mobile, and API package manifests",
        "prism-guard-web PR #76; prism-guard-mobile PR #27; prism-guard-promo PR #7",
      ],
    },
  },
  {
    publication: "published",
    slug: "frighton-university-sis",
    title: "Frighton University SIS",
    category: "Web application · Academic project",
    context: "Collaborative academic project",
    status: "In development",
    summary:
      "Student information workflows with a clear boundary between student records and administrative account management.",
    role: "Contributed student portal APIs, admin account workflows, and database migrations.",
    technologies: ["TypeScript", "React", "Express", "Supabase", "PostgreSQL"],
    overview:
      "An in-progress student information system with implemented student portal and administrative account workflows. The student experience includes routes for grades, schedules, holds, and cashier-record billing. Administrative account lifecycle actions are separated from student-facing records.",
    contributions: [
      "Implemented backend services, authenticated routes, and database migrations for the admin console.",
      "Contributed student portal pages, architecture documentation, and the holds service routes.",
      "Added student account creation, access changes, password recovery, and admin audit-log workflows.",
      "Added typed seed data and a database seeding script for development setup.",
    ],
    features: [
      "Authenticated student grades and schedule routes",
      "Read-only cashier billing statements",
      "Separate administrative account lifecycle routes",
      "Administrative audit-log access",
    ],
    challenge: {
      title: "Separating access from academic records",
      description:
        "Administrative account changes and student information have different responsibilities. Separate role checks and routes support auditable account lifecycle changes, while the student billing surface displays cashier-posted statements and receipts.",
    },
    links: [
      { label: "Repository", href: `${github}/frighton-university-sis` },
      {
        label: "My commits",
        href: `${github}/frighton-university-sis/commits/main/?author=PhonsekalLaure`,
      },
    ],
    visual: "sis",
    activity: projectActivity.sis,
    diagram: {
      label: "Separate responsibilities",
      title: "The right access. By design.",
      nodes: ["Student portal", "Role-aware API", "Admin accounts"],
      caption: "A simplified access diagram, not an application screenshot.",
    },
    screenshots: [],
    evidence: {
      verifiedOn: "2026-10-30",
      note: "Public repository and commit ownership verified using GitHub API. Local admin, grades, billing and holds routes, manifests, migrations, and commit history inspected. Project remains in progress.",
      references: [
        "SIS commits: de8618c, 46cfaa8, e69c955",
        "server/src/routes/{admin,grades,billing,holds}Routes.ts",
        "client/package.json; server/package.json",
      ],
    },
  },
  {
    publication: "published",
    slug: "itso",
    title: "ITSO Equipment Management",
    category: "Web application · Equipment management",
    context: "Equipment management project",
    status: "Source available",
    summary:
      "Equipment availability from reservation through borrowing and returns, with removed reservations kept on record.",
    role: "Implemented inventory and borrow tracking, reservation soft deletion, and status filtering.",
    technologies: ["PHP", "CodeIgniter", "JavaScript"],
    overview:
      "ITSO brings equipment records, reservations, borrowing, and returns into a PHP web application. My contributions connect reservation state to inventory availability, with supporting updates to the administrative interfaces.",
    contributions: [
      "Added equipment inventory management and borrow tracking to the reservation controllers.",
      "Implemented soft deletion so reservations can be removed from active views while retaining their records.",
      "Aligned reservation status values across controller checks, dashboard filters, and action buttons.",
      "Filtered inactive equipment and users from reservation choices and refined inventory restoration rules.",
    ],
    features: [
      "Equipment inventory management",
      "Reservation approval, pickup, and cancellation",
      "Borrow and return tracking",
      "Soft deletion and inactive-record filtering",
    ],
    challenge: {
      title: "Keeping reservation state and inventory aligned",
      description:
        "A pending reservation, a canceled request, and a collected item need different inventory behavior. I tied the controller actions to reservation state and aligned the status labels used in the views. Soft deletion preserves reservation records while keeping removed entries out of the active workflow.",
    },
    links: [
      { label: "Repository", href: `${github}/itso` },
      {
        label: "My commits",
        href: `${github}/itso/commits/main/?author=PhonsekalLaure`,
      },
      { label: "Interface PR #7", href: `${github}/itso/pull/7` },
    ],
    visual: "itso",
    activity: projectActivity.itso,
    diagram: {
      label: "Inventory lifecycle",
      title: "From reservation to return.",
      nodes: ["Reservation", "Borrow tracking", "Equipment inventory"],
      caption:
        "A simplified equipment workflow diagram, not an application screenshot.",
    },
    screenshots: [],
    evidence: {
      verifiedOn: "2026-10-30",
      note: "Public repository, composer manifest, live reservation controller/routes, merged PR #7, and PhonsekalLaure-authored commits abc6582, 1e50d96, and be8b29b inspected through GitHub CLI. No production or deployment claims.",
      references: [
        "https://github.com/PhonsekalLaure/itso/commit/abc6582cfd65ca78b833ec7ce5082186b48b9177",
        "https://github.com/PhonsekalLaure/itso/commit/1e50d9681b8887aba69c7021ffb735a1dc393923",
        "https://github.com/PhonsekalLaure/itso/commit/be8b29bbf13b5c03fa01c37327db0634d39cc520",
      ],
    },
  },
  {
    publication: "draft",
    slug: "frighton-university-lms",
    title: "Frighton University Library Management System",
    category: "Academic project",
    context: "Academic library project",
    status: "Verification pending",
    summary:
      "A library management project with catalog, loan, and reservation routes and a server-side SIS integration bridge.",
    role: "Authored the initial full-stack scaffold, Supabase migrations, and SIS integration bridge.",
    technologies: [],
    overview: "",
    contributions: [],
    features: [],
    challenge: { title: "", description: "" },
    links: [],
    visual: "sis",
    activity: [],
    screenshots: [],
    diagram: { label: "", title: "", nodes: [], caption: "" },
    evidence: unverified,
  },
] satisfies Project[];
