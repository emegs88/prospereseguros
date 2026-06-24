import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── TOKIO MARINE ─────────────────────────────────────────────────────────────
const perfil: PerfilSeguradora = {
  id: "tokio",
  nome: "Tokio Marine",
  logoUrl: "/seguradoras/tokio.svg",
  fatorPreco: 1.02,
  conservadorismo: 0.5,
  notaAvaliacao: 4.6,
  carenciaDias: 0,
  destaques: ["Atendimento bem avaliado", "Rede de oficinas ampla"],
};

/*
 * TODO: INTEGRAÇÃO REAL — TOKIO MARINE
 * endpoint: API Tokio Marine Corretor ou agregador. OAuth2. Mapear campos.
 */
export const tokioConnector = criarConnectorMock(perfil, [
  "AUTO",
  "MOTO",
  "VIDA",
  "RESIDENCIAL",
  "VIAGEM",
  "EMPRESARIAL",
]);
