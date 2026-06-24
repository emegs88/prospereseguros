import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bike,
  HeartPulse,
  Home,
  Plane,
  Smartphone,
  Building2,
  PawPrint,
  ArrowRight,
  Check,
  ShieldCheck,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { produtoPorSlug, PRODUTOS } from "@/lib/produtos";
import { whatsappLink } from "@/lib/whatsapp";
import type { Ramo } from "@/lib/seguradoras/types";
import { Parceiros } from "@/components/sections/parceiros";
import { Reveal } from "@/components/ui/reveal";

// ─────────────────────────────────────────────────────────────────────────
//  Landing dinâmica por ramo: /cotar/moto, /cotar/vida, /cotar/residencial,
//  /cotar/viagem, /cotar/celular, /cotar/empresarial, /cotar/pet.
//
//  /cotar/auto NÃO cai aqui — existe a rota estática própria (cotador online),
//  que tem prioridade sobre esta rota dinâmica. Slug inexistente → 404.
// ─────────────────────────────────────────────────────────────────────────

// Pré-gera as landings (todos os ramos menos auto, que tem página própria).
export function generateStaticParams() {
  return PRODUTOS.filter((p) => p.slug !== "auto").map((p) => ({
    ramo: p.slug,
  }));
}

const ICONES: Record<string, LucideIcon> = {
  Bike,
  HeartPulse,
  Home,
  Plane,
  Smartphone,
  Building2,
  PawPrint,
};

// Benefícios editoriais por ramo (uso comercial — corretora).
const BENEFICIOS: Record<Ramo, string[]> = {
  AUTO: [],
  MOTO: [
    "Cobertura contra roubo, furto e colisão",
    "Proteção a terceiros (danos materiais e corporais)",
    "Assistência 24h com guincho e socorro",
    "Capacete e acessórios podem ser incluídos",
  ],
  VIDA: [
    "Indenização para quem você ama em caso de imprevisto",
    "Coberturas para invalidez e doenças graves",
    "Assistência funeral e apoio à família",
    "Prêmios acessíveis, sob medida para o seu momento",
  ],
  RESIDENCIAL: [
    "Incêndio, raio, explosão e danos elétricos",
    "Roubo e furto de bens dentro de casa",
    "Assistência 24h: chaveiro, encanador, eletricista",
    "Vale para casa própria e imóvel alugado",
  ],
  VIAGEM: [
    "Assistência médica e hospitalar no mundo todo",
    "Cobertura para bagagem extraviada ou danificada",
    "Cancelamento e atraso de voo",
    "Planos para passeio, intercâmbio e a trabalho",
  ],
  CELULAR: [
    "Quebra acidental de tela e danos",
    "Roubo e furto qualificado",
    "Reparo em rede autorizada ou reembolso",
    "Cobre smartphones e tablets",
  ],
  EMPRESARIAL: [
    "Proteção ao patrimônio, estoque e equipamentos",
    "Responsabilidade civil para o seu negócio",
    "Lucros cessantes e continuidade operacional",
    "Soluções para comércio, serviços e indústria",
  ],
  PET: [
    "Consultas, exames e internações",
    "Atendimento em rede credenciada ou reembolso",
    "Cirurgias e emergências veterinárias",
    "Cães e gatos, em diferentes idades",
  ],
};

export function generateMetadata({
  params,
}: {
  params: { ramo: string };
}): Metadata {
  const produto = produtoPorSlug(params.ramo);
  if (!produto || produto.slug === "auto") {
    return { title: "Seguro" };
  }
  return {
    title: `Seguro ${produto.rotulo}`,
    description: produto.descricao,
  };
}

export default function CotarRamoPage({
  params,
}: {
  params: { ramo: string };
}) {
  const produto = produtoPorSlug(params.ramo);

  // auto tem página própria; slug inválido → 404.
  if (!produto || produto.slug === "auto") {
    notFound();
  }

  const Icone = ICONES[produto.icone] ?? ShieldCheck;
  const beneficios = BENEFICIOS[produto.ramo] ?? [];

  const ctaWhatsApp = whatsappLink({
    ramo: produto.ramo,
    origem: `landing-${produto.slug}`,
  });

  return (
    <main className="bg-white">
      {/* HERO do ramo */}
      <section className="relative overflow-hidden border-b border-zinc-100 bg-gradient-to-b from-prospere-blue/5 to-white">
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
          <Reveal>
            <nav className="mb-6 flex items-center gap-1.5 text-xs text-zinc-400">
              <Link href="/" className="hover:text-prospere-blue">
                Início
              </Link>
              <span>/</span>
              <Link href="/#produtos" className="hover:text-prospere-blue">
                Seguros
              </Link>
              <span>/</span>
              <span className="text-zinc-600">{produto.rotulo}</span>
            </nav>

            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-prospere-blue/10 text-prospere-blue">
                <Icone size={28} />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-prospere-blue">
                  Seguro {produto.rotulo}
                </p>
                <h1 className="mt-1 font-condensed text-3xl font-extrabold uppercase text-zinc-900 md:text-4xl">
                  Proteja o que importa, com quem entende
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-lg text-zinc-600">
              {produto.descricao} Atendimento humano da Prospere, com mais de 23
              anos de experiência, comparando as maiores seguradoras do Brasil
              pra você.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={ctaWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-prospere-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-prospere-blue/25 transition hover:brightness-110"
              >
                <MessageCircle size={18} />
                Cotar pelo WhatsApp
              </a>
              <Link
                href="/#produtos"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-prospere-blue/40 hover:text-prospere-blue"
              >
                Ver outros seguros
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFÍCIOS / COBERTURAS */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Reveal>
          <h2 className="font-condensed text-2xl font-extrabold uppercase text-zinc-900 md:text-3xl">
            O que o seu <span className="text-prospere-blue">Seguro {produto.rotulo}</span> cobre
          </h2>
          <p className="mt-2 max-w-xl text-zinc-500">
            Coberturas que se ajustam ao seu perfil. Fale com a gente e montamos
            o plano ideal pra você.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {beneficios.map((b) => (
            <div
              key={b}
              className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-card"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-prospere-blue/10 text-prospere-blue">
                <Check size={14} strokeWidth={3} />
              </span>
              <p className="text-sm leading-relaxed text-zinc-700">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PARCEIROS (reaproveita a régua de seguradoras) */}
      <Parceiros />

      {/* CTA final */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-prospere-navy px-6 py-12 text-center text-white">
          <h2 className="font-condensed text-2xl font-extrabold uppercase md:text-3xl">
            Pronto pra cotar seu Seguro {produto.rotulo}?
          </h2>
          <p className="max-w-md text-white/70">
            Em poucos minutos a Carla e o time da Prospere comparam as melhores
            seguradoras e trazem o melhor preço pra você.
          </p>
          <a
            href={ctaWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-prospere-navy shadow-lg transition hover:bg-prospere-gold hover:text-white"
          >
            <MessageCircle size={18} />
            Falar com especialista
          </a>
          <p className="flex items-center gap-2 text-xs text-white/50">
            <ShieldCheck size={14} />
            Sem compromisso. Seus dados ficam protegidos.
          </p>
        </div>
      </section>
    </main>
  );
}
