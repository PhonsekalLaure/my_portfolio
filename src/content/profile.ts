import "server-only";
import type { Profile } from "./types";

export const profile: Profile = {
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
  linkedin: "https://www.linkedin.com/in/rsrosarito/",
  email: "rosaritoronnsaimund@gmail.com",
  secondaryEmail: "rurosarito@fit.edu.ph",
  resume: "/assets/resume.pdf",
  location: {
    publication: "published",
    value: "Sampaloc, Manila, Philippines",
  },
  education: {
    publication: "published",
    school: "FEU Institute of Technology",
    program:
      "Bachelor of Science in Information Technology, Specialization in Web and Mobile Applications",
    graduation: "Expected July 2027",
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
