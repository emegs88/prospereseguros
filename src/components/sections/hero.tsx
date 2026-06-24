"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  HeartHandshake,
  Star,
  Check,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { EMPRESA, FUNDADORA } from "@/lib/empresa";
import { whatsappLink } from "@/lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

// Números do hero, já decompostos para o contador animado.
const NUMEROS = [
  { to: 23, prefix: "", suffix: "+", rotulo: "anos de experiência" },
  { to: 8, prefix: "", suffix: "", rotulo: "seguradoras parceiras" },
  { to: 2, prefix: "", suffix: " min", rotulo: "para cotar e comparar" },
  { to: 100, prefix: "", suffix: "%", rotulo: "online, sem burocracia" },
];

// Ofertas fake só para o mockup visual do comparador (não é cálculo real).
const MOCK_OFERTAS = [
  { id: "azul", nome: "Azul Seguros", preco: "455,17", barato: true },
  { id: "porto", nome: "Porto Seguro", preco: "498,90", barato: false },
  { id: "hdi", nome: "HDI Seguros", preco: "532,40", barato: false },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-prospere-navy text-white">
      {/* fundo: glow + grid + blobs animados */}
      <div className="absolute inset-0 bg-glow-prospere" />
      <div className="absolute inset-0 bg-grid-prospere [background-size:40px_40px] opacity-40" />
      <motion.div
        aria-hidden
        className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-prospere-glow/20 blur-3xl"
        animate={{ y: [0, 24, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-prospere-gold/10 blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pt-24">
        {/* ── coluna texto ── */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-prospere-gold backdrop-blur"
          >
            <Star size={14} className="fill-prospere-gold" />+
            {FUNDADORA.anosExperiencia} anos protegendo o que importa
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className="mt-6 font-condensed text-4xl font-extrabold uppercase leading-[1.02] md:text-6xl lg:text-7xl"
          >
            Seu seguro,{" "}
            <span className="text-gradient-prospere">cotado em 2 minutos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-zinc-200"
          >
            {EMPRESA.promessa} Compare as 8 maiores seguradoras do Brasil em um
            só lugar e contrate com quem realmente cuida de você.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
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
          </motion.div>

          {/* selos rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-300"
          >
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
          </motion.div>
        </div>

        {/* ── coluna visual: mockup do comparador flutuante ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative"
        >
          {/* card principal do comparador */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-glow backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-prospere-gold">
                Comparando agora
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                <TrendingDown size={12} /> menor preço
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {MOCK_OFERTAS.map((o, i) => (
                <motion.div
                  key={o.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.12 }}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
                    o.barato
                      ? "border-prospere-gold/40 bg-prospere-gold/10"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-16 items-center justify-center rounded-lg bg-white px-1.5">
                      <PartnerLogo
                        id={o.id as "azul" | "porto" | "hdi"}
                        title={o.nome}
                        className="h-5 w-auto"
                      />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {o.nome}
                      </p>
                      {o.barato && (
                        <p className="text-[11px] font-semibold text-prospere-gold">
                          Mais barato
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-400">a partir de</p>
                    <p className="font-condensed text-lg font-bold text-white">
                      R$ {o.preco}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/[0.04] px-4 py-3 text-xs text-zinc-300">
              <Check size={15} className="text-emerald-400" />
              Você economiza até{" "}
              <span className="font-bold text-white">R$ 77/mês</span> comparando.
            </div>
          </motion.div>

          {/* selo flutuante: nota */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1 }}
            className="absolute -left-4 -top-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-prospere-blue px-3.5 py-2.5 shadow-lg"
          >
            <div className="flex">
              {[0, 1, 2, 3, 4].map((s) => (
                <Star
                  key={s}
                  size={13}
                  className="fill-prospere-gold text-prospere-gold"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-white">4,9 · clientes</span>
          </motion.div>

          {/* números (count-up) abaixo do mockup */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {NUMEROS.map((n) => (
              <div
                key={n.rotulo}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center"
              >
                <p className="font-condensed text-2xl font-extrabold text-white">
                  <CountUp to={n.to} prefix={n.prefix} suffix={n.suffix} />
                </p>
                <p className="mt-0.5 text-[10px] leading-tight text-zinc-400">
                  {n.rotulo}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
