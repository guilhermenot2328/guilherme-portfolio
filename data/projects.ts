import type { StaticImageData } from "next/image";

export type Project = {
  /** Identificador estável (usado como key e âncora). */
  slug: string;
  title: string;
  /** 1–2 linhas, focadas no que o projeto resolve. */
  description: string;
  /** Chips de tecnologia exibidos no card. */
  stack: string[];
  /** Link externo. `null` renderiza o card sem âncora (não clicável). */
  href: string | null;
  /**
   * Print do projeto. Importe estaticamente de `@/assets/...` para o next/image
   * gerar width/height e o blurDataURL automaticamente.
   * `null` cai no placeholder com gradiente.
   */
  image: StaticImageData | null;
};

export const projects: Project[] = [
  {
    slug: "smallord",
    title: "SmallLord",
    description:
      "SaaS de gestão de aluguéis, contratos e manutenções para pequenos proprietários de 1 a 10 unidades.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe"],
    href: "https://smallord.com",
    // TODO: adicionar print — salve em `images/` e importe o .webp gerado de `@/assets/`.
    image: null,
  },
  {
    slug: "sketch-to-image-agent",
    title: "Sketch to Image Agent",
    description:
      "Agente de IA que transforma esboços em imagens ultrarrealistas, com controle fino de parâmetros de câmera como distância focal e abertura.",
    stack: ["Python", "diffusers", "ControlNet", "FastAPI", "PyTorch"],
    // TODO: adicionar link (repositório ou demo).
    href: null,
    // TODO: adicionar print — salve em `images/` e importe o .webp gerado de `@/assets/`.
    image: null,
  },
  {
    slug: "shorts-clipper",
    title: "Shorts Clipper",
    description:
      "Recebe URLs de vídeo e extrai automaticamente os melhores momentos já cortados em formato short.",
    stack: ["Python", "FFmpeg", "Whisper", "Next.js"],
    // TODO: adicionar link (repositório ou demo).
    href: null,
    // TODO: adicionar print — salve em `images/` e importe o .webp gerado de `@/assets/`.
    image: null,
  },

  // ---------------------------------------------------------------------------
  // Slots reservados. Descomente e preencha para publicar mais dois projetos.
  // ---------------------------------------------------------------------------
  // {
  //   slug: "projeto-4",
  //   title: "TODO: título do projeto",
  //   description: "TODO: descrição curta em 1–2 linhas.",
  //   stack: ["TODO"],
  //   href: null,
  //   image: null,
  // },
  // {
  //   slug: "projeto-5",
  //   title: "TODO: título do projeto",
  //   description: "TODO: descrição curta em 1–2 linhas.",
  //   stack: ["TODO"],
  //   href: null,
  //   image: null,
  // },
];
