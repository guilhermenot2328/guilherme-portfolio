import { AboutPhoto } from "@/components/about-photo";
import { Parallax } from "@/components/parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { technologies } from "@/data/site";

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-24">
        <div>
          <SectionHeading id="sobre-title" eyebrow="Sobre mim" title="Quem está do outro lado" />

          <Stagger className="mt-10 space-y-6" delay={0.1}>
            <StaggerItem>
              <p className="text-lg leading-relaxed text-muted">
                Estudante de <strong className="font-medium text-foreground">Ciência da
                Computação na FIAP</strong>, 19 anos, morando em Boituva (SP).
              </p>
            </StaggerItem>
            <StaggerItem>
              <p className="text-lg leading-relaxed text-muted">
                Sou muito bom em duas coisas:{" "}
                <strong className="font-medium text-foreground">resolver problemas</strong> e{" "}
                <strong className="font-medium text-foreground">comunicação</strong>. Traduzo
                problema de negócio em solução técnica sem enrolação — você entende o que está
                sendo construído, por que aquilo importa e o que muda no fim.
              </p>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.2} className="mt-12">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-muted">
              Stack
            </h3>
          </Reveal>

          <Stagger as="ul" stagger={0.04} className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <StaggerItem
                as="li"
                key={tech}
                className="rounded-full border border-foreground/12 px-4 py-1.5 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent/50 hover:text-foreground"
              >
                {tech}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.15} className="md:pt-16">
          <Parallax distance={32}>
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
                <AboutPhoto />
              </div>
              <figcaption className="mt-4 font-mono text-xs text-muted">
                Boituva, SP — Brasil
              </figcaption>
            </figure>
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
