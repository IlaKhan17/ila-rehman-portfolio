import { Section } from "@/components/site/section";
import { education, languages } from "@/content/skills";
import { cn } from "@/lib/utils";

export function EducationSection() {
  return (
    <Section id="education" label="education.md">
      <div className="space-y-4">
        {education.map((item) => (
          <article
            key={item.degree}
            className={cn(
              "rounded-card border p-5 sm:p-6",
              item.pivotal
                ? "border-accent-dim/60 bg-accent/[0.06]"
                : "border-line bg-surface/50",
            )}
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-medium text-ink">{item.degree}</h3>
              <span className="ml-auto font-mono text-xs text-ink-faint">
                {item.period}
              </span>
            </div>

            <p
              className={cn(
                "mt-1 font-mono text-xs",
                item.pivotal ? "text-accent-bright" : "text-ink-muted",
              )}
            >
              {item.field}
            </p>
            <p className="mt-1 text-sm text-ink-faint">{item.institution}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
              {item.note}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs text-ink-faint">
        Languages: {languages.join(" · ")}
      </p>
    </Section>
  );
}
