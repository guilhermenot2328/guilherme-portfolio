"use client";

import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

/**
 * Toggle claro/escuro persistido em localStorage.
 *
 * O estado inicial e lido do DOM (a classe ja foi definida por ThemeScript
 * antes da hidratacao), entao o botao nunca renderiza o icone errado.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {
        // localStorage indisponivel (modo privado): o tema so nao persiste.
      }
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-foreground/12 text-muted transition-colors duration-200 hover:border-accent/60 hover:text-foreground"
    >
      {/* Antes de montar, renderiza o icone do tema padrao (dark) para casar com o SSR. */}
      {mounted && theme === "light" ? (
        <Moon className="size-4" aria-hidden="true" />
      ) : (
        <Sun className="size-4" aria-hidden="true" />
      )}
    </button>
  );
}
