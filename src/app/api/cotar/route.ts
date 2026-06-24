// ─────────────────────────────────────────────────────────────────────────
//  POST /api/cotar — multicálculo SÍNCRONO (aguarda todas as seguradoras).
//
//  Mesma entrada da rota /stream, mas devolve o array completo de uma vez.
//  Útil para SSR, para o assistente de IA (tool) e para clientes simples.
// ─────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { cotarTodas } from "@/lib/seguradoras/engine";
import { cotacaoRequestSchema } from "@/lib/schemas";
import type { CotacaoRequest } from "@/lib/seguradoras/types";
import { gerarCodigoCotacao } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "JSON inválido" }, { status: 400 });
  }

  const parsed = cotacaoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { erro: "Dados inválidos", detalhes: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const request = parsed.data as CotacaoRequest;
  const resultados = await cotarTodas(request);

  // ordena: cotados por preço asc primeiro, indisponíveis ao fim
  const ordenados = [...resultados].sort((a, b) => {
    if (a.status !== "COTADO") return 1;
    if (b.status !== "COTADO") return -1;
    return a.oferta.precoAnual - b.oferta.precoAnual;
  });

  return NextResponse.json({
    codigo: request.cotacaoId ?? gerarCodigoCotacao(),
    ramo: request.ramo,
    total: ordenados.length,
    cotados: ordenados.filter((r) => r.status === "COTADO").length,
    resultados: ordenados,
  });
}
