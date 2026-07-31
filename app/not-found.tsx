import Link from "next/link";

import { sections } from "@/content/profile";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-3xl flex-col px-5 py-24 sm:px-8 sm:py-32"
    >
      <p className="font-mono text-xs text-ink-faint">404 · no such route</p>

      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        That page does not exist.
      </h1>

      <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
        Nothing here. Everything on this site is reachable from the homepage, so
        try one of these.
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        <li>
          <Link
            href="/"
            className="rounded-md border border-accent-dim bg-accent/10 px-4 py-2 font-mono text-xs text-accent-bright transition-colors hover:bg-accent/20"
          >
            home
          </Link>
        </li>
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`/#${section.id}`}
              className="rounded-md border border-line px-4 py-2 font-mono text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
