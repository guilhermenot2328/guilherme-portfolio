import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { ScrollShowcase } from "@/components/sections/scroll-showcase";
import { Services } from "@/components/sections/services";
import { projects } from "@/data/projects";
import { contactLinks, site, technologies } from "@/data/site";

/** JSON-LD do tipo Person, para o Google entender de quem é o site. */
function personJsonLd() {
  // Só perfis públicos entram no sameAs — e-mail e WhatsApp são canais de
  // contato, não identidades da pessoa em outra plataforma.
  const sameAs = contactLinks
    .filter((link) => link.profile && link.href)
    .map((link) => link.href);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    jobTitle: site.role,
    description: site.shortBio,
    url: site.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.locality,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "FIAP — Faculdade de Informática e Administração Paulista",
    },
    knowsAbout: [...technologies],
    ...(sameAs.length > 0 && { sameAs }),
    ...(projects.some((project) => project.href) && {
      subjectOf: projects
        .filter((project) => project.href)
        .map((project) => ({
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: project.href,
        })),
    }),
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Conteúdo estático montado a partir de data/, sem entrada de usuário.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <Hero />
      <ScrollShowcase />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}
