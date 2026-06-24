// ─────────────────────────────────────────────────────────────────────────
//  Badges inteligentes do comparador (NÚCLEO 2).
//  Calcula "Melhor preço", "Mais completo", "Melhor custo-benefício" e
//  "Recomendado pro seu perfil" a partir do conjunto de ofertas válidas.
// ─────────────────────────────────────────────────────────────────────────

import type { OfertaSeguradora } from "./types";

export type BadgeTipo =
  | "melhor_preco"
  | "mais_completo"
  | "custo_beneficio"
  | "recomendado";

export const BADGE_LABEL: Record<BadgeTipo, string> = {
  melhor_preco: "Melhor preço",
  mais_completo: "Mais completo",
  custo_beneficio: "Melhor custo-benefício",
  recomendado: "Recomendado pro seu perfil",
};

function scoreCobertura(o: OfertaSeguradora): number {
  let s = o.coberturas.filter((c) => c.incluida).length;
  if (o.assistencia24h) s += 1;
  // franquia menor é melhor
  s += Math.max(0, 3 - o.franquia / 2000);
  s += o.notaAvaliacao;
  return s;
}

/** Retorna um mapa seguradoraId → badges atribuídos. */
export function calcularBadges(
  ofertas: OfertaSeguradora[],
): Record<string, BadgeTipo[]> {
  const out: Record<string, BadgeTipo[]> = {};
  if (ofertas.length === 0) return out;

  const add = (id: string, b: BadgeTipo) => {
    out[id] = out[id] ?? [];
    if (!out[id].includes(b)) out[id].push(b);
  };

  // melhor preço
  const maisBarata = [...ofertas].sort(
    (a, b) => a.precoAnual - b.precoAnual,
  )[0];
  add(maisBarata.seguradoraId, "melhor_preco");

  // mais completo (mais coberturas)
  const maisCompleta = [...ofertas].sort(
    (a, b) => scoreCobertura(b) - scoreCobertura(a),
  )[0];
  add(maisCompleta.seguradoraId, "mais_completo");

  // custo-benefício: melhor score de cobertura por real gasto
  const custoBeneficio = [...ofertas].sort(
    (a, b) =>
      scoreCobertura(b) / b.precoAnual - scoreCobertura(a) / a.precoAnual,
  )[0];
  add(custoBeneficio.seguradoraId, "custo_beneficio");

  // recomendado: melhor combinação de nota + custo-benefício (heurística)
  const recomendada = [...ofertas].sort((a, b) => {
    const sa = a.notaAvaliacao * 0.6 + (scoreCobertura(a) / a.precoAnual) * 4000;
    const sb = b.notaAvaliacao * 0.6 + (scoreCobertura(b) / b.precoAnual) * 4000;
    return sb - sa;
  })[0];
  add(recomendada.seguradoraId, "recomendado");

  return out;
}
