import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── PORTO SEGURO ─────────────────────────────────────────────────────────────
// Premium, completa, mais cara, nota alta. Conservadora em risco.
const perfil: PerfilSeguradora = {
  id: "porto",
  nome: "Porto Seguro",
  logoUrl: "/seguradoras/porto.svg",
  fatorPreco: 1.18,
  conservadorismo: 0.7,
  notaAvaliacao: 4.7,
  carenciaDias: 0,
  destaques: ["Maior rede de oficinas", "Assistência 24h incluída", "App premium"],
};

/*
 * TODO: INTEGRAÇÃO REAL — PORTO SEGURO
 * --------------------------------------------------------------------------
 * Opção A (direto): API Porto Seguro Corretor / Webservice de cotação Auto.
 *   - endpoint cotação:  POST https://api.portoseguro.com.br/.../cotacoes
 *   - auth:              OAuth2 client_credentials (PORTO_CLIENT_ID/SECRET)
 *   - mapeamento:        FIPE → codFipe; CEP → cepPernoite; coberturas → grupos
 *   - resposta:          premioAnual, franquia, coberturasContratadas[]
 *
 * Opção B (agregador): TELEPORT / TEx (Serasa), Quiver ou TacSeg dão acesso a
 *   várias seguradoras com UM connector. Recomendado para começar rápido.
 *
 * Para integrar: substitua `criarConnectorMock(perfil, [...])` por um objeto
 * que implemente SeguradoraConnector com as chamadas HTTP reais.
 */
export const portoConnector = criarConnectorMock(perfil, [
  "AUTO",
  "MOTO",
  "VIDA",
  "RESIDENCIAL",
  "EMPRESARIAL",
]);
