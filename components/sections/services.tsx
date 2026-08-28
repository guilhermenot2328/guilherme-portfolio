import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { Stagger, StaggerItem } from "@/components/reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="relative px-6 py-32 md:px-12 md:py-40"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="O que eu construo pra você"
          description="Da automação que devolve horas da sua semana ao produto que vai pro ar e vende. Sempre com o resultado no centro, não a tecnologia."
        />

        <Stagger
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {services.map(({ id, title, description, Icon }) => (
            <StaggerItem key={id} className="h-full">
              <ServiceCard
                title={title}
                description={description}
                // O ícone é renderizado no servidor e chega como slot pronto,
                // então o código do lucide não vai para o bundle do cliente.
                icon={<Icon className="size-5" aria-hidden="true" strokeWidth={1.5} />}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
