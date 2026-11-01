import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  portfolio,
  getPublishedProjects,
  getContactEmails,
  getSocialLinks,
  type Certification,
  type PortfolioLink,
  type Project,
  type SkillGroup,
} from "@/content/portfolio";
import { Icon, type IconName } from "./icons";
import { HeroVisual, ProjectCover } from "./project-visual";
import { SkillIcon } from "./skill-icon";
import { ExternalLink } from "./external-link";
import { formatDate } from "@/lib/dates";
import { HeroPortrait } from "./hero-portrait";
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
    <div className="section-heading" data-reveal="up">
      <div>
        <p className="eyebrow">
          <span className="section-index" aria-hidden="true" />
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
    <div className="hero-stage">
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy" data-reveal="left">
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
            {p.resume && (
              <a className="button button-quiet" href={p.resume} download>
                Resume
                <Icon name="download" size={17} />
              </a>
            )}
          </div>
          <div className="hero-socials">
            <ExternalLink
              href={p.github}
              className="text-link hero-social-link"
              icon="github"
            >
              GitHub
            </ExternalLink>
            {p.linkedin && (
              <ExternalLink
                href={p.linkedin}
                className="text-link hero-social-link"
              >
                LinkedIn
              </ExternalLink>
            )}
            {p.email && (
              <a className="text-link hero-social-link" href="#contact">
                Contact
                <Icon name="mail" size={17} />
              </a>
            )}
          </div>
          <div className="hero-footnote">
            <span className="footnote-line" />
            Learning through building. Growing through collaboration.
          </div>
        </div>
        {p.photo ? (
          <HeroPortrait
            photo={p.photo}
            name={p.name}
            projects={getPublishedProjects()
              .slice(0, 3)
              .map((project) => ({
                slug: project.slug,
                title: project.title,
                category: project.category,
                summary: project.summary,
                technologies: project.technologies.slice(0, 3),
                visual: project.visual,
              }))}
          />
        ) : (
          <HeroVisual />
        )}
      </section>
      <div className="hero-meta container">
        {p.location.publication === "published" && p.location.value && (
          <span className="hero-location">
            <span aria-hidden="true" />
            Based in {p.location.value}
          </span>
        )}
        {getPublishedProjects().length > 0 && (
          <Link href="#projects" className="hero-scroll">
            A few things I’ve built
            <Icon name="arrow" size={16} />
          </Link>
        )}
      </div>
    </div>
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
    <article
      className="project-card"
      data-reveal={index % 2 ? "right" : "left"}
    >
      <div className="project-artwork">
        <ProjectCover project={project} />
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
          <span className="status" data-status={project.status}>
            <span />
            {project.status}
          </span>
        </div>
      </div>
    </article>
  );
}
export function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  const icons: IconName[] = ["code", "database", "phone", "branch", "code"];
  return (
    <div className="skills-grid">
      {groups.map((group, i) => (
        <article
          className="skill-group"
          key={group.title}
          data-reveal="up"
          style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
        >
          <div className="skill-group-heading">
            <span className="skill-group-icon">
              <Icon name={icons[i % icons.length]} size={22} />
            </span>
            <span className="skill-group-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <h3>{group.title}</h3>
          <ul>
            {group.skills.map((skill) => (
              <li key={skill}>
                <SkillIcon name={skill} />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
function CertificationCard({ certificate }: { certificate: Certification }) {
  return (
    <article className="certificate" data-reveal="up">
      <span className="certificate-badge" aria-hidden="true">
        {certificate.badgeImage ? (
          <Image
            src={certificate.badgeImage}
            alt=""
            width={144}
            height={144}
            sizes="(max-width: 650px) 52px, 72px"
          />
        ) : (
          <Icon name="shield" size={25} />
        )}
      </span>
      <div className="certificate-content">
        <h3>{certificate.name}</h3>
        {certificate.kind && (
          <span className="credential-kind">{certificate.kind}</span>
        )}
        {(certificate.issuer || certificate.year) && (
          <p>
            {[certificate.issuer, certificate.year].filter(Boolean).join(" · ")}
          </p>
        )}
        {certificate.expiresOn && (
          <p className="credential-expiry">
            Valid until {formatDate(certificate.expiresOn)}
          </p>
        )}
        {certificate.verificationUrl && (
          <ExternalLink href={certificate.verificationUrl}>
            Verify credential
          </ExternalLink>
        )}
      </div>
    </article>
  );
}

export function Certifications({
  certifications,
}: {
  certifications: Certification[];
}) {
  const credentials = certifications.filter(
    (certificate) => certificate.kind !== "Course completion",
  );
  const courses = certifications.filter(
    (certificate) => certificate.kind === "Course completion",
  );
  return (
    <section className="container section" id="certifications">
      <SectionHeading
        eyebrow="Continued learning"
        title="Certifications & training"
        description="Professional certifications and completed courses, with public credential records."
      />
      {credentials.length > 0 && (
        <div className="certification-grid">
          {credentials.map((certificate) => (
            <CertificationCard
              key={certificate.name}
              certificate={certificate}
            />
          ))}
        </div>
      )}
      {courses.length > 0 && (
        <details className="training-disclosure">
          <summary>
            <span>Completed courses & training</span>
            <span className="training-count">{courses.length}</span>
            <Icon name="arrow" size={18} className="training-arrow" />
          </summary>
          <div className="certification-grid training-grid">
            {courses.map((certificate) => (
              <CertificationCard
                key={certificate.name}
                certificate={certificate}
              />
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
export function About() {
  const p = portfolio.profile;
  return (
    <section id="about" className="section about-section container">
      <div data-reveal="left">
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
      <div className="principles" data-reveal="right">
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
  const emails = getContactEmails();
  const socialLinks = getSocialLinks();
  if (!emails.length && !socialLinks.length) return null;
  return (
    <section
      id="contact"
      className="container contact-section"
      data-reveal="scale"
    >
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
          <span>with a conversation.</span>
        </h2>
        <p>
          {portfolio.profile.email
            ? "Have a project, an opportunity, or something you’d like to discuss? I’d like to hear about it."
            : "Explore my repositories, follow what I’m building, and get to know my work on GitHub."}
        </p>
        {emails.length > 0 && (
          <address className="contact-emails">
            {emails.map((email) => (
              <div className="contact-email" key={email.address}>
                <span className="contact-email-label">{email.label}</span>
                <span className="contact-email-value">{email.address}</span>
              </div>
            ))}
          </address>
        )}
        <div className="contact-actions">
          {socialLinks.map((link) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              className="button button-outline"
              icon={link.label === "GitHub" ? "github" : "external"}
            >
              Find me on {link.label}
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
      <span className="footer-credit">Built with care. And Next.js.</span>
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
    <section className="case-section screenshot-section">
      <h2>A closer look</h2>
      <p>Selected project screens. Open an image to view it at full size.</p>
      <div className="project-gallery">
        {screenshots.map((image) => (
          <figure key={image.src}>
            <a
              href={image.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View full-size image: ${image.title || image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(max-width: 800px) 100vw, 900px"
              />
            </a>
            <figcaption>
              {image.title && <h3>{image.title}</h3>}
              <p>{image.caption || image.alt}</p>
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                View full-size image <Icon name="external" size={15} />
              </a>
            </figcaption>
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
