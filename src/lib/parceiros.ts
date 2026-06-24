// ─────────────────────────────────────────────────────────────────────────
//  SEGURADORAS PARCEIRAS — fonte única para a régua "Nossos parceiros".
//
//  Estas são as marcas reais com as quais a Prospere trabalha. Os logos são
//  renderizados como SVG vetorial pelo componente <PartnerLogo>, recriando a
//  cor/estilo de cada marca (sem depender de arquivos de imagem externos).
//
//  COMO DEIXAR OS LOGOS EXATOS (arquivo oficial de cada marca):
//    1. Salve 1 arquivo POR seguradora, fundo transparente, em
//       /public/seguradoras/<id>.svg  (ou .png), nomeado pelo `id` abaixo.
//    2. Marque `logoOficial: true` na marca correspondente (ou informe o
//       caminho exato em `logo`).
//    O <PartnerLogo> passa a renderizar o arquivo real automaticamente; quem
//    não tiver arquivo continua no vetor desenhado. (ver public/seguradoras/README.md)
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
  /**
   * Caminho do logo OFICIAL (em /public). Se preenchido, o <PartnerLogo>
   * renderiza este arquivo real em vez do vetor desenhado — fica exato.
   * Ex.: "/seguradoras/azul.svg"
   */
  logo?: string;
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
