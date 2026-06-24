import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── AZUL SEGUROS ─────────────────────────────────────────────────────────────
// Competitiva em preço, apetite mais aberto.
const perfil: PerfilSeguradora = {
  id: "azul",
  nome: "Azul Seguros",
  logoUrl: "/seguradoras/azul.svg",
  fatorPreco: 0.9,
  conservadorismo: 0.3,
  notaAvaliacao: 4.2,
  carenciaDias: 0,
  destaques: ["Preço competitivo", "Desconto perfil exclusivo"],
};

/*
 * TODO: INTEGRAÇÃO REAL — AZUL SEGUROS (grupo Porto)
 * endpoint: API Azul/Porto Corretor ou agregador. Auth de corretor.
 */
export const azulConnector = criarConnectorMock(perfil, [
  "AUTO",
  "MOTO",
  "RESIDENCIAL",
]);
