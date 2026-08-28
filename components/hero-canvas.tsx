"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

import heroPhoto from "@/assets/guilherme-hero.webp";

/**
 * O PixelatedCanvas é pesado (lê ImageData e redesenha por frame) e é 100%
 * client-side, então entra por `next/dynamic` com `ssr: false` — fica fora do
 * bundle inicial e não bloqueia o HTML do hero.
 */
const PixelatedCanvas = dynamic(
  () => import("@/components/ui/pixelated-canvas").then((m) => m.PixelatedCanvas),
  { ssr: false },
);

/** Teto de resolução: mais que isso vira custo de CPU sem ganho visual. */
const MAX_WIDTH = 560;
const ASPECT = 850 / 680; // proporção do recorte gerado em assets/

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // O componente da Aceternity recebe width/height em pixels, então medimos o
  // container e repassamos. ResizeObserver evita listener de resize no window.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let frame = 0;
    const observer = new ResizeObserver((entries) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const width = Math.min(Math.round(entries[0].contentRect.width), MAX_WIDTH);
        if (width <= 0) return;
        setSize({ width, height: Math.round(width * ASPECT) });
      });
    });

    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Reserva a altura antes do canvas montar: nada de layout shift. */}
      <div style={{ aspectRatio: `${680} / ${850}` }} className="w-full">
        {size && (
          <PixelatedCanvas
            src={heroPhoto.src}
            width={size.width}
            height={size.height}
            // Célula maior = menos dots por frame. 4px mantém o rosto legível
            // e derruba o custo por frame frente ao default de 3px.
            cellSize={4}
            dotScale={0.88}
            shape="square"
            // String vazia = o componente usa clearRect em vez de fillRect, ou
            // seja, canvas transparente. Assim os dots compoem sobre o fundo da
            // secao e o hero funciona nos dois temas sem repintar nada.
            backgroundColor=""
            // Dropout alto derruba os dots de baixo contraste: o fundo do parque
            // some e sobra o retrato, que e o que interessa.
            dropoutStrength={0.38}
            // Com movimento reduzido o canvas vira imagem estática.
            interactive={!prefersReducedMotion}
            distortionMode="repel"
            distortionStrength={5}
            distortionRadius={110}
            followSpeed={0.18}
            jitterStrength={3}
            jitterSpeed={2.5}
            sampleAverage
            tintColor="#cdff4a"
            tintStrength={0.1}
            maxFps={60}
            fadeOnLeave
            fadeSpeed={0.08}
            objectFit="cover"
            className="h-full w-full"
          />
        )}
      </div>
    </div>
  );
}
