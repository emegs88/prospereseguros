// ─────────────────────────────────────────────────────────────────────────
//  Cliente do streaming de cotação (SSE sobre fetch + ReadableStream).
//
//  POST /api/cotar/stream emite eventos: seguradoras | resultado | fim | erro.
//  Esta função faz o parse incremental e chama callbacks tipados.
// ─────────────────────────────────────────────────────────────────────────

import type { ResultadoCotacao, CotacaoRequest } from "@/lib/seguradoras/types";

interface SeguradoraAnunciada {
  id: string;
  nome: string;
  logoUrl: string;
}

interface Handlers {
  onSeguradoras: (lista: SeguradoraAnunciada[]) => void;
  onResultado: (r: ResultadoCotacao) => void;
  onFim: () => void;
  onErro: (msg: string) => void;
  signal?: AbortSignal;
}

export async function cotarStream(
  payload: CotacaoRequest,
  h: Handlers,
): Promise<void> {
  let resp: Response;
  try {
    resp = await fetch("/api/cotar/stream", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: h.signal,
    });
  } catch {
    h.onErro("Não foi possível conectar. Tente novamente.");
    return;
  }

  if (!resp.ok || !resp.body) {
    h.onErro("Falha ao iniciar a cotação.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // separa por bloco de evento (\n\n)
      let sep: number;
      while ((sep = buffer.indexOf("\n\n")) !== -1) {
        const bloco = buffer.slice(0, sep);
        buffer = buffer.slice(sep + 2);
        despachar(bloco, h);
      }
    }
  } catch {
    if (!h.signal?.aborted) h.onErro("Conexão interrompida.");
  }
}

function despachar(bloco: string, h: Handlers) {
  let evento = "message";
  let data = "";
  for (const linha of bloco.split("\n")) {
    if (linha.startsWith("event:")) evento = linha.slice(6).trim();
    else if (linha.startsWith("data:")) data += linha.slice(5).trim();
  }
  if (!data) return;

  let parsed: unknown;
  try {
    parsed = JSON.parse(data);
  } catch {
    return;
  }

  switch (evento) {
    case "seguradoras":
      h.onSeguradoras(parsed as SeguradoraAnunciada[]);
      break;
    case "resultado":
      h.onResultado(parsed as ResultadoCotacao);
      break;
    case "fim":
      h.onFim();
      break;
    case "erro":
      h.onErro((parsed as { mensagem?: string }).mensagem ?? "Erro na cotação.");
      break;
  }
}
