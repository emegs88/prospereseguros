// ─────────────────────────────────────────────────────────────────────────
//  NÚCLEO 1 — MOTOR DE MULTICÁLCULO
//
//  Dispara TODAS as seguradoras do ramo em PARALELO (Promise.allSettled),
//  com tolerância a falha: se um connector cair ou estourar timeout, os
//  demais seguem normalmente e ele vira um card "indisponível".
//
//  Dois modos:
//   • cotarTodas()      → aguarda tudo e devolve o array (uso simples/server).
//   • cotarStreaming()  → AsyncGenerator: emite cada resultado assim que chega
//                          (usado pela rota SSE → cards aparecem um a um).
// ─────────────────────────────────────────────────────────────────────────

import { connectorsPorRamo } from "./registry";
import type { CotacaoRequest, ResultadoCotacao } from "./types";

const TIMEOUT_MS = 8000;

function comTimeout(
  promise: Promise<ResultadoCotacao>,
  seguradoraId: string,
  seguradoraNome: string,
  logoUrl: string,
): Promise<ResultadoCotacao> {
  return Promise.race<ResultadoCotacao>([
    promise,
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            status: "INDISPONIVEL",
            seguradoraId,
            seguradoraNome,
            logoUrl,
            motivo: "Seguradora não respondeu a tempo. Tente novamente.",
          }),
        TIMEOUT_MS,
      ),
    ),
  ]);
}

/** Executa o multicálculo e aguarda todos os resultados. */
export async function cotarTodas(
  request: CotacaoRequest,
): Promise<ResultadoCotacao[]> {
  const lista = connectorsPorRamo(request.ramo);

  const resultados = await Promise.allSettled(
    lista.map((c) =>
      comTimeout(c.cotar(request), c.id, c.nome, c.logoUrl),
    ),
  );

  return resultados.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    // tolerância a falha: connector lançou exceção → vira indisponível
    const c = lista[i];
    return {
      status: "INDISPONIVEL",
      seguradoraId: c.id,
      seguradoraNome: c.nome,
      logoUrl: c.logoUrl,
      motivo: "Falha temporária na comunicação com a seguradora.",
    };
  });
}

/**
 * Versão streaming: emite cada resultado assim que a seguradora responde.
 * A UI mostra skeleton por seguradora e troca por card real conforme chega.
 */
export async function* cotarStreaming(
  request: CotacaoRequest,
): AsyncGenerator<ResultadoCotacao> {
  const lista = connectorsPorRamo(request.ramo);

  // cada promise resolve com o resultado já normalizado
  const pendentes = lista.map((c) =>
    comTimeout(c.cotar(request), c.id, c.nome, c.logoUrl).catch(
      (): ResultadoCotacao => ({
        status: "INDISPONIVEL",
        seguradoraId: c.id,
        seguradoraNome: c.nome,
        logoUrl: c.logoUrl,
        motivo: "Falha temporária na comunicação com a seguradora.",
      }),
    ),
  );

  // técnica para "yield assim que qualquer um resolve": envolvemos cada
  // promise com seu índice e vamos removendo da fila conforme resolvem.
  const indexados = pendentes.map((p, i) =>
    p.then((res) => ({ res, i })),
  );
  const restantes = new Map(indexados.map((p, i) => [i, p]));

  while (restantes.size > 0) {
    const { res, i } = await Promise.race(restantes.values());
    restantes.delete(i);
    yield res;
  }
}

/** Lista de seguradoras que serão consultadas (para montar skeletons). */
export function seguradorasDoRamo(request: Pick<CotacaoRequest, "ramo">) {
  return connectorsPorRamo(request.ramo).map((c) => ({
    id: c.id,
    nome: c.nome,
    logoUrl: c.logoUrl,
  }));
}
