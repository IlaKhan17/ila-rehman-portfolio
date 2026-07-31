import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, projects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} · ${project.blurb}`,
    description: project.problem,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main
      id="main"
      className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <Link
        href="/"
        className="font-mono text-xs text-ink-faint transition-colors hover:text-accent-bright"
      >
        ← back
      </Link>

      <header className="mt-8">
        <p className="font-mono text-xs text-ink-faint">{project.year}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-3 font-mono text-sm text-accent-bright">
          {project.blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={
                link.kind === "demo"
                  ? "rounded-md border border-accent-dim bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent-bright transition-colors hover:bg-accent/20"
                  : "rounded-md border border-line px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              }
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </header>

      <Section title="The problem">
        <p className="leading-relaxed text-ink-muted">{project.problem}</p>
      </Section>

      <Section title="What I built">
        <p className="leading-relaxed text-ink-muted">{project.built}</p>
      </Section>

      <Section title="Architecture">
        <pre className="overflow-x-auto rounded-card border border-line bg-surface/60 p-4 font-mono text-xs leading-relaxed text-ink-muted">
          {project.architecture.join("\n")}
        </pre>
      </Section>

      <Section title="Highlights">
        <ul className="space-y-2">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3 text-ink-muted">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-dim" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Engineering decisions">
        <div className="space-y-4">
          {project.decisions.map((decision) => (
            <article
              key={decision.choice}
              className="rounded-card border border-line bg-surface/50 p-4"
            >
              <h3 className="font-mono text-sm text-ink">{decision.choice}</h3>
              <p className="mt-1 font-mono text-xs text-ink-faint">
                instead of {decision.insteadOf}
              </p>
              <p className="mt-3 leading-relaxed text-ink-muted">
                {decision.because}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Stack">
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-faint"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-faint">
        {title}
      </h2>
      {children}
    </section>
  );
}
