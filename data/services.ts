import {
  Bot,
  BrainCircuit,
  Radar,
  Rocket,
  Smartphone,
  SquareCode,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "llm",
    title: "Integração de LLMs e Chatbots Corporativos",
    description:
      "Assistentes que respondem com base nos seus dados, não em achismo. Menos fila no suporte e resposta em segundos, 24/7.",
    Icon: BrainCircuit,
  },
  {
    id: "scraping",
    title: "Automação de coleta de dados",
    description:
      "Web scraping e crawling resilientes que entregam preço de concorrente, lead e catálogo já limpos e prontos para decisão.",
    Icon: Radar,
  },
  {
    id: "rpa",
    title: "Automatização de processos internos",
    description:
      "RPA para o trabalho repetitivo que hoje consome sua equipe. Devolvo horas por semana e corto o erro manual.",
    Icon: Workflow,
  },
  {
    id: "bots",
    title: "Desenvolvimento de Bots",
    description:
      "Bots de WhatsApp, Telegram e Discord que qualificam, agendam e notificam sozinhos — sem ninguém olhando a tela.",
    Icon: Bot,
  },
  {
    id: "apis",
    title: "Integração de APIs e Webhooks",
    description:
      "Conecto ERP, CRM e gateway de pagamento para os sistemas conversarem entre si. Fim da planilha de transporte entre setores.",
    Icon: Webhook,
  },
  {
    id: "mvp",
    title: "Criação de MVPs para Startups",
    description:
      "Do escopo ao produto no ar em semanas, não em meses. Você valida a hipótese com usuário real antes de queimar caixa.",
    Icon: Rocket,
  },
  {
    id: "web",
    title: "Desenvolvimento web fullstack",
    description:
      "Aplicações rápidas e escaláveis do banco ao pixel, com performance e SEO tratados desde a primeira linha.",
    Icon: SquareCode,
  },
  {
    id: "mobile",
    title: "Desenvolvimento mobile",
    description:
      "Apps iOS e Android com uma base de código só. Menos custo de manutenção e a mesma experiência nas duas lojas.",
    Icon: Smartphone,
  },
];
