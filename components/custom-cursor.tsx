"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const RING = 32;
const DOT = 6;

/**
 * Cursor customizado (desktop apenas).
 *
 * - Some em touch/coarse pointer e com prefers-reduced-motion.
 * - Posicao vive em MotionValues: o ponteiro se move sem nenhum re-render do React.
 * - `mix-blend-difference` inverte o que estiver embaixo, sem custo de paint extra.
 */
export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const ringX = useSpring(x, { stiffness: 400, damping: 32, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 400, damping: 32, mass: 0.35 });
  const ringScale = useSpring(scale, { stiffness: 320, damping: 26 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Apenas apontadores precisos (mouse/trackpad) que suportam hover.
    const query = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!query.matches) return;

    setEnabled(true);

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea, select");
      scale.set(interactive ? 1.6 : 1);
    };

    const leave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [prefersReducedMotion, scale, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference">
      <motion.span
        style={{
          x: ringX,
          y: ringY,
          scale: ringScale,
          width: RING,
          height: RING,
          marginLeft: -RING / 2,
          marginTop: -RING / 2,
          willChange: "transform",
        }}
        className="absolute left-0 top-0 rounded-full border border-white/70"
      />
      <motion.span
        style={{
          x,
          y,
          width: DOT,
          height: DOT,
          marginLeft: -DOT / 2,
          marginTop: -DOT / 2,
          willChange: "transform",
        }}
        className="absolute left-0 top-0 rounded-full bg-white"
      />
    </div>
  );
}
