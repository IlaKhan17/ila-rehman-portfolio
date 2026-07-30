import Link from "next/link";

import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { getProject } from "@/content/projects";
import { education, skills } from "@/content/skills";
import type { ConsoleStep } from "@/content/types";

/**
 * Rich blocks ILA can return alongside prose. Each one reads from the same
 * `content/` files the page sections use, so the console can never drift out
 * of sync with the rest of the site.
 */

function ProjectRow({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) return null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex items-baseline justify-between gap-4 rounded-lg border border-line bg-base/60 px-3 py-2.5 transition-colors hover:border-accent-dim hover:bg-raised"
    >
      <span className="min-w-0">
        <span className="font-mono text-sm text-ink group-hover:text-accent-bright">
          {project.name}
        </span>
        <span className="ml-2 text-xs text-ink-faint">{project.blurb}</span>
      </span>
      <span className="shrink-0 font-mono text-xs text-ink-faint transition-colors group-hover:text-accent-bright">
        open →
      </span>
    </Link>
  );
}

export function ConsoleBlock({ step }: { step: ConsoleStep }) {
  switch (step.type) {
    case "projects":
      return (
        <div className="mt-3 flex flex-col gap-1.5">
          {step.slugs.map((slug) => (
            <ProjectRow key={slug} slug={slug} />
          ))}
        </div>
      );

    case "skills":
      return (
        <dl className="mt-3 space-y-2 rounded-lg border border-line bg-base/60 p-3">
          {skills.map((group) => (
            <div key={group.key} className="text-xs">
              <dt className="font-mono text-accent-bright">{group.label}</dt>
              <dd className="mt-0.5 text-ink-muted">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      );

    case "education":
      return (
        <ul className="mt-3 space-y-2 rounded-lg border border-line bg-base/60 p-3">
          {education.map((item) => (
            <li key={item.degree} className="text-xs">
              <p className="font-mono text-ink">
                {item.degree}
                <span className="ml-2 text-ink-faint">{item.period}</span>
              </p>
              <p className="mt-0.5 text-ink-muted">
                {item.field} · {item.institution}
              </p>
            </li>
          ))}
        </ul>
      );

    case "experience":
      return (
        <ul className="mt-3 space-y-2 rounded-lg border border-line bg-base/60 p-3">
          {experience.map((item) => (
            <li key={item.role} className="text-xs">
              <p className="font-mono text-ink">{item.role}</p>
              <p className="mt-0.5 text-ink-muted">
                {item.kind} · {item.period}
              </p>
              <p className="mt-1 text-ink-muted">{item.summary}</p>
            </li>
          ))}
        </ul>
      );

    case "links":
      return (
        <div className="mt-3 flex flex-wrap gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md border border-accent-dim bg-accent/10 px-2.5 py-1.5 font-mono text-xs text-accent-bright transition-colors hover:bg-accent/20"
          >
            {profile.email}
          </a>
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-line px-2.5 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      );

    default:
      return null;
  }
}
