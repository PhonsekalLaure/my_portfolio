import "server-only";
import type { ProjectScreenshot } from "./types";

// Owner-supplied screenshots. The owner confirmed all visible data is demo data.
export const prismGuardScreenshots: ProjectScreenshot[] = [
  {
    src: "/assets/projects/prism-guard/web/payroll-management.png",
    title: "Web · Payroll review",
    alt: "PRISM-GUARD payroll management showing a cutoff selector, summary totals, employee filters, and payroll records.",
    caption:
      "The administrative payroll view brings cutoff selection, filters, and employee pay records together.",
    width: 1919,
    height: 910,
  },
  {
    src: "/assets/projects/prism-guard/web/client-management.png",
    title: "Web · Client management",
    alt: "PRISM-GUARD client management with contract summaries, a search field, status filtering, and client cards.",
    caption:
      "Client accounts and contract summaries in the agency's web application.",
    width: 1919,
    height: 909,
  },
  {
    src: "/assets/projects/prism-guard/mobile/earnings-and-cash-advance.png",
    title: "Mobile · Guard earnings",
    alt: "Two PRISM-GUARD mobile screens showing estimated net pay, earnings and deductions, and a cash advance request form.",
    caption:
      "The guard-facing earnings screen alongside the project's cash advance interface. My contribution focuses on earnings and its supporting services.",
    width: 1366,
    height: 768,
  },
  {
    src: "/assets/projects/prism-guard/mobile/profile-and-documents.png",
    title: "Mobile · Profile & documents",
    alt: "Three PRISM-GUARD mobile profile screens showing a demo guard profile, document listings, and active or expired document statuses.",
    caption:
      "Profile and document views show how guards access their submitted documents and review document status.",
    width: 1366,
    height: 768,
  },
];
