import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { FocusCards } from "@/components/ui/focus-cards";
import { projects } from "@/data/projects";

/**
 * Projetos — Focus Cards (Aceternity).
 *
 * Nota sobre `next/dynamic` + `ssr: false`: aqui NÃO faz sentido. O conteúdo
 * dos cards (títulos, descrições e links dos projetos) é justamente o que os
 * crawlers precisam ver, e o efeito é só CSS de hover — não há canvas nem
 * WebGL para adiar. O componente já é client, então o Next o separa em chunk
 * próprio automaticamente, sem abrir mão do HTML no servidor.
 */
export function Projects() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="relative px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="projetos-title"
          eyebrow="Projetos"
          title="Coisas que eu coloquei de pé"
          description="Toque ou passe o mouse para focar um card. Cada um abre o projeto em uma nova aba."
        />

        <Reveal delay={0.1} className="mt-16">
          <FocusCards cards={projects} />
        </Reveal>
      </div>
    </section>
  );
}
