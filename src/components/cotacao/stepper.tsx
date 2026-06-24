"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDEM_PASSOS, type PassoAuto } from "@/store/cotacao-auto";

const ROTULOS: Record<PassoAuto, string> = {
  veiculo: "Veículo",
  perfil: "Perfil",
  coberturas: "Coberturas",
  resultado: "Resultado",
};

export function Stepper({ passo }: { passo: PassoAuto }) {
  const atualIdx = ORDEM_PASSOS.indexOf(passo);

  return (
    <ol className="flex items-center gap-2">
      {ORDEM_PASSOS.map((p, i) => {
        const concluido = i < atualIdx;
        const ativo = i === atualIdx;
        return (
          <li key={p} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition",
                  concluido && "bg-prospere-blue text-white",
                  ativo && "bg-prospere-blue text-white ring-4 ring-prospere-blue/20",
                  !concluido && !ativo && "bg-zinc-200 text-zinc-500",
                )}
              >
                {concluido ? <Check size={16} /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-semibold sm:block",
                  ativo ? "text-prospere-blue" : "text-zinc-500",
                )}
              >
                {ROTULOS[p]}
              </span>
            </div>
            {i < ORDEM_PASSOS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 rounded-full transition",
                  i < atualIdx ? "bg-prospere-blue" : "bg-zinc-200",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
