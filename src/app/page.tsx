import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { Skills } from "@/components/Skills";
import { Timeline } from "@/components/Timeline";
import { projects } from "@/content/projects";
import {
  aboutParagraphs,
  site,
  skillGroups,
  stats,
  timeline,
} from "@/content/site";

export default function Home() {
  return (
    <main>
      <Hero />
      <Section id="about" title="소개" muted>
        <About paragraphs={aboutParagraphs} stats={stats} />
      </Section>
      <Section id="skills" title="기술">
        <Skills groups={skillGroups} />
      </Section>
      <Section id="projects" title="프로젝트" muted>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
      <Section id="career" title="약력">
        <Timeline items={timeline} />
      </Section>
      <Section id="contact" title="연락" muted>
        <Contact emails={site.emails} github={site.github} />
      </Section>
    </main>
  );
}
