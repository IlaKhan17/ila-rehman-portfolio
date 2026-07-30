import Link from "next/link";

import { profile, sections } from "@/content/profile";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/80 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-5xl items-center gap-4 px-5 py-3 sm:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm text-ink transition-colors hover:text-accent-bright"
        >
          <span className="grid size-6 place-items-center rounded border border-accent-dim bg-accent/15 text-[0.6rem] font-semibold text-accent-bright">
            {profile.monogram}
          </span>
          <span className="hidden sm:inline">ila</span>
        </Link>

        <ul className="ml-auto flex items-center gap-3 overflow-x-auto font-mono text-xs sm:gap-5">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`/#${section.id}`}
                className="whitespace-nowrap text-ink-faint transition-colors hover:text-accent-bright"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
