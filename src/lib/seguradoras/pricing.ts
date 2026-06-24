// ─────────────────────────────────────────────────────────────────────────
//  Helpers de precificação para os connectors MOCK.
//
//  Geram preços e coberturas VARIADOS porém determinísticos por seguradora,
//  de forma a simular uma disputa de mercado real (cada seguradora tem
//  apetite de risco e tabela diferente). Determinístico = mesma cotação
//  retorna o mesmo número, essencial para recálculo e testes.
// ─────────────────────────────────────────────────────────────────────────

import type {
  CoberturaNormalizada,
  CotacaoRequest,
  OfertaSeguradora,
} from "./types";

// hash estável string → número 0..1 (sem dependências)
function seed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // normaliza para 0..1
  return (h >>> 0) / 4294967295;
}

export interface PerfilSeguradora {
  id: string;
  nome: string;
  logoUrl: string;
  // multiplicador base de preço (0.85 = mais barata, 1.2 = mais cara)
  fatorPreco: number;
  // apetite: chance de recusar perfis de risco (0..1, maior = mais conservadora)
  conservadorismo: number;
  notaAvaliacao: number;
  carenciaDias: number;
  destaques: string[];
}

interface CalculoParams {
  perfil: PerfilSeguradora;
  request: CotacaoRequest;
}

/**
 * Decide se a seguradora topa o risco. Connector real chamaria a API e
 * receberia uma recusa; aqui simulamos com base no perfil de risco.
 */
export function avaliaApetite({ perfil, request }: CalculoParams): {
  aceita: boolean;
  motivo?: string;
} {
  const { perfil: p, veiculo } = request;
  const ruido = seed(`${perfil.id}-${veiculo?.placa ?? veiculo?.modelo ?? "x"}`);

  let risco = 0;
  if (p.condutorJovem) risco += 0.25;
  if (p.usoVeiculo === "app") risco += 0.3;
  if (!p.garagemResidencia) risco += 0.15;
  if (p.idade < 25) risco += 0.2;
  if (veiculo && veiculo.anoModelo < 2010) risco += 0.15;

  // seguradoras conservadoras recusam riscos altos com mais frequência
  const limiar = 0.55 - perfil.conservadorismo * 0.25;
  if (risco > limiar && ruido < perfil.conservadorismo * 0.6) {
    let motivo = "Perfil fora do apetite de risco da seguradora.";
    if (p.usoVeiculo === "app")
      motivo = "Não cobre veículos com uso para aplicativo neste momento.";
    else if (p.condutorJovem)
      motivo = "Condutor jovem na residência indisponível para este produto.";
    return { aceita: false, motivo };
  }
  return { aceita: true };
}

/**
 * Calcula o preço anual com base no valor FIPE, perfil e tabela da seguradora.
 */
export function calculaPreco({ perfil, request }: CalculoParams): number {
  const valor = request.veiculo?.valorFipe ?? 50000;
  const ruido = seed(`${perfil.id}-${request.perfil.cep}-${valor}`);

  // prêmio base: ~3.5% a 5.5% do valor FIPE/ano, variando por seguradora
  const taxaBase = 0.035 + ruido * 0.02;
  let premio = valor * taxaBase * perfil.fatorPreco;

  // ajustes de perfil
  if (request.perfil.condutorJovem) premio *= 1.35;
  if (request.perfil.usoVeiculo === "app") premio *= 1.4;
  if (request.perfil.usoVeiculo === "trabalho") premio *= 1.1;
  if (!request.perfil.garagemResidencia) premio *= 1.12;
  if (request.perfil.idade < 25) premio *= 1.25;
  else if (request.perfil.idade > 50) premio *= 0.92;

  // ajustes de cobertura
  const c = request.coberturas;
  if (c.vidros) premio += 180 * perfil.fatorPreco;
  if (c.carroReserva) premio += c.carroReserva * 9;
  if (c.assistencia24h) premio += 120;
  if (c.appMorteInvalidez) premio += (c.appMorteInvalidez / 10000) * 25;
  if (c.rcfDanosMateriais) premio += (c.rcfDanosMateriais / 10000) * 18;
  if (c.franquiaReduzida) premio *= 1.15;

  return Math.round(premio);
}

export function calculaFranquia({ perfil, request }: CalculoParams): number {
  const valor = request.veiculo?.valorFipe ?? 50000;
  const base = valor * 0.05; // ~5% do valor
  const fator = request.coberturas.franquiaReduzida ? 0.6 : 1;
  // seguradoras mais baratas tendem a franquia maior
  const ajuste = 2 - perfil.fatorPreco;
  return Math.round((base * fator * ajuste) / 50) * 50;
}

export function montaCoberturas(
  request: CotacaoRequest,
  fatorPreco: number,
): CoberturaNormalizada[] {
  const c = request.coberturas;
  const valorFipe = request.veiculo?.valorFipe ?? 50000;
  const cobre = (key: string, on: boolean) => on;

  return [
    {
      chave: "casco",
      rotulo: "Colisão, incêndio, roubo e furto",
      incluida: c.casco ?? true,
      valor: valorFipe,
      descricao: "Cobertura compreensiva pelo valor de mercado (FIPE).",
    },
    {
      chave: "rcf_danos_materiais",
      rotulo: "Danos materiais a terceiros",
      incluida: !!c.rcfDanosMateriais,
      valor: c.rcfDanosMateriais ?? 50000,
    },
    {
      chave: "rcf_danos_corporais",
      rotulo: "Danos corporais a terceiros",
      incluida: !!c.rcfDanosCorporais,
      valor: c.rcfDanosCorporais ?? 100000,
    },
    {
      chave: "app",
      rotulo: "Acidentes pessoais de passageiros (APP)",
      incluida: !!c.appMorteInvalidez,
      valor: c.appMorteInvalidez ?? 0,
    },
    {
      chave: "vidros",
      rotulo: "Vidros, faróis e retrovisores",
      incluida: !!c.vidros,
    },
    {
      chave: "carro_reserva",
      rotulo: "Carro reserva",
      incluida: !!c.carroReserva,
      valor: c.carroReserva ?? 0,
      descricao: c.carroReserva ? `${c.carroReserva} dias` : undefined,
    },
    {
      chave: "assistencia",
      rotulo: "Assistência 24h (guincho, chaveiro)",
      // seguradoras premium incluem por padrão
      incluida: c.assistencia24h ?? fatorPreco > 1.0,
    },
  ];
}

export function montaOferta(
  perfil: PerfilSeguradora,
  request: CotacaoRequest,
): OfertaSeguradora {
  const precoAnual = calculaPreco({ perfil, request });
  const franquia = calculaFranquia({ perfil, request });
  const coberturas = montaCoberturas(request, perfil.fatorPreco);
  const assistencia24h =
    coberturas.find((x) => x.chave === "assistencia")?.incluida ?? false;

  return {
    seguradoraId: perfil.id,
    seguradoraNome: perfil.nome,
    logoUrl: perfil.logoUrl,
    precoAnual,
    precoMensal: Math.round((precoAnual / 12) * 100) / 100,
    franquia,
    assistencia24h,
    carenciaDias: perfil.carenciaDias,
    notaAvaliacao: perfil.notaAvaliacao,
    coberturas,
    destaques: perfil.destaques,
  };
}

// simula latência de rede variável por seguradora (streaming real)
export function latenciaSimulada(perfilId: string): number {
  const base = 400 + seed(perfilId) * 1800; // 0.4s a 2.2s
  return Math.round(base);
}

export function delay(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
