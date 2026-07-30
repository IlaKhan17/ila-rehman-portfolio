import { AgentConsole } from "@/components/console/agent-console";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    <main
      id="main"
      className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 sm:py-24"
    >
      <section className="mb-10">
        <p className="mb-4 flex items-center gap-2 font-mono text-xs text-ink-faint">
          <span className="size-1.5 rounded-full bg-signal" />
          {profile.availability}
        </p>

        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.name}
        </h1>

        <p className="mt-2 font-mono text-base text-accent-bright sm:text-lg">
          {profile.role}
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
          {profile.pitch}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.focus.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs text-ink-faint"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <AgentConsole />

      {/* Sections 2–7 (about, experience, projects, skills, education, contact)
          land below the console — the console never gates any content. */}
    </main>
  );
}
