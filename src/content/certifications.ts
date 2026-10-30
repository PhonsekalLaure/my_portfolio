import "server-only";
import type { Certification } from "./types";
import { unverified } from "./verification";

export const certifications = [
  {
    publication: "draft",
    name: "IT Specialist — Python",
    evidence: unverified,
  },
  {
    publication: "draft",
    name: "IT Specialist — Databases",
    evidence: unverified,
  },
  {
    publication: "draft",
    name: "PMI Project Management Ready",
    evidence: unverified,
  },
] satisfies Certification[];
