"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  Clock,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PartnerLogo } from "@/components/brand/partner-logo";
import { cn, brl } from "@/lib/utils";
import { whatsappLink } from "@/lib/whatsapp";
import type { ParceiroId } from "@/lib/parceiros";
import type { OfertaSeguradora } from "@/lib/seguradoras/types";

interface CardOfertaProps {
  oferta: OfertaSeguradora;
  selo?: "MAIS_BARATO" | "MELHOR_AVALIADO" | null;
  cotacaoId?: string;
}

const SELO_TEXTO = {
  MAIS_BARATO: "Mais barato",
  MELHOR_AVALIADO: "Melhor avaliado",
} as const;

export function CardOferta({ oferta, selo, cotacaoId }: CardOfertaProps) {
  const [aberto, setAberto] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border bg-white shadow-card transition-all",
        selo
          ? "border-prospere-blue/40 ring-1 ring-prospere-blue/20"
          : "border-zinc-200",
      )}
    >
      {selo && (
        <div className="flex justify-center">
          <Badge variant="gold" className="-mt-3">
            {SELO_TEXTO[selo]}
          </Badge>
        </div>
      )}

      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <PartnerLogo
            id={oferta.seguradoraId as ParceiroId}
            title={oferta.seguradoraNome}
            className="h-8 w-auto"
          />
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-700">
            <Star size={14} className="fill-prospere-gold text-prospere-gold" />
            {oferta.notaAvaliacao.toFixed(1)}
          </span>
        </div>

        <div>
          <p className="text-xs text-zinc-500">a partir de</p>
          <p className="font-condensed text-3xl font-extrabold text-zinc-900">
            {brl(oferta.precoMensal)}
            <span className="text-base font-semibold text-zinc-400">/mês</span>
          </p>
          <p className="text-sm text-zinc-500">
            ou {brl(oferta.precoAnual)} à vista
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 text-zinc-600">
            <Wrench size={14} className="text-prospere-blue" />
            Franquia {brl(oferta.franquia)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-zinc-600">
            <Clock size={14} className="text-prospere-blue" />
            {oferta.carenciaDias === 0
              ? "Sem carência"
              : `Carência ${oferta.carenciaDias}d`}
          </span>
        </div>

        {oferta.destaques && oferta.destaques.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {oferta.destaques.map((d) => (
              <li
                key={d}
                className="rounded-full bg-prospere-blue/5 px-2.5 py-1 text-xs font-medium text-prospere-blue"
              >
                {d}
              </li>
            ))}
          </ul>
        )}

        <Button
          asChild
          className="w-full"
          variant={selo ? "default" : "outline"}
        >
          <a
            href={whatsappLink({
              ramo: "AUTO",
              codigoCotacao: cotacaoId,
              seguradora: oferta.seguradoraNome,
              precoMensal: oferta.precoMensal,
              origem: "comparador-card",
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contratar com a Carla
          </a>
        </Button>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-prospere-blue"
        >
          {aberto ? "Ocultar coberturas" : "Ver coberturas"}
          <ChevronDown
            size={16}
            className={cn("transition", aberto && "rotate-180")}
          />
        </button>
      </div>

      {aberto && (
        <div className="border-t border-zinc-100 px-5 py-4">
          <ul className="space-y-2">
            {oferta.coberturas.map((c) => (
              <li
                key={c.chave}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="flex items-start gap-2">
                  {c.incluida ? (
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-green-600"
                    />
                  ) : (
                    <X size={16} className="mt-0.5 shrink-0 text-zinc-300" />
                  )}
                  <span
                    className={cn(
                      c.incluida ? "text-zinc-700" : "text-zinc-400",
                    )}
                  >
                    {c.rotulo}
                  </span>
                </span>
                {c.valor != null && c.incluida && (
                  <span className="shrink-0 font-semibold text-zinc-700">
                    {brl(c.valor)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
