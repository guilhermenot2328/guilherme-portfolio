"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "motion/react";

import aboutPhoto from "@/assets/guilherme-about.webp";

/**
 * Chromatic Image (WebGL) carregado sob demanda: shaders e setup de GL ficam
 * fora do bundle inicial e nunca rodam no servidor.
 */
const ChromaticImage = dynamic(
  () => import("@/components/ui/chromatic-image").then((m) => m.ChromaticImage),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-surface" />,
  },
);

const ALT =
  "Guilherme de camiseta branca e óculos escuros, sorrindo, apoiado no parapeito de uma ponte sobre um canal, com as fachadas de um parque temático ao fundo";

export function AboutPhoto() {
  const prefersReducedMotion = useReducedMotion();

  // Com movimento reduzido servimos a imagem estática via next/image —
  // sem canvas, sem loop de render, sem aberração cromática animada.
  if (prefersReducedMotion) {
    return (
      <Image
        src={aboutPhoto}
        alt={ALT}
        placeholder="blur"
        sizes="(max-width: 768px) 90vw, 420px"
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <ChromaticImage
      // O componente pinta uma textura WebGL, então precisa da URL crua do
      // asset (o next/image não expõe o bitmap final). O arquivo já vem
      // otimizado do script `npm run images` e é servido com hash imutável.
      src={aboutPhoto.src}
      alt={ALT}
      className="h-full w-full"
      backgroundColor="#0a0a0a"
      zoom={1.05}
      displacement={0.7}
      chromaticShift={0.012}
      tilt={4}
    />
  );
}
