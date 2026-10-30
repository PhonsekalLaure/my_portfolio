import "server-only";
import type { CSSProperties } from "react";
import {
  siCodeigniter,
  siExpo,
  siExpress,
  siGit,
  siGithub,
  siJavascript,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { Icon, type IconName } from "./icons";

const logos: Record<string, SimpleIcon> = {
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  PHP: siPhp,
  React: siReact,
  "React Native": siReact,
  Expo: siExpo,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  Express: siExpress,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  CodeIgniter: siCodeigniter,
  Git: siGit,
  GitHub: siGithub,
};

const workflowIcons: Record<string, IconName> = {
  SQL: "database",
  "Pull requests": "branch",
  "Code review": "code",
};

export function SkillIcon({ name }: { name: string }) {
  const logo = logos[name];
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
      {logo ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d={logo.path} />
        </svg>
      ) : (
        <Icon name={workflowIcons[name] ?? "code"} size={18} />
      )}
    </span>
  );
}
