/**
 * Dados globais do site. Edite aqui nome, bio, links sociais e SEO.
 */

export const site = {
  name: "Guilherme",
  fullName: "Guilherme Alves Nunes",
  role: "Desenvolvedor Fullstack & Automação com IA",
  shortBio:
    "Estudante de Ciência da Computação na FIAP. Transformo problema de negócio em software que funciona.",
  location: "Boituva, São Paulo — Brasil",
  locality: "Boituva",
  region: "SP",
  country: "BR",
  // Fallback usado quando NEXT_PUBLIC_SITE_URL não está definida.
  // Alimenta metadata, sitemap, robots e JSON-LD — troque se migrar de domínio.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://guilherme-port.netlify.app",
} as const;

/**
 * Links de contato.
 * `href: null` esconde o item da UI — preencha para publicá-lo.
 */
export type ContactLink = {
  id: string;
  label: string;
  /** Texto exibido ao lado do label. */
  display: string;
  href: string | null;
  /**
   * URL de perfil público, elegível para o `sameAs` do JSON-LD.
   * E-mail e WhatsApp ficam de fora: são canais de contato, não perfis.
   */
  profile?: boolean;
};

export const contactLinks: ContactLink[] = [
  {
    id: "email",
    label: "E-mail",
    display: "guilherme.alves.nunes.1227@gmail.com",
    href: "mailto:guilherme.alves.nunes.1227@gmail.com",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    display: "(15) 99837-7466",
    // Formato internacional sem símbolos: 55 (Brasil) + 15 (DDD) + número.
    href: "https://wa.me/5515998377466",
  },
  {
    id: "github",
    label: "GitHub",
    display: "github.com/guilhermenot2328",
    href: "https://github.com/guilhermenot2328",
    profile: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    display: "in/guilherme-nunes",
    href: "https://www.linkedin.com/in/guilherme-nunes-98a5b7420/",
    profile: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    display: "@guilherme.alves.nunes",
    href: "https://www.instagram.com/guilherme.alves.nunes/",
    profile: true,
  },
];

/** E-mail usado no fallback `mailto:` do formulário de contato. */
export const contactEmail =
  contactLinks.find((link) => link.id === "email")?.display ??
  "guilherme.alves.nunes.1227@gmail.com";

/** Tecnologias exibidas como badges na seção "Sobre mim". */
export const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Prisma",
  "n8n",
  "Docker",
  "Tailwind CSS",
  "LangChain",
] as const;

/** Seções que a navbar lista e o scrollspy observa. */
export const navSections = [
  { id: "sobre", label: "Sobre" },
  { id: "servicos", label: "Serviços" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;
