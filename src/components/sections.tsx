import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  portfolio,
  getPublishedProjects,
  getSocialLinks,
  type Certification,
  type Contribution,
  type PortfolioLink,
  type Project,
  type SkillGroup,
} from "@/content/portfolio";
import { Icon, type IconName } from "./icons";
import { HeroVisual, ProjectVisual } from "./project-visual";

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
export function SectionHeading({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span />
          {eyebrow}
        </p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {aside}
    </div>
  );
}
export function Hero() {
  const p = portfolio.profile;
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span />
          {p.headline}
        </p>
        <h1 id="hero-title">
          {p.heroTitle[0]}
          <br />
          <span>{p.heroTitle[1]}</span>
        </h1>
        <p className="hero-description">{p.introduction}</p>
        <div className="hero-actions">
          {getPublishedProjects().length > 0 && (
            <Link href="#projects" className="button button-primary">
              Explore my work
              <Icon name="arrow" size={18} />
            </Link>
          )}
          <ExternalLink
            href={p.github}
            className="button button-quiet"
            icon="github"
          >
            GitHub
          </ExternalLink>
          {p.linkedin && (
            <ExternalLink href={p.linkedin}>LinkedIn</ExternalLink>
          )}
          {p.email && (
            <a className="text-link" href={`mailto:${p.email}`}>
              Contact
              <Icon name="mail" size={17} />
            </a>
          )}
          {p.resume && (
            <a className="text-link" href={p.resume} download>
              Resume
              <Icon name="download" size={17} />
            </a>
          )}
        </div>
        <div className="hero-footnote">
          <span className="footnote-line" />
          Learning through building. Growing through collaboration.
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      <div className="project-artwork">
        <ProjectVisual
          variant={project.visual}
          nodes={project.diagram.nodes}
          label={project.diagram.label}
        />
        <Link
          href={`/projects/${project.slug}`}
          className="project-image-arrow"
          aria-label={`Read the ${project.title} case study`}
        >
          <Icon name="external" />
        </Link>
      </div>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{project.category}</span>
          <span className="project-number">0{index + 1}</span>
        </div>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-summary">{project.summary}</p>
        <div className="contribution-note">
          <span>MY CONTRIBUTION</span>
          <p>{project.role}</p>
        </div>
        <div className="tags">
          {project.technologies.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="project-card-footer">
          <Link className="text-link" href={`/projects/${project.slug}`}>
            View case study
            <Icon name="arrow" size={17} />
          </Link>
          <span className="status">
            <span />
            {project.status}
          </span>
        </div>
      </div>
    </article>
  );
}
export function ContributionCard({
  contribution,
}: {
  contribution: Contribution;
}) {
  return (
    <article className="contribution-card">
      <div className="contribution-symbol">
        <Icon name="branch" size={30} />
      </div>
      <div className="contribution-card-main">
        <div className="contribution-topline">
          <span className="small-label">
            {contribution.project}{" "}
            <span>/ {contribution.owner}’s repository</span>
          </span>
          <span className="merged-badge">
            <Icon name="check" size={13} />
            {contribution.status}
          </span>
        </div>
        <h3>{contribution.title}</h3>
        <p>{contribution.summary}</p>
        <div className="contribution-links">
          {contribution.links.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
          <span className="contribution-tech">
            {contribution.technologies.join(" · ")}
          </span>
        </div>
      </div>
    </article>
  );
}
export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  const icons: IconName[] = ["code", "phone", "database", "branch"];
  return (
    <div className="skills-grid">
      {groups.map((group, i) => (
        <article className="skill-group" key={group.title}>
          <Icon name={icons[i % icons.length]} size={22} />
          <h3>{group.title}</h3>
          <ul>
            {group.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
export function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  return (
    <section className="container section" id="certifications">
      <SectionHeading eyebrow="Continued learning" title="Certifications" />
      <div className="certification-grid">
        {certifications.map((certificate) => (
          <article className="certificate" key={certificate.name}>
            <Icon name="shield" size={25} />
            <h3>{certificate.name}</h3>
            {(certificate.issuer || certificate.year) && (
              <p>
                {[certificate.issuer, certificate.year]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
            {certificate.verificationUrl && (
              <ExternalLink href={certificate.verificationUrl}>
                Verify credential
              </ExternalLink>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
export function About() {
  const p = portfolio.profile;
  return (
    <section id="about" className="section about-section container">
      <div>
        <p className="eyebrow">
          <span />A little about me
        </p>
        <h2>
          Curious by nature.
          <br />
          <span className="muted-heading">Developer by practice.</span>
        </h2>
        <div className="about-copy">
          {p.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {p.education.publication === "published" && (
          <p className="education">
            {[p.education.school, p.education.program, p.education.graduation]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
        {p.location.publication === "published" && <p>{p.location.value}</p>}
        <ExternalLink href={p.github} icon="github">
          See what I’m working on
        </ExternalLink>
      </div>
      <div className="principles">
        {p.principles.map((principle) => (
          <article key={principle.number}>
            <span>{principle.number}</span>
            <div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Contact() {
  const links = getSocialLinks();
  if (!links.length) return null;
  return (
    <section id="contact" className="container contact-section">
      <div className="contact-decoration" aria-hidden="true">
        ↗
      </div>
      <div>
        <p className="eyebrow">
          <span />
          Keep in touch
        </p>
        <h2>
          Good work starts
          <br />
          with a conversation.
        </h2>
        <p>
          {portfolio.profile.email
            ? "Have a project, an opportunity, or something you’d like to discuss? I’d like to hear about it."
            : "Explore my repositories, follow what I’m building, and get to know my work on GitHub."}
        </p>
        <div className="contact-actions">
          {links.map((link, index) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              className={`button ${index === 0 ? "button-primary" : "button-outline"}`}
              icon={
                link.label === "GitHub"
                  ? "github"
                  : link.label === "Email"
                    ? "mail"
                    : "external"
              }
            >
              {link.label === "Email"
                ? "Send an email"
                : `Find me on ${link.label}`}
            </ExternalLink>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="container site-footer">
      <span>
        © {new Date().getFullYear()} {portfolio.profile.shortName}
      </span>
      <span>Built with care. And Next.js.</span>
      <ExternalLink
        href={portfolio.profile.github}
        icon="github"
        className="footer-github"
      >
        GitHub
      </ExternalLink>
    </footer>
  );
}
export function ProjectGallery({
  screenshots,
}: {
  screenshots: Project["screenshots"];
}) {
  if (!screenshots.length) return null;
  return (
    <section className="case-section">
      <h2>A closer look</h2>
      <div className="project-gallery">
        {screenshots.map((image) => (
          <figure key={image.src}>
            <Image
              {...image}
              alt={image.alt}
              sizes="(max-width: 800px) 100vw, 900px"
            />
            <figcaption>{image.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
export function LinkList({ links }: { links: PortfolioLink[] }) {
  return (
    <div className="evidence-links">
      {links.map((link) => (
        <ExternalLink href={link.href} key={link.href}>
          {link.label}
        </ExternalLink>
      ))}
    </div>
  );
}
