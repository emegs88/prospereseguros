import { Star, Quote } from "lucide-react";
import { Reveal, StaggerGroup, RevealItem } from "@/components/ui/reveal";

// ─────────────────────────────────────────────────────────────────────────
//  Depoimentos de clientes — prova social.
//  Conteúdo ilustrativo; substituir por avaliações reais (Google/Instagram).
// ─────────────────────────────────────────────────────────────────────────

interface Depoimento {
  nome: string;
  cidade: string;
  ramo: string;
  texto: string;
  iniciais: string;
}

const DEPOIMENTOS: Depoimento[] = [
  {
    nome: "Mariana Souza",
    cidade: "Hortolândia/SP",
    ramo: "Seguro Auto",
    iniciais: "MS",
    texto:
      "Cotei meu seguro de carro em menos de 5 minutos e economizei quase R$ 600 no ano. A Carla me explicou tudo com calma. Atendimento nota 10!",
  },
  {
    nome: "Roberto Almeida",
    cidade: "Campinas/SP",
    ramo: "Seguro Residencial",
    iniciais: "RA",
    texto:
      "Comparei 8 seguradoras numa tela só. Achei a cobertura ideal pra minha casa sem ter que ligar pra ninguém. Recomendo demais a Prospere.",
  },
  {
    nome: "Juliana Ferreira",
    cidade: "Sumaré/SP",
    ramo: "Seguro Vida",
    iniciais: "JF",
    texto:
      "Profissionais de verdade. Senti que estavam cuidando da minha família, não só vendendo. Tranquilidade que não tem preço.",
  },
];

export function Depoimentos() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-blue">
            Quem já protegeu
          </p>
          <h2 className="mt-3 font-condensed text-3xl font-extrabold uppercase md:text-4xl">
            Clientes que confiam na Prospere
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star
                  key={s}
                  size={18}
                  className="fill-prospere-gold text-prospere-gold"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-zinc-600">
              4,9 de 5 · avaliação média dos clientes
            </span>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
          {DEPOIMENTOS.map((d) => (
            <RevealItem
              key={d.nome}
              className="relative flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-7 shadow-card transition hover:-translate-y-1 hover:shadow-glow"
            >
              <Quote
                size={36}
                className="absolute right-6 top-6 text-prospere-blue/10"
                aria-hidden
              />
              <div className="flex">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star
                    key={s}
                    size={15}
                    className="fill-prospere-gold text-prospere-gold"
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-700">
                “{d.texto}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-zinc-200 pt-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-prospere-blue font-condensed text-sm font-bold text-white">
                  {d.iniciais}
                </span>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{d.nome}</p>
                  <p className="text-xs text-zinc-500">
                    {d.cidade} · {d.ramo}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
