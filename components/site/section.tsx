import { cn } from "@/lib/utils";

/**
 * Shared section shell. The label is rendered as a file path, the one visual
 * borrowing from the terminal aesthetic that carries through the whole page.
 */
export function Section({
  id,
  label,
  title,
  children,
  className,
}: {
  id: string;
  label: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 border-t border-line py-16 sm:py-24", className)}
      aria-labelledby={`${id}-heading`}
    >
      <h2
        id={`${id}-heading`}
        className="mb-8 font-mono text-xs tracking-widest text-ink-faint"
      >
        <span className="text-accent-dim">~/</span>
        {label}
      </h2>

      {title && (
        <p className="mb-8 max-w-2xl text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {title}
        </p>
      )}

      {children}
    </section>
  );
}
