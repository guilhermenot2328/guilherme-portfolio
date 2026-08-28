"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig, useReducedMotion } from "motion/react";

/**
 * Instancia ativa do Lenis. Guardada em modulo (e nao em contexto) porque
 * apenas handlers imperativos precisam dela — assim nenhum componente
 * re-renderiza por causa do scroll suave.
 */
let lenisInstance: Lenis | null = null;

/** Altura da navbar fixa, descontada ao rolar ate uma seção. */
const NAV_OFFSET = -80;

/**
 * Rola suavemente ate um id de seção. Cai no scroll nativo quando o Lenis
 * esta desligado (prefers-reduced-motion) ou ainda nao montou.
 */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset: NAV_OFFSET, duration: 1.1 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Com movimento reduzido o scroll suave e desligado por completo:
    // o navegador volta a controlar a rolagem.
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.095,
      smoothWheel: true,
      // Em touch o scroll nativo e melhor (mais responsivo e sem travar o gesto).
      syncTouch: false,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [prefersReducedMotion]);

  // `reducedMotion="user"` faz o Motion ignorar animacoes de transform quando
  // o sistema pede movimento reduzido, sem precisar de guarda em cada componente.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
