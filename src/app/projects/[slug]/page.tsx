import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProject, getPublishedProjects } from "@/content/portfolio";
import { ProjectVisual } from "@/components/project-visual";
import { ProjectActivity } from "@/components/project-activity";
import { ProjectPreview } from "@/components/project-preview";
import { Icon } from "@/components/icons";
import { LinkList, ProjectGallery } from "@/components/sections";
import { getSiteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return getPublishedProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project)
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  return {
    title: project.title,
    description: project.summary,
    ...(getSiteUrl()
      ? { alternates: { canonical: `/projects/${project.slug}` } }
      : {}),
    openGraph: {
      title: project.title,
      description: project.summary,
      ...(getSiteUrl() ? { url: `/projects/${project.slug}` } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) notFound();
  const publishedProjects = getPublishedProjects();
  const currentIndex = publishedProjects.findIndex(
    (candidate) => candidate.slug === slug,
  );
  const nextProject =
    publishedProjects.length > 1
      ? publishedProjects[(currentIndex + 1) % publishedProjects.length]
      : undefined;
  return (
    <main id="main-content" className="container case-study">
      <Link href="/#projects" className="text-link back-link">
        <Icon name="arrow" size={17} />
        Back to selected work
      </Link>
      <div className="case-heading">
        <p className="eyebrow">
          <span />
          {project.category}
        </p>
        <h1>{project.title}</h1>
        <p className="case-summary">{project.summary}</p>
        <div className="case-meta">
          <span className="status">
            <span />
            {project.status}
          </span>
          <span>{project.context}</span>
        </div>
      </div>
      <ProjectVisual
        variant={project.visual}
        nodes={project.diagram.nodes}
        label={project.diagram.label}
      />
      <p className="visual-caption">{project.diagram.caption}</p>
      <div className="case-layout">
        <div className="case-main">
          <section className="case-section">
            <p className="eyebrow">
              <span />
              The context
            </p>
            <h2>The project</h2>
            <p>{project.overview}</p>
          </section>
          <section className="case-section contribution-case">
            <p className="eyebrow">
              <span />
              My part in the project
            </p>
            <h2>My contribution</h2>
            <p>{project.role}</p>
            <ul className="checked-list">
              {project.contributions.map((item) => (
                <li key={item}>
                  <Icon name="check" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="case-section">
            <p className="eyebrow">
              <span />
              An implementation challenge
            </p>
            <h2>{project.challenge.title}</h2>
            <p>{project.challenge.description}</p>
          </section>
          <ProjectPreview preview={project.preview} />
          <ProjectGallery screenshots={project.screenshots} />
          <ProjectActivity items={project.activity} />
        </div>
        <aside className="case-sidebar">
          <div>
            <h2>Implemented workflows</h2>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Technology</h2>
            <div className="tags">
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
          <div>
            <h2>Code & contribution evidence</h2>
            <LinkList links={project.links} />
          </div>
        </aside>
      </div>
      {nextProject && (
        <Link className="next-project" href={`/projects/${nextProject.slug}`}>
          <div>
            <span className="small-label">Explore another project</span>
            <h2>{nextProject.title}</h2>
          </div>
          <Icon name="arrow" size={28} />
        </Link>
      )}
    </main>
  );
}
