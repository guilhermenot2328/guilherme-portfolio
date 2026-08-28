"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Variants compartilhadas de entrada. Só `opacity` e `transform` — nunca
 * width/height/top/left — para o browser resolver tudo no compositor.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Viewport padrão: dispara uma vez só, um pouco antes do elemento entrar. */
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/** Reveal simples de um bloco. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = RevealProps & {
  stagger?: number;
  as?: "div" | "ul" | "section";
};

/** Container que escalona a entrada dos filhos marcados com <StaggerItem>. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  as = "div",
}: StaggerProps) {
  const Component = motion[as];

  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={container(stagger, delay)}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = motion[as];
  return (
    <Component variants={fadeUp} className={cn(className)}>
      {children}
    </Component>
  );
}
