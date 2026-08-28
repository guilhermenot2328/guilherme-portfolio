import Image from "next/image";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { projects } from "@/data/projects";

/**
 * Container Scroll Animation da Aceternity: o "monitor" rotaciona no eixo X
 * conforme o scroll. Server Component — o componente da UI já é client.
 */
export function ScrollShowcase() {
  // Mostra o print do projeto principal assim que ele existir em data/projects.
  const featured = projects[0];

  return (
    <section aria-labelledby="showcase-title" className="relative -mt-24 md:-mt-32">
      <ContainerScroll
        titleComponent={
          <div className="mb-6">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-muted">
              O que eu faço
            </p>
            <h2
              id="showcase-title"
              className="text-headline text-balance font-semibold text-foreground"
            >
              Transformo ideias em{" "}
              <span className="text-accent">produtos que funcionam</span>
            </h2>
          </div>
        }
      >
        {featured.image ? (
          <Image
            src={featured.image}
            alt={`Interface do projeto ${featured.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 1024px"
            placeholder="blur"
            className="rounded-2xl object-cover object-left-top"
          />
        ) : (
          // TODO: adicionar print do SmallLord em `images/`, rodar `npm run images`
          // e apontar `image` em data/projects.ts para o .webp gerado.
          <div className="placeholder-gradient relative flex h-full w-full items-center justify-center rounded-2xl">
            <div className="px-8 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                {featured.title}
              </p>
              <p className="mt-4 max-w-md text-sm text-muted">{featured.description}</p>
            </div>
          </div>
        )}
      </ContainerScroll>
    </section>
  );
}
