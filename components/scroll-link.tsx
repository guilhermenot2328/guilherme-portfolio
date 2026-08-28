"use client";

import { scrollToSection } from "@/components/lenis-provider";
import { cn } from "@/lib/utils";

type ScrollLinkProps = {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
};

const styles = {
  primary:
    "bg-accent text-accent-contrast hover:brightness-110 border border-transparent",
  ghost:
    "border border-foreground/16 text-foreground hover:border-foreground/40 hover:bg-foreground/5",
} as const;

/**
 * Âncora real (`href="#id"`) com scroll suave via Lenis.
 *
 * Continua sendo um link para o teclado, para o leitor de tela e para o
 * crawler; o handler só substitui o pulo nativo pela animação.
 */
export function ScrollLink({
  targetId,
  children,
  className,
  variant = "primary",
}: ScrollLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(targetId);
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,border-color,filter] duration-200",
        styles[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
