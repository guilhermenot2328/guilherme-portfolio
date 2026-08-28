import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Rótulo curto em mono, acima do título. */
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
  className?: string;
};

/** Cabeçalho padrão das seções, para manter ritmo e hierarquia consistentes. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-muted">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-headline text-balance font-semibold">
        {title}
      </h2>
      {description && (
        <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">{description}</p>
      )}
    </Reveal>
  );
}
