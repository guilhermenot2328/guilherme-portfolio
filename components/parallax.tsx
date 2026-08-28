"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Deslocamento total em px ao longo da travessia pela viewport. */
  distance?: number;
};

/**
 * Parallax sutil em `translateY`.
 *
 * Só transform — nada de `top`/`background-position`. Com movimento reduzido
 * o wrapper vira um <div> comum, sem MotionValue nem trabalho por frame.
 */
export function Parallax({ children, className, distance = 48 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (prefersReducedMotion) {
    // Mantém o ref anexado para o useScroll acima nunca ficar sem alvo.
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}
