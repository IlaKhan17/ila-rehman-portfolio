import { Section } from "@/components/site/section";
import { about } from "@/content/profile";

export function About() {
  return (
    <Section id="about" label="about.md">
      <div className="max-w-2xl space-y-5">
        {about.map((paragraph, index) => (
          <p
            key={index}
            className={
              index === 0
                ? "text-xl leading-relaxed text-ink sm:text-2xl"
                : "leading-relaxed text-ink-muted"
            }
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
