"use client";

import { useMemo } from "react";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { brl, cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import { useCotacaoAuto } from "@/store/cotacao-auto";
import { CardOferta } from "./card-oferta";

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <div className="h-8 w-28 animate-pulse rounded bg-zinc-100" />
        <div className="h-4 w-8 animate-pulse rounded bg-zinc-100" />
      </div>
      <div className="h-9 w-32 animate-pulse rounded bg-zinc-100" />
      <div className="h-4 w-full animate-pulse rounded bg-zinc-100" />
      <div className="h-11 w-full animate-pulse rounded-full bg-zinc-100" />
    </div>
  );
}

export function PassoResultado() {
  const {
    carregando,
    esperando,
    resultados,
    erro,
    cotacaoId,
    veiculo,
    perfil,
    irPara,
    ofertas,
  } = useCotacaoAuto();

  const listaOfertas = ofertas();
  const indisponiveis = resultados.filter(
    (r) => r.status === "INDISPONIVEL",
  ) as Extract<
    (typeof resultados)[number],
    { status: "INDISPONIVEL" }
  >[];

  // ordena por preço mensal e calcula selos
  const ordenadas = useMemo(
    () => [...listaOfertas].sort((a, b) => a.precoMensal - b.precoMensal),
    [listaOfertas],
  );

  const idMaisBarato = ordenadas[0]?.seguradoraId;
  const idMelhorAvaliado = useMemo(() => {
    if (!ordenadas.length) return undefined;
    return [...ordenadas].sort(
      (a, b) => b.notaAvaliacao - a.notaAvaliacao,
    )[0]?.seguradoraId;
  }, [ordenadas]);

  const totalSkeletons = esperando.size;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-condensed text-2xl font-extrabold uppercase text-zinc-900">
            Suas cotações
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            {veiculo.marcaNome} {veiculo.modeloNome} {veiculo.anoModelo} ·{" "}
            {perfil.cidade ?? "—"}
            {perfil.uf ? `/${perfil.uf}` : ""}
            {cotacaoId && (
              <>
                {" · "}
                <span className="font-mono text-xs text-zinc-400">
                  {cotacaoId}
                </span>
              </>
            )}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => irPara("coberturas")}>
          <SlidersHorizontal size={16} /> Ajustar coberturas
        </Button>
      </div>

      {carregando && (
        <p className="inline-flex items-center gap-2 rounded-full bg-prospere-blue/5 px-4 py-2 text-sm font-medium text-prospere-blue">
          <Loader2 size={16} className="animate-spin" />
          Consultando {esperando.size} seguradora
          {esperando.size === 1 ? "" : "s"}…
        </p>
      )}

      {erro && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} />
          <span className="flex-1">{erro}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => irPara("coberturas")}
          >
            <RefreshCw size={14} /> Tentar de novo
          </Button>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ordenadas.map((o) => (
          <CardOferta
            key={o.seguradoraId}
            oferta={o}
            cotacaoId={cotacaoId}
            selo={
              o.seguradoraId === idMaisBarato
                ? "MAIS_BARATO"
                : o.seguradoraId === idMelhorAvaliado
                  ? "MELHOR_AVALIADO"
                  : null
            }
          />
        ))}

        {Array.from({ length: totalSkeletons }).map((_, i) => (
          <CardSkeleton key={`sk-${i}`} />
        ))}
      </div>

      {indisponiveis.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-700">
            Não cotaram desta vez
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-zinc-500">
            {indisponiveis.map((r) => (
              <li key={r.seguradoraId}>
                {r.seguradoraNome} — {r.motivo}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!carregando && ordenadas.length === 0 && !erro && (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center">
          <p className="font-condensed text-lg font-bold uppercase text-zinc-900">
            Nenhuma oferta disponível
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Fale com a Carla — encontramos a melhor opção para o seu perfil.
          </p>
          <Button asChild className="mt-4" variant="whatsapp">
            <a
              href={whatsappLink({
                ramo: "AUTO",
                codigoCotacao: cotacaoId,
                origem: "comparador-sem-ofertas",
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
        <Button variant="ghost" onClick={() => irPara("veiculo")}>
          <ArrowLeft size={18} /> Nova cotação
        </Button>
        {ordenadas.length > 0 && (
          <p className={cn("text-sm text-zinc-500")}>
            {ordenadas.length} oferta{ordenadas.length === 1 ? "" : "s"} ·
            menor preço {brl(ordenadas[0].precoMensal)}/mês
          </p>
        )}
      </div>
    </div>
  );
}
