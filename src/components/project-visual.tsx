import Image from "next/image";
import { Icon } from "./icons";
import type { IconName } from "./icons";
import type { Project } from "@/content/types";

export function ProjectCover({
  project,
  sizes = "(max-width: 700px) 100vw, (max-width: 1240px) 50vw, 590px",
}: {
  project: Project;
  sizes?: string;
}) {
  const screenshot = project.screenshots[0];

  if (!screenshot) {
    return (
      <ProjectVisual
        variant={project.visual}
        nodes={project.diagram.nodes}
        label={project.diagram.label}
      />
    );
  }

  return (
    <div className="project-visual project-cover">
      <Image
        src={screenshot.src}
        alt={screenshot.alt}
        width={screenshot.width}
        height={screenshot.height}
        sizes={sizes}
      />
    </div>
  );
}

export function HeroVisual() {
  return (
    <div
      className="hero-visual"
      data-reveal="right"
      role="img"
      aria-label="Web interfaces, application logic, and mobile experiences connected around a shared workflow."
    >
      <div className="visual-grid" />
      <div className="visual-topline">
        <span className="tiny-dot" /> From idea to implementation
        <span className="visual-plus">+</span>
      </div>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <svg
        className="hero-connections"
        viewBox="0 0 500 470"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M118 168H250V255H385M250 255V371H144"
          stroke="currentColor"
          strokeDasharray="4 6"
        />
        <circle cx="250" cy="255" r="6" fill="currentColor" />
      </svg>
      <div className="visual-node node-web">
        <span className="node-icon">
          <Icon name="code" size={24} />
        </span>
        <div>
          <span className="node-label">01 / WEB</span>
          <strong>Thoughtful interfaces</strong>
          <span className="node-caption">Clear. Accessible. Useful.</span>
        </div>
      </div>
      <div className="visual-node node-logic">
        <span className="node-icon">
          <Icon name="layers" size={24} />
        </span>
        <div>
          <span className="node-label">02 / BACKEND</span>
          <strong>Purposeful logic</strong>
          <span className="node-caption">Connected to real workflows.</span>
        </div>
      </div>
      <div className="visual-node node-mobile">
        <span className="node-icon">
          <Icon name="phone" size={24} />
        </span>
        <div>
          <span className="node-label">03 / MOBILE</span>
          <strong>Everyday experiences</strong>
          <span className="node-caption">Built for the people using them.</span>
        </div>
      </div>
      <div className="visual-bottomline">
        <span>INTERFACES ↔ SYSTEMS ↔ PEOPLE</span>
        <span className="small-cross">✳</span>
      </div>
    </div>
  );
}

export function ProjectVisual({
  variant,
  nodes,
  label,
}: {
  variant: Project["visual"];
  nodes: string[];
  label: string;
}) {
  const icons: Record<Project["visual"], IconName[]> = {
    prism: ["phone", "layers", "code"],
    sis: ["code", "shield", "database"],
    itso: ["code", "branch", "database"],
  };
  const captions: Record<Project["visual"], string> = {
    prism: "PRISM / GUARD",
    sis: "FRIGHTON / SIS",
    itso: "ITSO / EQUIPMENT",
  };
  return (
    <div
      className={`project-visual project-visual-${variant}`}
      role="img"
      aria-label={`${label}: ${nodes.join(" connects to ")}. Simplified diagram.`}
    >
      <div className="project-visual-grid" />
      <div className="project-visual-label">
        <span className="tiny-dot" /> {label}
        <span>↗</span>
      </div>
      <div className="workflow-diagram">
        {nodes.map((node, index) => (
          <div className="workflow-step" key={node}>
            <div
              className={`workflow-icon ${index === 1 ? "workflow-center" : ""}`}
            >
              <Icon
                name={icons[variant][index % icons[variant].length]}
                size={index === 1 ? 30 : 25}
              />
            </div>
            <span>{node}</span>
          </div>
        ))}
      </div>
      <div className="diagram-caption">
        <span>{captions[variant]}</span>
        <span>WORKFLOW DIAGRAM</span>
      </div>
    </div>
  );
}
