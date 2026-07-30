import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-8 font-mono text-xs text-ink-faint sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="ml-auto flex flex-wrap gap-x-4 gap-y-2">
          {profile.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("/") ? undefined : "_blank"}
                rel="noreferrer"
                className="transition-colors hover:text-accent-bright"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
