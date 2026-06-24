// ─────────────────────────────────────────────────────────────────────────
//  MOTOR DE MULTICÁLCULO — Tipos de domínio (interface única)
//
//  Toda seguradora, com sua API heterogênea, é normalizada para estas
//  estruturas. O front e o comparador NUNCA falam com a API da seguradora
//  diretamente — falam apenas com estes tipos. Isso é o que torna o sistema
//  plugável: trocar um mock por integração real é trocar UM connector.
// ─────────────────────────────────────────────────────────────────────────

export type Ramo =
  | "AUTO"
  | "MOTO"
  | "VIDA"
  | "RESIDENCIAL"
  | "VIAGEM"
  | "CELULAR"
  | "EMPRESARIAL"
  | "PET";

export const RAMOS: Ramo[] = [
  "AUTO",
  "MOTO",
  "VIDA",
  "RESIDENCIAL",
  "VIAGEM",
  "CELULAR",
  "EMPRESARIAL",
  "PET",
];

// ── Entrada da cotação (payload normalizado por ramo) ────────────────────────

export interface PerfilCondutor {
  cep: string;
  idade: number;
  sexo?: "M" | "F" | "OUTRO";
  usoVeiculo?: "particular" | "trabalho" | "app"; // Uber/99
  garagemResidencia?: boolean;
  garagemTrabalho?: boolean;
  condutorJovem?: boolean; // 18-25 mora na residência
}

export interface DadosVeiculo {
  placa?: string;
  fipe?: string; // código FIPE
  marca: string;
  modelo: string;
  anoModelo: number;
  anoFabricacao?: number;
  valorFipe: number;
  zeroKm?: boolean;
  combustivel?: string;
}

// coberturas que o cliente quer (ajustáveis no comparador → recálculo)
export interface CoberturasDesejadas {
  casco?: boolean; // colisão, incêndio, roubo/furto
  rcfDanosMateriais?: number; // limite RCF danos materiais a terceiros
  rcfDanosCorporais?: number;
  appMorteInvalidez?: number; // acidentes pessoais por passageiro
  vidros?: boolean;
  carroReserva?: number; // dias
  assistencia24h?: boolean;
  franquiaReduzida?: boolean;
}

export interface CotacaoRequest {
  ramo: Ramo;
  cotacaoId?: string; // preenchido quando já persistido
  perfil: PerfilCondutor;
  veiculo?: DadosVeiculo; // AUTO/MOTO
  coberturas: CoberturasDesejadas;
  // dados específicos de outros ramos entram aqui (ex.: viagem, pet)
  extra?: Record<string, unknown>;
}

// ── Saída normalizada de UMA seguradora ──────────────────────────────────────

export interface CoberturaNormalizada {
  chave: string;
  rotulo: string;
  incluida: boolean;
  valor?: number; // limite/capital quando aplicável
  descricao?: string;
}

export interface OfertaSeguradora {
  seguradoraId: string;
  seguradoraNome: string;
  logoUrl: string;
  precoAnual: number;
  precoMensal: number;
  franquia: number;
  assistencia24h: boolean;
  carenciaDias: number;
  notaAvaliacao: number; // 0..5
  coberturas: CoberturaNormalizada[];
  // selo extra do connector ("parcelamento em 12x sem juros" etc.)
  destaques?: string[];
}

export type ResultadoCotacao =
  | { status: "COTADO"; oferta: OfertaSeguradora }
  | {
      status: "INDISPONIVEL";
      seguradoraId: string;
      seguradoraNome: string;
      logoUrl: string;
      motivo: string;
    };

// ── Emissão e status (pós-venda) ─────────────────────────────────────────────

export interface ApoliceResponse {
  apoliceId: string;
  numero: string;
  vigenciaInicio: string;
  vigenciaFim: string;
  documentoUrl?: string;
}

export interface StatusResponse {
  apoliceId: string;
  status: "ATIVA" | "PENDENTE" | "CANCELADA" | "VENCIDA";
  atualizadoEm: string;
}

// ── O contrato que TODA seguradora implementa ────────────────────────────────

export interface SeguradoraConnector {
  id: string;
  nome: string;
  logoUrl: string;
  ramosSuportados: Ramo[];
  cotar(payload: CotacaoRequest): Promise<ResultadoCotacao>;
  emitir(propostaId: string): Promise<ApoliceResponse>;
  consultarStatus(apoliceId: string): Promise<StatusResponse>;
}
