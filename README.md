# Portfólio — Guilherme

Site de portfólio pessoal em Next.js (App Router) + TypeScript + Tailwind CSS v4,
com componentes da [Aceternity UI](https://ui.aceternity.com) e animações em
[Motion](https://motion.dev). Estética escura, minimalista e técnica.

---

## Rodando localmente

```bash
npm install
```

```bash
npm run dev
```

Abre em <http://localhost:3000>.

Scripts disponíveis:

| Script              | O que faz                                                     |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                                    |
| `npm run build`     | Build de produção (roda ESLint + typecheck)                    |
| `npm run start`     | Sobe o build de produção                                       |
| `npm run typecheck` | Só o TypeScript, sem emitir arquivos                           |
| `npm run lint`      | ESLint                                                         |
| `npm run images`    | Otimiza as fotos de `images/` e gera os `.webp` em `assets/`    |

---

## Trocando as imagens

O fluxo tem duas pastas:

- **`images/`** — os **originais** (JPG/PNG direto do celular ou câmera). Nada aqui vai para o site.
- **`assets/`** — os **`.webp` otimizados** que os componentes realmente importam. Gerados pelo script, não edite à mão.

Para trocar uma foto:

1. Coloque o arquivo novo em `images/`.
2. Abra [`scripts/optimize-images.mjs`](scripts/optimize-images.mjs) e ajuste a entrada
   correspondente no `MANIFEST` (`source` = nome do arquivo; `crop` = recorte em pixels
   sobre o original — remova o `crop` para usar a imagem inteira).
3. Rode:

```bash
npm run images
```

O script converte para `.webp`, limita a largura a **1600px** e imprime o tamanho final de cada arquivo.
Qualquer imagem em `images/` que não esteja no `MANIFEST` também vira `.webp` automaticamente, sem recorte.

**Onde cada imagem aparece:**

| Arquivo em `assets/`   | Usado em                                                   |
| ---------------------- | ---------------------------------------------------------- |
| `guilherme-hero.webp`  | Hero — Pixelated Canvas ([`components/hero-canvas.tsx`](components/hero-canvas.tsx)) |
| `guilherme-about.webp` | Sobre mim — Chromatic Image ([`components/about-photo.tsx`](components/about-photo.tsx)) |

As imagens são importadas **estaticamente** (`import foto from "@/assets/..."`), então o
`next/image` gera `width`, `height` e o `blurDataURL` do `placeholder="blur"` sozinho.

---

## Editando os projetos

Tudo em [`data/projects.ts`](data/projects.ts). Cada item é tipado como `Project`:

```ts
{
  slug: "smallord",              // key estável
  title: "SmallLord",
  description: "1–2 linhas.",
  stack: ["Next.js", "TypeScript"],  // vira chips no card
  href: "https://smallord.com",      // null = card não clicável
  image: null,                       // null = placeholder com gradiente
}
```

- **Adicionar um projeto:** há dois slots comentados no fim do arquivo — descomente e preencha.
- **Adicionar um print:** siga o fluxo de imagens acima, depois importe no topo do arquivo
  (`import print from "@/assets/project-smallord.webp"`) e troque `image: null` por `image: print`.
- O **primeiro projeto da lista** também alimenta o "monitor" do Container Scroll Animation
  logo abaixo do hero.

### Outros pontos de edição

| Arquivo                                  | O que tem lá                                              |
| ---------------------------------------- | --------------------------------------------------------- |
| [`data/site.ts`](data/site.ts)           | Nome, cargo, bio, localização, **links de contato**, stack, seções da navbar |
| [`data/services.ts`](data/services.ts)   | Os 8 serviços (título, descrição, ícone do lucide)         |
| [`app/globals.css`](app/globals.css)     | Tokens de cor, tipografia e a cor de acento                |

> **Pendências marcadas com `TODO:` no código** — busque por `TODO:` para achar todas.
> As que restam: o domínio real em `data/site.ts`, os links de *Sketch to Image Agent*
> e *Shorts Clipper*, e os prints dos três projetos.
>
> Os links de contato (e-mail, WhatsApp, GitHub, LinkedIn, Instagram) já estão
> preenchidos em `data/site.ts`. Qualquer link novo com `href: null` aparece como
> "em breve"; marque `profile: true` só em URLs de perfil público (elas entram no
> `sameAs` do JSON-LD).

---

## Formulário de contato

Por padrão o formulário abre o cliente de e-mail via `mailto:`, usando o endereço
definido em `data/site.ts`.

Para enviar via HTTP em vez disso, crie um `.env.local` (veja [`.env.example`](.env.example)):

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://seu-endpoint/contato
```

Com a variável preenchida, o formulário faz `POST` de `{ name, email, message }` em JSON.
Sem ela, cai no `mailto:` automaticamente. Validação com `react-hook-form` + `zod`.

---

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Em <https://vercel.com/new>, importe o repositório. A Vercel detecta o Next.js sozinho —
   não precisa mudar build command nem output directory.
3. Em **Settings → Environment Variables**, adicione:
   - `NEXT_PUBLIC_SITE_URL` — a URL final (ex.: `https://guilherme.dev`). Ela alimenta o
     `metadataBase`, o `sitemap.xml`, o `robots.txt` e o JSON-LD.
   - `NEXT_PUBLIC_CONTACT_ENDPOINT` — só se você for usar um endpoint de contato.
4. Deploy. Para domínio próprio: **Settings → Domains**.

Depois do primeiro deploy, atualize também o campo `url` em `data/site.ts` (ele é o fallback
quando a env var não está definida).

---

## Estrutura

```
app/
  layout.tsx            metadata, fontes locais, providers, JSON-LD
  page.tsx              composição das seções + JSON-LD do tipo Person
  globals.css           tokens de design, utilitários, reduced-motion
  fonts/                Inter e JetBrains Mono variáveis (.woff2, self-hosted)
  icon.tsx              favicon gerado no build
  opengraph-image.tsx   card de OG/Twitter gerado no build
  sitemap.ts robots.ts

components/
  ui/                   componentes da Aceternity (instalados do registry)
  sections/             hero, scroll-showcase, about, services, projects, contact
  navbar · footer · scroll-progress · custom-cursor · lenis-provider
  theme-script · theme-toggle · reveal · word-reveal · parallax
  service-card · hero-canvas · about-photo · scroll-link · scroll-indicator

data/       site.ts · projects.ts · services.ts
hooks/      use-scrollspy.ts
lib/        utils.ts (cn)
scripts/    optimize-images.mjs
images/     originais    ·    assets/  .webp otimizados
```

### Componentes da Aceternity

Instalados a partir do registry oficial (`https://ui.aceternity.com/registry/<nome>.json`) —
o mesmo código que o `npx shadcn@latest add @aceternity/<nome>` grava:

- `focus-cards` — grid de projetos (os outros cards desfocam no hover)
- `pixelated-canvas` — retrato do hero com distorção no mouse
- `container-scroll-animation` — "monitor" 3D que rotaciona no eixo X
- `chromatic-image` — foto da seção Sobre, com aberração cromática em WebGL

Três estão **verbatim**. `focus-cards.tsx` foi estendido (padrão shadcn: o código é seu depois
de instalar) para aceitar link, `next/image`, descrição e chips de stack — as alterações estão
listadas no comentário do topo do arquivo, e a mecânica original de hover/blur está intacta.

---

## Decisões de performance

- **Server Components por padrão.** `"use client"` só nas folhas com interação. Os ícones do
  lucide são renderizados no servidor e passados como slot, então ficam fora do bundle do cliente.
- **Animações só em `transform` e `opacity`.** Nada de `width`/`height`/`top`/`left`.
- **Spotlight dos cards de serviço** é escrito em custom properties CSS direto no elemento —
  o React não re-renderiza no `pointermove`.
- **Pixelated Canvas e Chromatic Image** entram por `next/dynamic` com `ssr: false`: são
  puramente visuais e client-only. O **Focus Cards não** usa `ssr: false` de propósito — os
  títulos e links dos projetos precisam estar no HTML para o crawler.
- **Fontes locais** self-hosted e pré-carregadas, com `adjustFontFallback` para não haver
  reflow na troca da fonte.
- **`prefers-reduced-motion`** desliga Lenis, cursor customizado, parallax e a distorção do
  canvas; o `MotionConfig reducedMotion="user"` cobre o resto.
- **Dark mode sem flash:** o SSR já entrega `<html class="dark">` e um script inline no
  `<head>` só remove a classe se o usuário tiver escolhido o tema claro.
