import type { ReactNode } from "react";
import { Icon, type IconName } from "./icons";

export function ExternalLink({
  href,
  children,
  className = "text-link",
  icon = "external",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: IconName;
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon name={icon} size={17} />
    </a>
  );
}
