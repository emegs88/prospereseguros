import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EMPRESA, FUNDADORA, PILARES, NUMEROS, whatsappUrl } from "@/lib/empresa";
import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Quem Somos | Prospere Seguros",
  description:
    "Conheça Carla Picinini, fundadora da Prospere Seguros. Mais de 23 anos protegendo o que realmente importa — proteção hoje, tranquilidade sempre.",
};

// ícones inline para os pilares (sem dependência externa)
function PilarIcon({ tipo }: { tipo: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (tipo) {
    case "heart":
      return (
        <svg {...common}>
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...common}>
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default: // handshake
      return (
        <svg {...common}>
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>
      );
  }
}

export default function SobrePage() {
  return (
    <main className="bg-white text-zinc-900">
      {/* HERO — Carla + promessa pessoal */}
      <section className="relative overflow-hidden bg-prospere-navy text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-prospere-navy via-prospere-navy to-[#06182f]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <Logo variant="dark" className="h-12 w-auto" />
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-prospere-gold">
              Quem Somos
            </p>
            <h1 className="mt-3 font-condensed text-4xl font-extrabold uppercase leading-[1.05] md:text-6xl">
              Proteção hoje,{" "}
              <span className="text-prospere-blue">tranquilidade sempre.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-200">
              {FUNDADORA.promessaPessoal}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={whatsappUrl(
                  "Olá! Vim pelo site da Prospere e gostaria de falar com a Carla.",
                )}
                target="_blank"
                className="rounded-full bg-prospere-blue px-7 py-3 font-semibold text-white shadow-lg shadow-prospere-blue/30 transition hover:brightness-110"
              >
                Falar com a Carla
              </Link>
              <Link
                href="/cotar/auto"
                className="rounded-full border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Fazer uma cotação
              </Link>
            </div>
          </div>

          {/* foto da fundadora com selo */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
              <Image
                src={FUNDADORA.fotoUrl}
                alt={`${FUNDADORA.nome}, ${FUNDADORA.cargo} da Prospere Seguros`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 384px"
                priority
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-prospere-gold px-5 py-3 text-prospere-navy shadow-xl">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 9.5 7.5 4 8l4 4-1 6 5-3 5 3-1-6 4-4-5.5-.5L12 2Z" />
              </svg>
              <span className="text-sm font-bold uppercase tracking-wide">
                +{FUNDADORA.anosExperiencia} anos de experiência
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4">
          {NUMEROS.map((n) => (
            <div key={n.rotulo} className="text-center">
              <p className="font-condensed text-4xl font-extrabold text-prospere-blue md:text-5xl">
                {n.valor}
              </p>
              <p className="mt-1 text-sm text-zinc-500">{n.rotulo}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HISTÓRIA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-blue">
          Nossa história
        </p>
        <h2 className="mt-3 font-condensed text-3xl font-extrabold uppercase md:text-4xl">
          Feita por quem entende de gente
        </h2>
        <div className="mt-8 space-y-5 text-left text-lg leading-relaxed text-zinc-600">
          {FUNDADORA.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <p className="mt-8 font-condensed text-xl font-bold text-prospere-navy">
          — {FUNDADORA.nome}, {FUNDADORA.cargoLongo}
        </p>
      </section>

      {/* PILARES */}
      <section className="bg-prospere-navy py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-gold">
              Nossos valores
            </p>
            <h2 className="mt-3 font-condensed text-3xl font-extrabold uppercase md:text-4xl">
              O que nos move todos os dias
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILARES.map((p) => (
              <div
                key={p.chave}
                className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-prospere-gold/15 text-prospere-gold">
                  <PilarIcon tipo={p.icone} />
                </div>
                <h3 className="mt-5 font-condensed text-xl font-bold uppercase">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  {p.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-condensed text-3xl font-extrabold uppercase md:text-4xl">
          Pronto para proteger o que importa?
        </h2>
        <p className="mt-4 text-lg text-zinc-600">
          {EMPRESA.promessa}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/cotar/auto"
            className="rounded-full bg-prospere-blue px-8 py-4 font-semibold text-white shadow-lg shadow-prospere-blue/30 transition hover:brightness-110"
          >
            Cotar agora
          </Link>
          <Link
            href={whatsappUrl()}
            target="_blank"
            className="rounded-full border border-zinc-300 px-8 py-4 font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            Falar no WhatsApp
          </Link>
        </div>
      </section>
    </main>
  );
}
