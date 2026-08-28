"use client";

import { useCallback, useRef } from "react";

/** Amplitude máxima do tilt, em graus. */
const TILT = 5;

type ServiceCardProps = {
  title: string;
  description: string;
  /** Ícone renderizado no servidor e passado como slot (fica fora do bundle). */
  icon: React.ReactNode;
};

/**
 * Card com spotlight que segue o mouse e tilt 3D no hover.
 *
 * O pointermove escreve direto em custom properties CSS
 * (`--spot-x`, `--spot-y`, `--rx`, `--ry`): sem estado, sem re-render, e o
 * browser só recalcula `transform` e o gradiente do ::before.
 */
export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Posição do spotlight.
    element.style.setProperty("--spot-x", `${x}px`);
    element.style.setProperty("--spot-y", `${y}px`);

    // Tilt: -1..1 a partir do centro do card.
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;
    element.style.setProperty("--ry", `${px * TILT}deg`);
    element.style.setProperty("--rx", `${-py * TILT}deg`);
  }, []);

  const handleLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="spotlight-card group h-full rounded-2xl border border-foreground/10 bg-surface/40 p-8"
    >
      <div className="mb-6 grid size-11 place-items-center rounded-xl border border-foreground/10 text-accent transition-colors duration-200 group-hover:border-accent/40">
        {icon}
      </div>
      <h3 className="text-lg font-medium leading-snug tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
    </article>
  );
}
