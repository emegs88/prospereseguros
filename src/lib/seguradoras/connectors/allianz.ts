import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── ALLIANZ ──────────────────────────────────────────────────────────────────
const perfil: PerfilSeguradora = {
  id: "allianz",
  nome: "Allianz",
  logoUrl: "/seguradoras/allianz.svg",
  fatorPreco: 1.12,
  conservadorismo: 0.6,
  notaAvaliacao: 4.5,
  carenciaDias: 0,
  destaques: ["Cobertura internacional", "Assistência 24h premium"],
};

/*
 * TODO: INTEGRAÇÃO REAL — ALLIANZ
 * endpoint: API Allianz Corretor ou agregador. Auth OAuth2. Mapear campos.
 */
export const allianzConnector = criarConnectorMock(perfil, [
  "AUTO",
  "MOTO",
  "VIDA",
  "RESIDENCIAL",
  "VIAGEM",
  "EMPRESARIAL",
]);
