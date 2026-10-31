import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import { ScrollReveal } from "@/components/scroll-reveal";
import {
  portfolio,
  getPublishedProjects,
  getPublishedSkills,
  getPublishedCertifications,
} from "@/content/portfolio";
import {
  Hero,
  SectionHeading,
  ProjectCard,
  SkillGroups,
  Certifications,
  About,
  Contact,
} from "@/components/sections";
import { ExternalLink } from "@/components/external-link";

export const metadata: Metadata = getSiteUrl()
  ? { alternates: { canonical: "/" } }
  : {};

export default function Home() {
  const projects = getPublishedProjects();
  const skills = getPublishedSkills();
  const certifications = getPublishedCertifications();
  return (
    <main id="main-content">
      <ScrollReveal>
        <Hero />
        {projects.length > 0 && (
          <section id="projects" className="section container projects-section">
            <SectionHeading
              eyebrow="Selected work"
              title="Built for real workflows."
              description="A few projects, the problems behind them, and the parts I helped build."
              aside={
                <ExternalLink href={portfolio.profile.github} icon="github">
                  All repositories
                </ExternalLink>
              }
            />
            <div className="projects-grid">
              {projects.map((project, index) => (
                <ProjectCard
                  project={project}
                  index={index}
                  key={project.slug}
                />
              ))}
            </div>
          </section>
        )}
        {skills.length > 0 && (
          <section id="skills" className="skills-section">
            <div className="section container">
              <SectionHeading
                eyebrow="My toolkit"
                title="Tools I build with."
                description="Languages, frameworks, and tools in my technical toolkit. Always room to learn more."
              />
              <SkillGroups groups={skills} />
            </div>
          </section>
        )}
        {certifications.length > 0 && (
          <Certifications certifications={certifications} />
        )}
        {portfolio.profile.about.length > 0 && <About />}
        <Contact />
      </ScrollReveal>
    </main>
  );
}
