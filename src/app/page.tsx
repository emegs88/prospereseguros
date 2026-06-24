import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Search,
  GitCompareArrows,
  FileCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeletorRamos } from "@/components/sections/seletor-ramos";
import { Parceiros } from "@/components/sections/parceiros";
import { PatrocinioBeachTennis } from "@/components/sections/patrocinio-beach-tennis";
import { EMPRESA, FUNDADORA, NUMEROS } from "@/lib/empresa";
import { whatsappLink } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <main>
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative overflow-hidden bg-prospere-navy text-white">
        <div className="absolute inset-0 bg-glow-prospere" />
        <div className="absolute inset-0 bg-grid-prospere [background-size:40px_40px] opacity-40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:pt-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-prospere-gold">
              <Star size={14} className="fill-prospere-gold" />
              +{FUNDADORA.anosExperiencia} anos protegendo o que importa
            </span>
            <h1 className="mt-6 font-condensed text-4xl font-extrabold uppercase leading-[1.02] md:text-6xl lg:text-7xl">
              Seu seguro,{" "}
              <span className="text-gradient-prospere">cotado em 2 minutos.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-200">
              {EMPRESA.promessa} Compare as 8 maiores seguradoras do Brasil em um
              só lugar e contrate com quem realmente cuida de você.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/cotar/auto">Cotar meu seguro</Link>
              </Button>
              <Button asChild size="lg" variant="outline-light">
                <a
                  href={whatsappLink({ origem: "hero" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </Button>
            </div>

            {/* selos rápidos */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-300">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={18} className="text-prospere-gold" />
                Corretora registrada SUSEP
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap size={18} className="text-prospere-gold" />
                100% online, sem burocracia
              </span>
              <span className="inline-flex items-center gap-2">
                <HeartHandshake size={18} className="text-prospere-gold" />
                Atendimento humano
              </span>
            </div>
          </div>

          {/* cartão de prova social / números */}
          <div className="animate-rise [animation-delay:120ms]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-wider text-prospere-gold">
                Por que a Prospere?
              </p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {NUMEROS.map((n) => (
                  <div key={n.rotulo}>
                    <p className="font-condensed text-4xl font-extrabold text-white">
                      {n.valor}
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">{n.rotulo}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-white/5 p-4">
                <p className="text-sm italic leading-relaxed text-zinc-200">
                  “{FUNDADORA.promessaPessoal}”
                </p>
                <p className="mt-3 text-sm font-bold text-prospere-gold">
                  — {FUNDADORA.nome}, {FUNDADORA.cargo}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PARCEIROS ───────────────── */}
      <Parceiros />

      {/* ───────────────── SELETOR DE RAMOS ───────────────── */}
      <SeletorRamos />

      {/* ───────────────── COMO FUNCIONA ───────────────── */}
      <section id="como-funciona" className="bg-zinc-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-blue">
              Simples assim
            </p>
            <h2 className="mt-3 font-condensed text-3xl font-extrabold uppercase md:text-4xl">
              Como funciona
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
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
            ].map((etapa) => (
              <div
                key={etapa.titulo}
                className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-prospere-blue/10 text-prospere-blue">
                  <etapa.icone size={24} />
                </div>
                <h3 className="mt-5 font-condensed text-xl font-bold uppercase">
                  {etapa.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {etapa.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── PATROCÍNIO BEACH TENNIS ───────────────── */}
      <PatrocinioBeachTennis />

      {/* ───────────────── CTA FINAL ───────────────── */}
      <section
        id="contato"
        className="relative overflow-hidden bg-prospere-blue py-20 text-white"
      >
        <div className="absolute inset-0 bg-grid-prospere [background-size:40px_40px] opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
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
        </div>
      </section>
    </main>
  );
}
