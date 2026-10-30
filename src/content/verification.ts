import "server-only";
import type { Evidence } from "./types";

// The date below records the existing evidence review, not this file refactor.
export const verifiedOn = "2026-10-29";
export const unverified: Evidence = {
  note: "Awaiting owner-supplied verification.",
  references: [],
  verifiedOn: "",
};
