"use client";

import { motion } from "motion/react";

/**
 * Indicador de scroll no rodapé do hero.
 * Anima só `y` e `opacity` (compositor puro); some com movimento reduzido
 * por conta do MotionConfig global.
 */
export function ScrollIndicator() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex flex-col items-center gap-3"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted">
        Scroll
      </span>
      <span className="relative flex h-10 w-[22px] justify-center rounded-full border border-foreground/20 pt-2">
        <motion.span
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-1.5 w-1 rounded-full bg-accent will-change-transform"
        />
      </span>
    </motion.div>
  );
}
