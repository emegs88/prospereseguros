"use client";

import Link from "next/link";
import { Car, ShieldCheck } from "lucide-react";
import { Stepper } from "@/components/cotacao/stepper";
import { PassoVeiculo } from "@/components/cotacao/passo-veiculo";
import { PassoPerfil } from "@/components/cotacao/passo-perfil";
import { PassoCoberturas } from "@/components/cotacao/passo-coberturas";
import { PassoResultado } from "@/components/cotacao/passo-resultado";
import { useCotacaoAuto } from "@/store/cotacao-auto";

export default function CotarAutoPage() {
  const passo = useCotacaoAuto((s) => s.passo);
  const resultado = passo === "resultado";

  return (
    <main className="bg-zinc-50">
      <div
        className={`mx-auto px-6 py-10 ${resultado ? "max-w-6xl" : "max-w-2xl"}`}
      >
        {/* cabeçalho do fluxo */}
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-prospere-blue/10 text-prospere-blue">
            <Car size={22} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-prospere-blue">
              Cotação de seguro auto
            </p>
            <h1 className="font-condensed text-2xl font-extrabold uppercase text-zinc-900">
              Cote em 2 minutos
            </h1>
          </div>
        </div>

        {!resultado && (
          <div className="mb-8">
            <Stepper passo={passo} />
          </div>
        )}

        <div
          className={`rounded-3xl border border-zinc-200 bg-white p-6 shadow-card sm:p-8`}
        >
          {passo === "veiculo" && <PassoVeiculo />}
          {passo === "perfil" && <PassoPerfil />}
          {passo === "coberturas" && <PassoCoberturas />}
          {passo === "resultado" && <PassoResultado />}
        </div>

        {/* selo de confiança */}
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-zinc-400">
          <ShieldCheck size={14} className="text-prospere-blue" />
          Seus dados são usados apenas para a cotação. Veja nossa{" "}
          <Link
            href="/privacidade"
            className="font-medium text-prospere-blue hover:underline"
          >
            política de privacidade
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
