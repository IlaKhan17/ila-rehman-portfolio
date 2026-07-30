import { Section } from "@/components/site/section";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section
      id="contact"
      label="contact.sh"
      title={profile.availability + "."}
    >
      <p className="mb-8 max-w-2xl leading-relaxed text-ink-muted">
        The fastest way to reach me is email. If you are hiring for an AI
        Engineer role, send the job description and I will tell you honestly
        whether I am a fit.
      </p>

      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-md border border-accent-dim bg-accent/10 px-4 py-2.5 font-mono text-sm text-accent-bright transition-colors hover:bg-accent/20"
        >
          {profile.email}
        </a>

        {profile.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("/") ? undefined : "_blank"}
            rel="noreferrer"
            className="rounded-md border border-line px-4 py-2.5 font-mono text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            {link.label} ↗
          </a>
        ))}
      </div>

      <p className="mt-8 font-mono text-xs text-ink-faint">
        Based in {profile.location} · working remotely
      </p>
    </Section>
  );
}
