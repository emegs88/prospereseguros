// ─────────────────────────────────────────────────────────────────────────
//  Registro central de connectors de seguradoras.
//
//  Adicionar uma nova seguradora = criar o connector em ./connectors e
//  registrá-lo aqui. Nada mais no app precisa mudar.
// ─────────────────────────────────────────────────────────────────────────

import type { Ramo, SeguradoraConnector } from "./types";
import { portoConnector } from "./connectors/porto";
import { bradescoConnector } from "./connectors/bradesco";
import { allianzConnector } from "./connectors/allianz";
import { hdiConnector } from "./connectors/hdi";
import { tokioConnector } from "./connectors/tokio";
import { azulConnector } from "./connectors/azul";
import { sulamericaConnector } from "./connectors/sulamerica";
import { youseConnector } from "./connectors/youse";

export const connectors: SeguradoraConnector[] = [
  portoConnector,
  bradescoConnector,
  allianzConnector,
  hdiConnector,
  tokioConnector,
  azulConnector,
  sulamericaConnector,
  youseConnector,
];

export function connectorsPorRamo(ramo: Ramo): SeguradoraConnector[] {
  return connectors.filter((c) => c.ramosSuportados.includes(ramo));
}

export function connectorPorId(id: string): SeguradoraConnector | undefined {
  return connectors.find((c) => c.id === id);
}

// metadados leves para exibir logos de parceiras na home/sinais de confiança
export const seguradorasParceiras = connectors.map((c) => ({
  id: c.id,
  nome: c.nome,
  logoUrl: c.logoUrl,
}));
