import { ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { contactLinks } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative bg-grid px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <SectionHeading
            id="contato-title"
            eyebrow="Contato"
            title="Vamos conversar"
            description="Me conte o problema em duas linhas. Se eu for a pessoa certa pra resolver, te respondo com um plano; se não for, te digo isso também."
          />

          <Stagger as="ul" className="mt-12 space-y-1" delay={0.15}>
            {contactLinks.map((link) => (
              <StaggerItem as="li" key={link.id}>
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={`${link.label}: ${link.display}`}
                    className="group flex flex-col items-start gap-1 border-b border-foreground/10 py-4 transition-colors duration-200 hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      {link.label}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-foreground sm:text-right">
                      <span>{link.display}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                ) : (
                  // TODO: preencher o `href` em data/site.ts para publicar este link.
                  <div className="flex flex-col items-start gap-1 border-b border-foreground/10 py-4 opacity-45 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <span className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                      {link.label}
                    </span>
                    <span className="text-sm text-muted">em breve</span>
                  </div>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="md:pt-24">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
