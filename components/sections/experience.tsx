import { Section } from "@/components/site/section";
import { experience, experienceIsDraft } from "@/content/experience";

/**
 * No placeholder can reach a visitor: every field is passed through `real()`,
 * which drops anything still marked TODO. An unfinished record degrades to
 * role, summary and tags rather than publishing "TODO —" text.
 * The draft notice below is development-only.
 */
const isPlaceholder = (value: string) => value.trimStart().startsWith("TODO");

/** Returns the value only if it is real content, otherwise a fallback. */
const real = (value: string, fallback = "") =>
  isPlaceholder(value) ? fallback : value;

export function ExperienceSection() {
  return (
    <Section id="experience" label="experience.log">
      {experienceIsDraft && process.env.NODE_ENV === "development" && (
        <p className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 font-mono text-xs text-amber-300">
          Draft — awaiting real details from Ila. Placeholder bullets are hidden
          in production. See PLAN.md §8.
        </p>
      )}

      <div className="space-y-10">
        {experience.map((item) => {
          const points = item.points.filter((point) => !isPlaceholder(point));
          const period = real(item.period, "6+ years");
          const org = real(item.org, "Freelance");

          return (
            <article
              key={item.role}
              className="grid gap-4 sm:grid-cols-[10rem_1fr] sm:gap-8"
            >
              <div className="font-mono text-xs text-ink-faint">
                <p>{period}</p>
                <p className="mt-1">{item.kind}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-ink">{item.role}</h3>
                <p className="mt-0.5 font-mono text-xs text-accent-bright">
                  {org} · {item.location}
                </p>

                <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
                  {item.summary}
                </p>

                {points.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex max-w-2xl gap-3 text-sm text-ink-muted"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent-dim" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.7rem] text-ink-faint"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
