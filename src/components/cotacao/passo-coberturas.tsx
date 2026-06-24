"use client";

import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, brl } from "@/lib/utils";
import { gerarCodigoCotacao } from "@/lib/utils";
import { useCotacaoAuto } from "@/store/cotacao-auto";
import { cotarStream } from "@/lib/sse-cotacao";

interface ToggleCobertura {
  chave:
    | "casco"
    | "vidros"
    | "assistencia24h"
    | "franquiaReduzida";
  rotulo: string;
  descricao: string;
}

const TOGGLES: ToggleCobertura[] = [
  {
    chave: "casco",
    rotulo: "Casco (colisão, roubo e furto)",
    descricao: "Cobertura principal do veículo.",
  },
  {
    chave: "vidros",
    rotulo: "Vidros, faróis e retrovisores",
    descricao: "Reparo ou troca sem dor de cabeça.",
  },
  {
    chave: "assistencia24h",
    rotulo: "Assistência 24h",
    descricao: "Guincho, chaveiro e socorro.",
  },
  {
    chave: "franquiaReduzida",
    rotulo: "Franquia reduzida",
    descricao: "Paga menos em caso de sinistro.",
  },
];

const RCF_OPCOES = [50000, 100000, 150000, 200000];

export function PassoCoberturas() {
  const {
    coberturas,
    setCoberturas,
    voltar,
    irPara,
    montarRequest,
    iniciarStreaming,
    receberResultado,
    finalizarStreaming,
    falharStreaming,
  } = useCotacaoAuto();

  function iniciarCotacao() {
    const req = montarRequest();
    if (!req) return;
    const cotacaoId = req.cotacaoId ?? gerarCodigoCotacao();
    const payload = { ...req, cotacaoId };

    irPara("resultado");

    cotarStream(payload, {
      onSeguradoras: (lista) => iniciarStreaming(lista, cotacaoId),
      onResultado: (r) => receberResultado(r),
      onFim: () => finalizarStreaming(),
      onErro: (msg) => falharStreaming(msg),
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-condensed text-2xl font-extrabold uppercase text-zinc-900">
          O que você quer cobrir?
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Já deixamos a proteção mais escolhida ligada. Ajuste como quiser — dá
          para mudar depois no comparador.
        </p>
      </div>

      <div className="space-y-2">
        {TOGGLES.map((t) => {
          const ativo = !!coberturas[t.chave];
          return (
            <button
              key={t.chave}
              type="button"
              onClick={() => setCoberturas({ [t.chave]: !ativo })}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition",
                ativo
                  ? "border-prospere-blue bg-prospere-blue/5"
                  : "border-zinc-200 hover:border-prospere-blue/40",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  ativo
                    ? "bg-prospere-blue text-white"
                    : "bg-zinc-100 text-zinc-400",
                )}
              >
                <ShieldCheck size={20} />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-zinc-900">
                  {t.rotulo}
                </span>
                <span className="block text-sm text-zinc-500">
                  {t.descricao}
                </span>
              </span>
              <span
                className={cn(
                  "relative h-6 w-11 shrink-0 rounded-full transition",
                  ativo ? "bg-prospere-blue" : "bg-zinc-300",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                    ativo ? "left-[22px]" : "left-0.5",
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-700">
          Danos a terceiros (RCF) — materiais e corporais
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RCF_OPCOES.map((v) => {
            const ativo = coberturas.rcfDanosMateriais === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() =>
                  setCoberturas({
                    rcfDanosMateriais: v,
                    rcfDanosCorporais: v,
                  })
                }
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm font-semibold transition",
                  ativo
                    ? "border-prospere-blue bg-prospere-blue/5 text-prospere-blue"
                    : "border-zinc-300 text-zinc-700 hover:border-prospere-blue/40",
                )}
              >
                {brl(v)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" onClick={voltar}>
          <ArrowLeft size={18} /> Voltar
        </Button>
        <Button size="lg" variant="gold" onClick={iniciarCotacao}>
          <Sparkles size={18} /> Ver minhas cotações
        </Button>
      </div>
    </div>
  );
}
