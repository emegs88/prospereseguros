"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { whatsappLink } from "@/lib/whatsapp";

// ─────────────────────────────────────────────────────────────────────────
//  FAQ — tira objeções e melhora SEO (rich results de FAQPage).
// ─────────────────────────────────────────────────────────────────────────

interface QA {
  pergunta: string;
  resposta: string;
}

const PERGUNTAS: QA[] = [
  {
    pergunta: "Quanto custa fazer a cotação?",
    resposta:
      "Nada. A cotação e a comparação são 100% gratuitas e sem compromisso. Você só paga se decidir contratar uma das apólices.",
  },
  {
    pergunta: "Em quanto tempo recebo as cotações?",
    resposta:
      "Em cerca de 2 minutos. Você responde algumas perguntas rápidas e nós comparamos as 8 maiores seguradoras do Brasil lado a lado, na mesma tela.",
  },
  {
    pergunta: "A Prospere é uma corretora registrada?",
    resposta:
      "Sim. Somos a Prospere Corretora de Seguros Ltda (CNPJ 67.212.573/0001-50), registrada na SUSEP, com mais de 23 anos de experiência no mercado.",
  },
  {
    pergunta: "Com quais seguradoras vocês trabalham?",
    resposta:
      "Trabalhamos com as maiores do país: Porto Seguro, Bradesco, Allianz, HDI, Tokio Marine, SulAmérica, Azul Seguros e Youse — sempre buscando a melhor proteção pelo melhor preço.",
  },
  {
    pergunta: "Posso falar com uma pessoa de verdade?",
    resposta:
      "Com certeza. Apesar de tudo ser online, nosso atendimento é humano. Fale com a Carla e a equipe pelo WhatsApp a qualquer momento — antes, durante ou depois da contratação.",
  },
  {
    pergunta: "Que tipos de seguro a Prospere cota?",
    resposta:
      "Auto, moto, vida, residencial, viagem, celular, empresarial e pet — além de praticamente qualquer outro ramo (condomínio, garantia, rural, frota e mais). É só perguntar.",
  },
];

export function FAQ() {
  // JSON-LD para rich results de FAQ no Google.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((q) => ({
      "@type": "Question",
      name: q.pergunta,
      acceptedAnswer: { "@type": "Answer", text: q.resposta },
    })),
  };

  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-blue">
            Ainda com dúvidas?
          </p>
          <h2 className="mt-3 font-condensed text-3xl font-extrabold uppercase md:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion.Root
            type="single"
            collapsible
            className="space-y-3"
            defaultValue="item-0"
          >
            {PERGUNTAS.map((q, i) => (
              <Accordion.Item
                key={q.pergunta}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-card"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-zinc-900 transition hover:text-prospere-blue">
                    {q.pergunta}
                    <ChevronDown
                      size={20}
                      className="shrink-0 text-prospere-blue transition-transform duration-300 group-data-[state=open]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-600">
                    {q.resposta}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <a
            href={whatsappLink({
              origem: "faq",
              mensagemLivre:
                "Olá! Vim pelo site da Prospere e tenho uma dúvida. Podem me ajudar?",
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-prospere-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-prospere-blue/25 transition hover:brightness-110"
          >
            <MessageCircle size={18} />
            Ainda tem dúvida? Fale com a gente
          </a>
        </Reveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
