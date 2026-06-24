import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── BRADESCO SEGUROS ─────────────────────────────────────────────────────────
const perfil: PerfilSeguradora = {
  id: "bradesco",
  nome: "Bradesco Seguros",
  logoUrl: "/seguradoras/bradesco.svg",
  fatorPreco: 1.05,
  conservadorismo: 0.55,
  notaAvaliacao: 4.4,
  carenciaDias: 0,
  destaques: ["Desconto para clientes do banco", "Parcelamento em 12x"],
};

/*
 * TODO: INTEGRAÇÃO REAL — BRADESCO SEGUROS
 * endpoint: API Bradesco Seguros (corretor) ou via agregador (TEx/Quiver).
 * auth: OAuth2 / token de corretor. Mapear FIPE, CEP, perfil e coberturas.
 */
export const bradescoConnector = criarConnectorMock(perfil, [
  "AUTO",
  "VIDA",
  "RESIDENCIAL",
  "EMPRESARIAL",
]);
