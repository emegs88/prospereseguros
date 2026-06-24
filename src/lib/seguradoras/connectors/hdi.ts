import { criarConnectorMock } from "../mock-connector";
import type { PerfilSeguradora } from "../pricing";

// ── HDI SEGUROS ──────────────────────────────────────────────────────────────
// Boa relação custo-benefício, apetite moderado.
const perfil: PerfilSeguradora = {
  id: "hdi",
  nome: "HDI Seguros",
  logoUrl: "/seguradoras/hdi.svg",
  fatorPreco: 0.95,
  conservadorismo: 0.4,
  notaAvaliacao: 4.3,
  carenciaDias: 0,
  destaques: ["Bom custo-benefício", "Franquia flexível"],
};

/*
 * TODO: INTEGRAÇÃO REAL — HDI SEGUROS
 * endpoint: API HDI ou agregador. Auth de corretor. Mapear FIPE/CEP/coberturas.
 */
export const hdiConnector = criarConnectorMock(perfil, [
  "AUTO",
  "MOTO",
  "RESIDENCIAL",
  "EMPRESARIAL",
]);
