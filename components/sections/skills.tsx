import { Section } from "@/components/site/section";
import { skills } from "@/content/skills";

/** Rendered as a JSON object — legible as data, and honest about its source. */
export function Skills() {
  return (
    <Section id="skills" label="skills.json">
      <div className="overflow-x-auto rounded-card border border-line bg-surface/50 p-5 font-mono text-sm sm:p-7">
        <p className="text-ink-faint">{"{"}</p>

        <dl>
          {skills.map((group) => (
            <div key={group.key} className="mt-3 pl-4 first:mt-2 sm:pl-6">
              <dt className="text-accent-bright">
                &quot;{group.key}&quot;
                <span className="text-ink-faint">: [</span>
              </dt>
              <dd className="pl-4 sm:pl-6">
                <ul className="flex flex-wrap gap-x-1.5 gap-y-1">
                  {group.items.map((item, index) => (
                    <li key={item} className="text-ink-muted">
                      &quot;{item}&quot;
                      {index < group.items.length - 1 && (
                        <span className="text-ink-faint">,</span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
              <p className="text-ink-faint">],</p>
            </div>
          ))}
        </dl>

        <p className="text-ink-faint">{"}"}</p>
      </div>
    </Section>
  );
}
