"use client";

import { useEffect, useState } from "react";

/**
 * Retorna o id da seção atualmente visível.
 *
 * Usa um único IntersectionObserver com `rootMargin` que reduz a viewport a
 * uma faixa central: a seção que cruza essa faixa é a ativa. Sem listener de
 * scroll, portanto sem trabalho por frame.
 */
export function useScrollSpy(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }

        // Mantém a ordem do documento para não "pular" quando duas seções
        // cruzam a faixa ao mesmo tempo.
        const current = ids.find((id) => visible.has(id)) ?? null;
        setActive(current);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
