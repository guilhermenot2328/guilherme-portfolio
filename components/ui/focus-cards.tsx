"use client";

/**
 * Focus Cards — Aceternity UI.
 * Base: https://ui.aceternity.com/components/focus-cards
 *
 * A mecânica original está preservada: um único estado `hovered` no pai e
 * `blur-sm scale-[0.98]` em todos os cards que não são o ativo.
 *
 * Adaptações feitas para este portfólio (padrão shadcn — você é dono do código
 * depois de instalar):
 *  - `card` tipado como Project, com href, description, stack e image;
 *  - <img> trocado por next/image (blur placeholder, sizes, lazy);
 *  - card vira <a target="_blank" rel="noopener noreferrer"> quando há href;
 *  - onFocus/onBlur além do mouse, para o efeito funcionar no teclado;
 *  - placeholder com gradiente quando o projeto ainda não tem print.
 */

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Project;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const isActive = hovered === index;
    const Wrapper = card.href ? "a" : "div";

    return (
      <Wrapper
        {...(card.href
          ? {
              href: card.href,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": `${card.title} — abrir projeto em nova aba`,
            }
          : {})}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(index)}
        onBlur={() => setHovered(null)}
        className={cn(
          "group relative block h-80 w-full overflow-hidden rounded-2xl border border-foreground/10 bg-surface transition-all duration-300 ease-out md:h-96",
          hovered !== null && !isActive && "scale-[0.98] blur-sm",
        )}
      >
        {card.image ? (
          <Image
            src={card.image}
            alt={`Interface do projeto ${card.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            className="absolute inset-0 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          // TODO: adicionar print — coloque o arquivo em `images/`, rode
          // `npm run images` e aponte `image` em data/projects.ts.
          <div
            aria-hidden="true"
            className="placeholder-gradient absolute inset-0"
          />
        )}

        {/* Gradiente permanente para o texto ter contraste sobre a imagem. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-medium tracking-tight text-neutral-50 md:text-2xl">
              {card.title}
            </h3>
            {card.href && (
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 shrink-0 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            )}
          </div>

          {/* Descrição e chips entram só no card em foco. */}
          <div
            className={cn(
              "grid transition-all duration-300 ease-out",
              isActive ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <p className="text-sm leading-relaxed text-neutral-300">{card.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {card.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-300"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  },
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      {cards.map((card, index) => (
        <Card
          key={card.slug}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
