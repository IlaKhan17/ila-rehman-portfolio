import Link from "next/link";

import { Section } from "@/components/site/section";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <Section id="projects" label="projects/">
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const tech = project.featured ? project.tech.slice(0, 8) : project.tech;

  return (
    <article
      className={cn(
        "group relative rounded-card border border-line bg-surface/50 p-5 transition-colors hover:border-line-strong sm:p-7",
        project.featured && "bg-surface/70",
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3
          className={cn(
            "font-medium tracking-tight text-ink",
            project.featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent-bright"
          >
            {project.name}
          </Link>
        </h3>
        <p className="font-mono text-xs text-accent-bright">{project.blurb}</p>
        <span className="ml-auto font-mono text-xs text-ink-faint">
          {project.year}
        </span>
      </div>

      <p
        className={cn(
          "mt-4 max-w-2xl leading-relaxed text-ink-muted",
          !project.featured && "text-sm",
        )}
      >
        {project.featured ? project.built : project.problem}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {tech.map((item) => (
          <li
            key={item}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-ink-faint"
          >
            {item}
          </li>
        ))}
        {project.tech.length > tech.length && (
          <li className="px-1 py-1 font-mono text-[0.7rem] text-ink-faint">
            +{project.tech.length - tech.length} more
          </li>
        )}
      </ul>

      <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-xs">
        <span className="text-ink-muted transition-colors group-hover:text-accent-bright">
          Read the case study →
        </span>
        {project.links.map((link) => (
          // Relative + z-10 keeps these clickable above the card-wide overlay link.
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 text-ink-faint transition-colors hover:text-ink"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </article>
  );
}
