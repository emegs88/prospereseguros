// ─────────────────────────────────────────────────────────────────────────
//  POST /api/lead — captura de lead ANTES de abrir o WhatsApp (Núcleo 5).
//
//  Garante que nenhum contato se perca: mesmo que a pessoa não conclua a
//  conversa no WhatsApp, a Carla já tem o lead salvo com o contexto. Devolve
//  também o link wa.me contextual pronto para o front redirecionar.
// ─────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leadSchema } from "@/lib/schemas";
import { whatsappLink } from "@/lib/whatsapp";
import type { Ramo } from "@/lib/seguradoras/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "JSON inválido" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { erro: "Dados inválidos", detalhes: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { nome, telefone, email, ramo, cotacaoId, origem } = parsed.data;

  // persiste o lead (tolerante: se o banco não estiver configurado em dev,
  // ainda devolvemos o link para não travar o fluxo do usuário).
  let leadId: string | null = null;
  try {
    const lead = await db.lead.create({
      data: {
        nome,
        telefone,
        email: email || null,
        ramo: (ramo as Ramo) ?? null,
        cotacaoId: cotacaoId ?? null,
        origem: origem ?? "site",
      },
    });
    leadId = lead.id;
  } catch (e) {
    console.error("[lead] falha ao persistir:", e);
  }

  const link = whatsappLink({
    ramo: ramo as Ramo | undefined,
    codigoCotacao: cotacaoId,
    origem,
  });

  return NextResponse.json({ ok: true, leadId, whatsappUrl: link });
}
