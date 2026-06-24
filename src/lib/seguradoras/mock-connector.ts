// ─────────────────────────────────────────────────────────────────────────
//  Fábrica de connector MOCK.
//
//  Cada seguradora real terá seu próprio arquivo connector que implementa
//  SeguradoraConnector chamando a API verdadeira. Enquanto isso, criamos
//  connectors mock a partir de um PerfilSeguradora.
//
//  PARA INTEGRAR DE VERDADE: copie a estrutura de um connector real
//  (ex.: ./connectors/porto.ts) e substitua o corpo de `cotar`, `emitir` e
//  `consultarStatus` pelas chamadas HTTP reais + mapeamento de campos.
// ─────────────────────────────────────────────────────────────────────────

import type {
  ApoliceResponse,
  CotacaoRequest,
  Ramo,
  ResultadoCotacao,
  SeguradoraConnector,
  StatusResponse,
} from "./types";
import {
  avaliaApetite,
  delay,
  latenciaSimulada,
  montaOferta,
  type PerfilSeguradora,
} from "./pricing";

export function criarConnectorMock(
  perfil: PerfilSeguradora,
  ramosSuportados: Ramo[],
): SeguradoraConnector {
  return {
    id: perfil.id,
    nome: perfil.nome,
    logoUrl: perfil.logoUrl,
    ramosSuportados,

    async cotar(payload: CotacaoRequest): Promise<ResultadoCotacao> {
      // simula latência de rede real (resultados chegam em tempos diferentes)
      await delay(latenciaSimulada(perfil.id));

      if (!ramosSuportados.includes(payload.ramo)) {
        return {
          status: "INDISPONIVEL",
          seguradoraId: perfil.id,
          seguradoraNome: perfil.nome,
          logoUrl: perfil.logoUrl,
          motivo: "Ramo não comercializado por esta seguradora.",
        };
      }

      const apetite = avaliaApetite({ perfil, request: payload });
      if (!apetite.aceita) {
        return {
          status: "INDISPONIVEL",
          seguradoraId: perfil.id,
          seguradoraNome: perfil.nome,
          logoUrl: perfil.logoUrl,
          motivo: apetite.motivo ?? "Risco não aceito.",
        };
      }

      return { status: "COTADO", oferta: montaOferta(perfil, payload) };
    },

    async emitir(propostaId: string): Promise<ApoliceResponse> {
      await delay(latenciaSimulada(perfil.id));
      const ano = new Date();
      const fim = new Date(ano);
      fim.setFullYear(fim.getFullYear() + 1);
      return {
        apoliceId: `AP-${perfil.id.toUpperCase()}-${propostaId.slice(-6)}`,
        numero: `${perfil.id.toUpperCase()}${Date.now().toString().slice(-8)}`,
        vigenciaInicio: ano.toISOString(),
        vigenciaFim: fim.toISOString(),
        // TODO: integração real — URL do PDF da apólice retornada pela seguradora.
        documentoUrl: undefined,
      };
    },

    async consultarStatus(apoliceId: string): Promise<StatusResponse> {
      await delay(300);
      return {
        apoliceId,
        status: "ATIVA",
        atualizadoEm: new Date().toISOString(),
      };
    },
  };
}
