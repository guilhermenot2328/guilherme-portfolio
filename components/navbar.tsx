"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { ThemeToggle } from "@/components/theme-toggle";
import { scrollToSection } from "@/components/lenis-provider";
import { useScrollSpy } from "@/hooks/use-scrollspy";
import { navSections, site } from "@/data/site";
import { cn } from "@/lib/utils";

const sectionIds = navSections.map((section) => section.id);

export function Navbar() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const active = useScrollSpy(sectionIds);

  // Um único listener de MotionValue; só faz set quando o booleano vira.
  useMotionValueEvent(scrollY, "change", (value) => {
    setCondensed((previous) => (previous === value > 24 ? previous : value > 24));
  });

  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4">
      <motion.nav
        aria-label="Navegação principal"
        initial={false}
        animate={{ scale: condensed ? 0.97 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={cn(
          "flex w-full max-w-4xl items-center justify-between gap-2 rounded-full border px-3 py-2 transition-colors duration-300 md:gap-4 md:px-4",
          condensed
            ? "border-foreground/12 bg-background/70 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
        style={{ willChange: "transform" }}
      >
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="hidden rounded-full px-2 py-1 font-mono text-sm font-semibold tracking-tight sm:block"
        >
          {site.name}
          <span className="text-accent">.</span>
        </button>

        <ul className="flex items-center gap-0.5 md:gap-1">
          {navSections.map((section) => {
            const isActive = active === section.id;
            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-2.5 py-1.5 text-xs transition-colors duration-200 md:px-4 md:text-sm",
                    isActive ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/8"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => scrollToSection("contato")}
            className="hidden rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-85 md:inline-flex"
          >
            Contato
          </button>
        </div>
      </motion.nav>
    </header>
  );
}
