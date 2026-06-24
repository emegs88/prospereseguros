import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── SULAMÉRICA ───────────────────────────────────────────────────────────────
const perfil: PerfilSeguradora = {
  id: "sulamerica",
  nome: "SulAmérica",
  logoUrl: "/seguradoras/sulamerica.svg",
  fatorPreco: 1.08,
  conservadorismo: 0.5,
  notaAvaliacao: 4.4,
  carenciaDias: 0,
  destaques: ["Forte em Vida e Saúde", "Programa de benefícios"],
};

/*
 * TODO: INTEGRAÇÃO REAL — SULAMÉRICA
 * endpoint: API SulAmérica Corretor ou agregador. OAuth2. Mapear campos.
 */
export const sulamericaConnector = criarConnectorMock(perfil, [
  "AUTO",
  "VIDA",
  "RESIDENCIAL",
  "VIAGEM",
  "EMPRESARIAL",
]);
