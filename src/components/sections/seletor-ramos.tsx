import Link from "next/link";
import {
  Bike,
  Building2,
  Car,
  HeartPulse,
  Home,
  PawPrint,
  Plane,
  Smartphone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PRODUTOS, type Produto } from "@/lib/produtos";
import { Badge } from "@/components/ui/badge";
import { whatsappLink } from "@/lib/whatsapp";

const ICONES = {
  Car,
  Bike,
  HeartPulse,
  Home,
  Plane,
  Smartphone,
  Building2,
  PawPrint,
} as const;

function ProdutoCard({ produto }: { produto: Produto }) {
  const Icone = ICONES[produto.icone];
  return (
    <Link
      href={produto.href}
      className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-prospere-blue/40 hover:shadow-glow"
    >
      {produto.destaque && (
        <Badge variant="gold" className="absolute right-4 top-4">
          Mais cotado
        </Badge>
      )}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-prospere-blue/10 text-prospere-blue transition group-hover:bg-prospere-blue group-hover:text-white">
        <Icone size={24} />
      </div>
      <h3 className="mt-5 font-condensed text-xl font-bold uppercase text-zinc-900">
        Seguro {produto.rotulo}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
        {produto.descricao}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-prospere-blue">
        Cotar agora
        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

export function SeletorRamos() {
  return (
    <section id="produtos" className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-blue">
          Para o que você precisar
        </p>
        <h2 className="mt-3 font-condensed text-3xl font-extrabold uppercase md:text-4xl">
          Escolha o seu seguro
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-zinc-500">
          Cote, compare e contrate em minutos — sem burocracia, com atendimento
          humano de quem entende do assunto há mais de 23 anos.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUTOS.map((p) => (
          <ProdutoCard key={p.slug} produto={p} />
        ))}
      </div>

      {/* todos os tipos de seguro — não só os listados */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-dashed border-prospere-blue/30 bg-prospere-blue/5 p-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-prospere-blue/10 text-prospere-blue">
            <Sparkles size={20} />
          </span>
          <div>
            <p className="font-condensed text-lg font-bold uppercase text-zinc-900">
              Precisa de outro seguro?
            </p>
            <p className="text-sm text-zinc-600">
              Cotamos <strong>todos os tipos de seguro que existem</strong> —
              condomínio, garantia, rural, equipamentos, frota e muito mais.
            </p>
          </div>
        </div>
        <a
          href={whatsappLink({
            origem: "seletor-todos-os-seguros",
            mensagemLivre:
              "Olá! Vim pelo site da Prospere e preciso de um seguro que não está listado. Podem me ajudar?",
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-prospere-blue px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-prospere-blue/25 transition hover:brightness-110"
        >
          Falar com especialista
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
