import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── YOUSE (digital, grupo Caixa) ─────────────────────────────────────────────
// 100% digital, preço agressivo, apetite aberto, carência curta.
const perfil: PerfilSeguradora = {
  id: "youse",
  nome: "Youse",
  logoUrl: "/seguradoras/youse.svg",
  fatorPreco: 0.86,
  conservadorismo: 0.25,
  notaAvaliacao: 4.1,
  carenciaDias: 0,
  destaques: ["100% digital", "Monte seu seguro", "Sem letras miúdas"],
};

/*
 * TODO: INTEGRAÇÃO REAL — YOUSE
 * endpoint: API Youse (parceiro) ou agregador. Auth via token. Mapear coberturas
 * modulares (Youse trabalha com "monte seu seguro").
 */
export const youseConnector = criarConnectorMock(perfil, [
  "AUTO",
  "MOTO",
  "VIDA",
  "RESIDENCIAL",
  "CELULAR",
  "PET",
]);
