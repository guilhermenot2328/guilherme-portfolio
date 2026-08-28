import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { LenisProvider } from "@/components/lenis-provider";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/data/site";

import "./globals.css";

/**
 * Fontes locais (self-hosted), pre-carregadas do mesmo dominio.
 * `adjustFontFallback` gera um fallback com metricas ajustadas, o que elimina
 * o reflow do swap — na pratica, nenhum salto de layout na troca da fonte.
 */
const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const jetbrains = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains",
  weight: "400 700",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const title = `${site.name} — ${site.role}`;
const description =
  "Desenvolvedor fullstack e especialista em automação com IA. Construo LLMs integradas, bots, RPA, MVPs e aplicações web e mobile que resolvem problema de negócio.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: `Portfólio de ${site.name}`,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  keywords: [
    "desenvolvedor fullstack",
    "automação com IA",
    "integração de LLM",
    "chatbot corporativo",
    "web scraping",
    "RPA",
    "Next.js",
    "TypeScript",
    "Python",
    "n8n",
    "Boituva",
    "São Paulo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: `${site.name} — Portfólio`,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrains.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-contrast"
        >
          Pular para o conteúdo
        </a>

        <LenisProvider>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main id="conteudo">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
