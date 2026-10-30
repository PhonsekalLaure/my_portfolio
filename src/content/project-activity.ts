import "server-only";
import type { ProjectActivity } from "./types";

// Curated public changes authored by PhonsekalLaure. Dates are GitHub author
// dates for commits and merge dates for pull requests, expressed in UTC.
export const projectActivity = {
  prismGuard: [
    {
      title: "Deployment permissions across setup workflows",
      summary:
        "Applied deployment permission checks to client and employee forms, assignment actions, and site selection.",
      repository: "prism-guard-web",
      date: "2026-07-08",
      kind: "Commit",
      reference: "52b89aa",
      href: "https://github.com/PhonsekalLaure/prism-guard-web/commit/52b89aa374d64a316e8c6cfcc0d9950270cda6a7",
    },
    {
      title: "Selfie evidence for attendance contests",
      summary:
        "Connected mobile selfie capture to attendance contest submission, with the supporting attendance service changes.",
      repository: "prism-guard-mobile",
      date: "2026-07-05",
      kind: "Commit",
      reference: "305c07e",
      href: "https://github.com/PhonsekalLaure/prism-guard-mobile/commit/305c07ed8f6c5fe5885eb958aa65acfd75220c1c",
    },
    {
      title: "Guard earnings screens and service integration",
      summary:
        "Contributed the mobile earnings workflow and its service and formatting helpers through a merged pull request.",
      repository: "prism-guard-mobile",
      date: "2026-06-04",
      kind: "Merged PR",
      reference: "#27",
      href: "https://github.com/PhonsekalLaure/prism-guard-mobile/pull/27",
    },
    {
      title: "HRIS payroll views and breakdowns",
      summary:
        "Contributed payroll tables, filters, breakdown views, and export helpers through a merged pull request.",
      repository: "prism-guard-web",
      date: "2026-06-04",
      kind: "Merged PR",
      reference: "#76",
      href: "https://github.com/PhonsekalLaure/prism-guard-web/pull/76",
    },
  ],
  sis: [
    {
      title: "Typed development seed data",
      summary:
        "Added a database seeding script with typed data definitions for development setup.",
      repository: "frighton-university-sis",
      date: "2026-10-23",
      kind: "Commit",
      reference: "e69c955",
      href: "https://github.com/PhonsekalLaure/frighton-university-sis/commit/e69c955b8963fb22109dc0ff7742f9edc2d41b11",
    },
    {
      title: "Administrative account lifecycle",
      summary:
        "Implemented admin account workflows, database migrations, operational documentation, and frontend handoff details.",
      repository: "frighton-university-sis",
      date: "2026-10-22",
      kind: "Commit",
      reference: "de8618c",
      href: "https://github.com/PhonsekalLaure/frighton-university-sis/commit/de8618c7c285db72db7c934c91c725c0f5469fce",
    },
    {
      title: "Student portal and holds routes",
      summary:
        "Contributed student-facing pages, architecture documentation, and backend routes for student holds.",
      repository: "frighton-university-sis",
      date: "2026-10-22",
      kind: "Commit",
      reference: "46cfaa8",
      href: "https://github.com/PhonsekalLaure/frighton-university-sis/commit/46cfaa88d762cd71d61c41c110abf7ad63687f61",
    },
  ],
  itso: [
    {
      title: "Reservation status and inventory consistency",
      summary:
        "Aligned status labels, filtered inactive users and equipment, and tied inventory restoration to reservation state.",
      repository: "itso",
      date: "2025-11-29",
      kind: "Commit",
      reference: "abc6582",
      href: "https://github.com/PhonsekalLaure/itso/commit/abc6582cfd65ca78b833ec7ce5082186b48b9177",
    },
    {
      title: "Reservation soft deletion",
      summary:
        "Added soft deletion and excluded deleted reservations from active queries while retaining their records.",
      repository: "itso",
      date: "2025-11-29",
      kind: "Commit",
      reference: "1e50d96",
      href: "https://github.com/PhonsekalLaure/itso/commit/1e50d9681b8887aba69c7021ffb735a1dc393923",
    },
    {
      title: "Equipment inventory and borrowing",
      summary:
        "Added equipment management and reservation-to-borrow tracking in the application controllers.",
      repository: "itso",
      date: "2025-11-29",
      kind: "Commit",
      reference: "be8b29b",
      href: "https://github.com/PhonsekalLaure/itso/commit/be8b29bbf13b5c03fa01c37327db0634d39cc520",
    },
  ],
} satisfies Record<string, ProjectActivity[]>;
