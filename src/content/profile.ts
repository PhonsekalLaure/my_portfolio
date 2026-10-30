import "server-only";
import type { Publication } from "./types";

export const profile = {
  name: "Ronn Saimund Rosarito",
  shortName: "Ronn Rosarito",
  initials: "rr",
  headline: "IT student & software developer",
  heroTitle: ["Useful software.", "Thoughtfully built."],
  introduction:
    "I’m Ronn Saimund Rosarito, an IT student building practical web and mobile applications. I turn real workflows into useful software, one considered detail at a time.",
  description:
    "Ronn Saimund Rosarito’s developer portfolio. Explore web and mobile projects, individual contributions, and collaborative development work.",
  github: "https://github.com/PhonsekalLaure",
  linkedin: undefined as string | undefined,
  email: undefined as string | undefined,
  resume: undefined as string | undefined,
  location: { publication: "draft" as Publication, value: "Philippines" },
  education: {
    publication: "draft" as Publication,
    school: "",
    program: "",
    graduation: "",
  },
  about: [
    "I’m an Information Technology student who enjoys making complicated workflows easier to navigate. My projects explore the space where thoughtful interfaces meet dependable application logic.",
    "I learn by building, testing, and reviewing code. Whether I’m contributing to a team capstone or improving another developer’s repository, I care about clear responsibilities, useful feedback, and the details that make a feature work.",
  ],
  principles: [
    {
      number: "01",
      title: "Start with the workflow",
      description:
        "Understand the people and the process before deciding what to build.",
    },
    {
      number: "02",
      title: "Build with intention",
      description:
        "Give interfaces, access rules, and error states the same consideration.",
    },
    {
      number: "03",
      title: "Keep learning in public",
      description:
        "Use Git, pull requests, and code review to make the next iteration better.",
    },
  ],
};
