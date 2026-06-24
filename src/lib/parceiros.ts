// ─────────────────────────────────────────────────────────────────────────
//  SEGURADORAS PARCEIRAS — fonte única para a régua "Nossos parceiros".
//
//  Estas são as marcas reais com as quais a Prospere trabalha. Os logos são
//  renderizados como SVG vetorial pelo componente <PartnerLogo>, recriando a
//  cor/estilo de cada marca (sem depender de arquivos de imagem externos).
//
//  Para usar os PNG/SVG oficiais das seguradoras no lugar do vetor:
//    1. Salve o arquivo em /public/seguradoras/<id>.svg
//    2. Em <PartnerLogo> troque o render do <id> por <img src={...}>
//  (ver docs/INTEGRACAO.md)
// ─────────────────────────────────────────────────────────────────────────

export type ParceiroId =
  | "allianz"
  | "azul"
  | "bradesco"
  | "hdi"
  | "mapfre"
  | "porto"
  | "suhai"
  | "sulamerica"
  | "tokio"
  | "youse";

export interface Parceiro {
  id: ParceiroId;
  nome: string;
}

export const PARCEIROS: Parceiro[] = [
  { id: "allianz", nome: "Allianz" },
  { id: "azul", nome: "Azul Seguros" },
  { id: "bradesco", nome: "Bradesco Seguros" },
  { id: "hdi", nome: "HDI Seguros" },
  { id: "mapfre", nome: "MAPFRE" },
  { id: "porto", nome: "Porto Seguro" },
  { id: "suhai", nome: "Suhai Seguros" },
  { id: "sulamerica", nome: "SulAmérica" },
  { id: "tokio", nome: "Tokio Marine Seguradora" },
];
