"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Icon, type IconName } from "./icons";

type HeroProject = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  visual: "prism" | "sis" | "itso";
};

const projectIcons: Record<HeroProject["visual"], IconName> = {
  prism: "shield",
  sis: "database",
  itso: "layers",
};

export function HeroPortrait({
  photo,
  name,
  projects,
}: {
  photo: string;
  name: string;
  projects: HeroProject[];
}) {
  const [view, setView] = useState<"person" | "work">("person");
  const [selected, setSelected] = useState(0);
  const workButton = useRef<HTMLButtonElement>(null);
  const project = projects[selected];

  return (
    <div className="hero-portrait" data-reveal="right" data-view={view}>
      <div className="portrait-topline" aria-hidden="true">
        <span>RR / A work in progress</span>
        <Icon name="code" size={17} />
      </div>
      <div className="portrait-window">
        <div className="portrait-person" hidden={view !== "person"}>
          <Image
            className="hero-photo"
            src={photo}
            alt={`Portrait of ${name}`}
            width={1254}
            height={1254}
            sizes="(max-width: 480px) calc(100vw - 64px), (max-width: 650px) 360px, (max-width: 1100px) 40vw, 420px"
            loading="eager"
            fetchPriority="high"
          />
          <div className="portrait-note" aria-hidden="true">
            <span>Human first.</span>
            <span>Builder always.</span>
            <svg viewBox="0 0 76 30" fill="none">
              <path d="M3 18C18 3 41 4 66 16M56 4l11 13-17 5" />
            </svg>
          </div>
          {projects.length > 0 && (
            <button
              type="button"
              className="portrait-peek"
              onClick={() => {
                setView("work");
                workButton.current?.focus();
              }}
            >
              Behind the pixels
              <Icon name="arrow" size={16} />
            </button>
          )}
        </div>
        {project && (
          <div className="portrait-work" hidden={view !== "work"}>
            <div className="portrait-map-heading">
              <span className="portrait-kicker">A few connected ideas</span>
              <p>
                Different projects.
                <br />
                <em>The same curiosity.</em>
              </p>
            </div>
            <div
              className="portrait-map"
              role="group"
              aria-label="Select a project"
            >
              <svg
                className="portrait-map-lines"
                viewBox="0 0 400 160"
                fill="none"
                aria-hidden="true"
              >
                <path d="M200 134C200 60 63 130 63 44M200 134V25M200 134C200 60 337 130 337 44" />
                <circle cx="200" cy="134" r="5" />
              </svg>
              {projects.map((item, index) => (
                <button
                  type="button"
                  className="portrait-project-node"
                  key={item.slug}
                  aria-label={`Explore ${item.title}`}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                >
                  <span className="portrait-node-icon">
                    <Icon name={projectIcons[item.visual]} size={22} />
                  </span>
                  <span className="portrait-node-number">0{index + 1}</span>
                </button>
              ))}
              <span className="portrait-map-origin" aria-hidden="true">
                rr.
              </span>
            </div>
            <div
              className="portrait-project-detail"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="portrait-project-category">
                {project.category}
              </span>
              <Link
                className="portrait-project-link"
                href={`/projects/${project.slug}`}
              >
                {project.title}
                <Icon name="arrow" size={18} />
              </Link>
              <p>{project.summary}</p>
              <div className="portrait-project-stack">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="portrait-bottomline">
        <span className="portrait-caption">
          Two sides.
          <br />
          <em>One curious mind.</em>
        </span>
        {projects.length > 0 && (
          <div
            className="portrait-switch"
            role="group"
            aria-label="Portrait view"
          >
            <button
              type="button"
              aria-pressed={view === "person"}
              onClick={() => setView("person")}
            >
              The person
            </button>
            <button
              ref={workButton}
              type="button"
              aria-pressed={view === "work"}
              onClick={() => setView("work")}
            >
              The work
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
