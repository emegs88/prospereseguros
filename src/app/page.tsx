import Link from "next/link";
import { Search, GitCompareArrows, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { SeletorRamos } from "@/components/sections/seletor-ramos";
import { Parceiros } from "@/components/sections/parceiros";
import { Depoimentos } from "@/components/sections/depoimentos";
import { FAQ } from "@/components/sections/faq";
import { PatrocinioBeachTennis } from "@/components/sections/patrocinio-beach-tennis";
import { Reveal, StaggerGroup, RevealItem } from "@/components/ui/reveal";
import { EMPRESA } from "@/lib/empresa";
import { whatsappLink } from "@/lib/whatsapp";

const ETAPAS = [
  {
    icone: Search,
    titulo: "1. Conte o que precisa",
    texto:
      "Responda perguntas rápidas sobre você e o que quer proteger. Leva menos de 2 minutos.",
  },
  {
    icone: GitCompareArrows,
    titulo: "2. Compare as ofertas",
    texto:
      "Veja preços e coberturas das 8 seguradoras lado a lado, com os melhores destaques.",
  },
  {
    icone: FileCheck,
    titulo: "3. Contrate sem burocracia",
    texto:
      "Escolheu? Finalize online ou fale com a Carla no WhatsApp. Simples e seguro.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ───────────────── HERO ───────────────── */}
      <Hero />

      {/* ───────────────── PARCEIROS ───────────────── */}
      <Parceiros />

      {/* ───────────────── SELETOR DE RAMOS ───────────────── */}
      <SeletorRamos />

      {/* ───────────────── COMO FUNCIONA ───────────────── */}
      <section id="como-funciona" className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-blue">
              Simples assim
            </p>
            <h2 className="mt-3 font-condensed text-3xl font-extrabold uppercase md:text-4xl">
              Como funciona
            </h2>
          </Reveal>
          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {ETAPAS.map((etapa) => (
              <RevealItem
                key={etapa.titulo}
                className="group rounded-2xl border border-zinc-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-prospere-blue/10 text-prospere-blue transition group-hover:bg-prospere-blue group-hover:text-white">
                  <etapa.icone size={24} />
                </div>
                <h3 className="mt-5 font-condensed text-xl font-bold uppercase">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {etapa.texto}
                </p>
              </RevealItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ───────────────── DEPOIMENTOS ───────────────── */}
      <Depoimentos />

      {/* ───────────────── PATROCÍNIO BEACH TENNIS ───────────────── */}
      <PatrocinioBeachTennis />

      {/* ───────────────── FAQ ───────────────── */}
      <FAQ />

      {/* ───────────────── CTA FINAL ───────────────── */}
      <section
        id="contato"
        className="relative overflow-hidden bg-prospere-blue py-20 text-white"
      >
        <div className="absolute inset-0 bg-grid-prospere [background-size:40px_40px] opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <h2 className="font-condensed text-3xl font-extrabold uppercase md:text-5xl">
              Pronto para proteger o que importa?
            </h2>
            <p className="mt-4 text-lg text-blue-100">{EMPRESA.tagline}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="gold">
                <Link href="/cotar/auto">Fazer cotação grátis</Link>
              </Button>
              <Button asChild size="lg" variant="outline-light">
                <a
                  href={whatsappLink({ origem: "cta-final" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar com a Carla
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
