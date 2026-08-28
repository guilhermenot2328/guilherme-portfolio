"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Barra fixa de progresso de scroll.
 * Anima apenas `scaleX` — sem tocar em width/left, portanto sem layout/paint.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%", willChange: "transform" }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-accent"
    />
  );
}
