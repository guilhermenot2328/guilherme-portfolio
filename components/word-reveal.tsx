"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.1 },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type WordRevealProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  /** Anima ao entrar na viewport em vez de na montagem. */
  onView?: boolean;
};

/**
 * Revela um texto palavra por palavra.
 *
 * Acessibilidade: o texto completo vai num `sr-only` e toda a árvore animada é
 * `aria-hidden`. Assim o leitor de tela lê uma frase só, em vez de N fragmentos
 * — e sem recorrer a `aria-label` em <span>, que é atributo proibido em
 * elemento sem role.
 */
export function WordReveal({
  text,
  className,
  wordClassName,
  stagger = 0.06,
  onView = false,
}: WordRevealProps) {
  const words = text.split(" ");

  const animationProps = onView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -15% 0px" } }
    : { animate: "show" };

  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>

      <motion.span
        aria-hidden="true"
        initial="hidden"
        custom={stagger}
        variants={container}
        className="inline-block"
        {...animationProps}
      >
        {words.map((value, index) => (
          <span
            key={`${value}-${index}`}
            // O espaço entre palavras vem da margin: whitespace do JSX some
            // entre elementos inline-block.
            className="inline-block overflow-hidden align-bottom [&:not(:last-child)]:mr-[0.24em]"
          >
            <motion.span
              variants={word}
              className={cn("inline-block will-change-[transform,opacity]", wordClassName)}
            >
              {value}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
