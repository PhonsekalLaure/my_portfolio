import "server-only";
import Image from "next/image";
import type { CSSProperties } from "react";
import {
  siCodeigniter,
  siComposer,
  siCplusplus,
  siCss,
  siDocker,
  siExpo,
  siExpress,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siKotlin,
  siMysql,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { Icon, type IconName } from "./icons";

const logos: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  Python: siPython,
  PHP: siPhp,
  Kotlin: siKotlin,
  "C++": siCplusplus,
  Swift: siSwift,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  "React Native": siReact,
  Expo: siExpo,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  Express: siExpress,
  "Express.js": siExpress,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Firebase: siFirebase,
  CodeIgniter: siCodeigniter,
  Git: siGit,
  GitHub: siGithub,
  Docker: siDocker,
  Composer: siComposer,
  Figma: siFigma,
};

const localLogos: Record<string, string> = {
  Java: "/assets/skills/java.svg",
  "Visual Studio Code": "/assets/skills/visual-studio-code.svg",
};

const workflowIcons: Record<string, IconName> = {
  SQL: "database",
  "Pull requests": "branch",
  "Code review": "code",
  "REST APIs": "code",
  "Database Administration": "database",
  "Software Testing": "check",
  "Technical Documentation": "layers",
};

export function SkillIcon({ name }: { name: string }) {
  const logo = logos[name];
  const localLogo = localLogos[name];
  const monochrome = logo && ["expo", "express", "github"].includes(logo.slug);

  return (
    <span
      className={`skill-icon${monochrome ? " skill-icon-neutral" : ""}`}
      data-brand={logo?.slug}
      style={
        logo
          ? ({ "--skill-color": `#${logo.hex}` } as CSSProperties)
          : undefined
      }
      aria-hidden="true"
    >
      {localLogo ? (
        <Image src={localLogo} alt="" width={18} height={18} />
      ) : logo ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d={logo.path} />
        </svg>
      ) : (
        <Icon name={workflowIcons[name] ?? "code"} size={18} />
      )}
    </span>
  );
}
