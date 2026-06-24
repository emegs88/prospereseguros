// ─────────────────────────────────────────────────────────────────────────
//  POST /api/cotar/stream — multicálculo em STREAMING (SSE).
//
//  Recebe o CotacaoRequest, valida com Zod e emite eventos Server-Sent Events:
//   • event: seguradoras  → lista que será consultada (monta skeletons)
//   • event: resultado    → uma OfertaSeguradora/Indisponível assim que chega
//   • event: fim          → terminou
//
//  A UI assina via fetch + ReadableStream e troca skeleton por card real.
// ─────────────────────────────────────────────────────────────────────────

import { NextRequest } from "next/server";
import { cotarStreaming, seguradorasDoRamo } from "@/lib/seguradoras/engine";
import { cotacaoRequestSchema } from "@/lib/schemas";
import type { CotacaoRequest } from "@/lib/seguradoras/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }

  const parsed = cotacaoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ erro: "Dados inválidos", detalhes: parsed.error.flatten() }),
      { status: 422, headers: { "content-type": "application/json" } },
    );
  }

  const request = parsed.data as CotacaoRequest;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // 1) anuncia quem será consultado → UI monta skeletons
        controller.enqueue(
          encoder.encode(sse("seguradoras", seguradorasDoRamo(request))),
        );

        // 2) emite cada resultado assim que a seguradora responde
        for await (const resultado of cotarStreaming(request)) {
          controller.enqueue(encoder.encode(sse("resultado", resultado)));
        }

        // 3) fim
        controller.enqueue(encoder.encode(sse("fim", { ok: true })));
      } catch (e) {
        controller.enqueue(
          encoder.encode(
            sse("erro", { mensagem: "Falha ao processar a cotação." }),
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
    },
  });
}
