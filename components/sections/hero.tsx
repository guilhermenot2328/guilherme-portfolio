import { ArrowDownRight, Mail } from "lucide-react";

import { HeroCanvas } from "@/components/hero-canvas";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { ScrollLink } from "@/components/scroll-link";
import { WordReveal } from "@/components/word-reveal";
import { site } from "@/data/site";

/**
 * Hero — Server Component. Só as folhas interativas (canvas, word reveal,
 * âncoras com scroll suave, indicador) são "use client".
 *
 * O Pixelated Canvas é uma camada de fundo à direita, com máscara que o dissolve
 * na cor do fundo; o título ocupa a largura toda e passa por cima dele.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden bg-grid px-6 pb-24 pt-36 md:px-12"
    >
      {/* Camada de fundo: retrato pixelado, alinhado à direita. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 flex w-[78%] max-w-[300px] items-center justify-end pr-6 opacity-25 sm:w-[52%] sm:max-w-[560px] sm:opacity-70 md:pr-12 lg:opacity-100"
      >
        {/* pointer-events-auto só no canvas: a distorção precisa do mouse. */}
        <div className="pointer-events-auto w-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent_0%,black_45%,black_88%,transparent_100%),linear-gradient(to_bottom,transparent_0%,black_22%,black_78%,transparent_100%)]">
          <HeroCanvas />
        </div>
      </div>

      {/* Vinheta que apaga a malha e a borda do canvas nas extremidades. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_30%_50%,var(--background)_0%,transparent_45%,transparent_60%,var(--background)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-muted">
          <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />
          Disponível para novos projetos
        </p>

        <h1 id="hero-title" className="text-display font-semibold">
          <WordReveal text={site.name} />
        </h1>

        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted md:text-xl">
          <WordReveal text={site.role} stagger={0.045} />
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <ScrollLink targetId="projetos">
            Ver projetos
            <ArrowDownRight className="size-4" aria-hidden="true" />
          </ScrollLink>
          <ScrollLink targetId="contato" variant="ghost">
            <Mail className="size-4" aria-hidden="true" />
            Entrar em contato
          </ScrollLink>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <ScrollIndicator />
      </div>
    </section>
  );
}
