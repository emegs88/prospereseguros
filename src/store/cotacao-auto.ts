// ─────────────────────────────────────────────────────────────────────────
//  Store do fluxo Quick Quote AUTO (Zustand).
//
//  Guarda o estado do wizard multi-step (veículo → perfil → coberturas → lead)
//  e o resultado do streaming de ofertas. O comparador lê deste mesmo store,
//  então recálculo e ajuste de coberturas vivem aqui.
// ─────────────────────────────────────────────────────────────────────────

"use client";

import { create } from "zustand";
import type {
  CoberturasDesejadas,
  CotacaoRequest,
  OfertaSeguradora,
  PerfilCondutor,
  ResultadoCotacao,
} from "@/lib/seguradoras/types";

export type PassoAuto = "veiculo" | "perfil" | "coberturas" | "resultado";

export const ORDEM_PASSOS: PassoAuto[] = [
  "veiculo",
  "perfil",
  "coberturas",
  "resultado",
];

// dados do veículo em construção (campos podem faltar enquanto preenche)
export interface VeiculoForm {
  marcaCodigo?: string;
  marcaNome?: string;
  modeloCodigo?: string;
  modeloNome?: string;
  anoModelo?: number;
  valorFipe?: number;
  fipe?: string;
  placa?: string;
  zeroKm?: boolean;
}

export interface PerfilForm {
  cep?: string;
  cidade?: string;
  uf?: string;
  idade?: number;
  sexo?: "M" | "F" | "OUTRO";
  usoVeiculo?: "particular" | "trabalho" | "app";
  garagemResidencia?: boolean;
  condutorJovem?: boolean;
}

const COBERTURAS_PADRAO: CoberturasDesejadas = {
  casco: true,
  rcfDanosMateriais: 100000,
  rcfDanosCorporais: 100000,
  appMorteInvalidez: 50000,
  vidros: true,
  carroReserva: 15,
  assistencia24h: true,
  franquiaReduzida: false,
};

interface CotacaoAutoState {
  passo: PassoAuto;
  veiculo: VeiculoForm;
  perfil: PerfilForm;
  coberturas: CoberturasDesejadas;

  // streaming de resultados
  cotacaoId?: string;
  carregando: boolean;
  esperando: Set<string>; // seguradoras anunciadas, ainda sem resposta
  resultados: ResultadoCotacao[];
  erro?: string;

  // navegação
  irPara: (p: PassoAuto) => void;
  avancar: () => void;
  voltar: () => void;

  // mutações de formulário
  setVeiculo: (v: Partial<VeiculoForm>) => void;
  setPerfil: (p: Partial<PerfilForm>) => void;
  setCoberturas: (c: Partial<CoberturasDesejadas>) => void;

  // helpers
  montarRequest: () => CotacaoRequest | null;
  resetResultados: () => void;
  iniciarStreaming: (seguradoras: { id: string }[], cotacaoId: string) => void;
  receberResultado: (r: ResultadoCotacao) => void;
  finalizarStreaming: () => void;
  falharStreaming: (msg: string) => void;
  reiniciar: () => void;

  ofertas: () => OfertaSeguradora[];
}

const ESTADO_INICIAL = {
  passo: "veiculo" as PassoAuto,
  veiculo: {} as VeiculoForm,
  perfil: {} as PerfilForm,
  coberturas: { ...COBERTURAS_PADRAO },
  cotacaoId: undefined,
  carregando: false,
  esperando: new Set<string>(),
  resultados: [] as ResultadoCotacao[],
  erro: undefined,
};

export const useCotacaoAuto = create<CotacaoAutoState>((set, get) => ({
  ...ESTADO_INICIAL,

  irPara: (p) => set({ passo: p }),

  avancar: () => {
    const atual = get().passo;
    const i = ORDEM_PASSOS.indexOf(atual);
    const prox = ORDEM_PASSOS[Math.min(i + 1, ORDEM_PASSOS.length - 1)];
    set({ passo: prox });
  },

  voltar: () => {
    const atual = get().passo;
    const i = ORDEM_PASSOS.indexOf(atual);
    const ant = ORDEM_PASSOS[Math.max(i - 1, 0)];
    set({ passo: ant });
  },

  setVeiculo: (v) => set((s) => ({ veiculo: { ...s.veiculo, ...v } })),
  setPerfil: (p) => set((s) => ({ perfil: { ...s.perfil, ...p } })),
  setCoberturas: (c) =>
    set((s) => ({ coberturas: { ...s.coberturas, ...c } })),

  montarRequest: () => {
    const { veiculo, perfil, coberturas } = get();
    if (
      !veiculo.marcaNome ||
      !veiculo.modeloNome ||
      !veiculo.anoModelo ||
      !veiculo.valorFipe ||
      !perfil.cep ||
      !perfil.idade
    ) {
      return null;
    }

    const perfilCondutor: PerfilCondutor = {
      cep: perfil.cep,
      idade: perfil.idade,
      sexo: perfil.sexo,
      usoVeiculo: perfil.usoVeiculo,
      garagemResidencia: perfil.garagemResidencia,
      condutorJovem: perfil.condutorJovem,
    };

    return {
      ramo: "AUTO",
      cotacaoId: get().cotacaoId,
      perfil: perfilCondutor,
      veiculo: {
        placa: veiculo.placa || undefined,
        fipe: veiculo.fipe,
        marca: veiculo.marcaNome,
        modelo: veiculo.modeloNome,
        anoModelo: veiculo.anoModelo,
        valorFipe: veiculo.valorFipe,
        zeroKm: veiculo.zeroKm,
      },
      coberturas,
    };
  },

  resetResultados: () =>
    set({
      resultados: [],
      esperando: new Set(),
      carregando: false,
      erro: undefined,
    }),

  iniciarStreaming: (seguradoras, cotacaoId) =>
    set({
      carregando: true,
      erro: undefined,
      resultados: [],
      cotacaoId,
      esperando: new Set(seguradoras.map((s) => s.id)),
    }),

  receberResultado: (r) =>
    set((s) => {
      const id =
        r.status === "COTADO" ? r.oferta.seguradoraId : r.seguradoraId;
      const esperando = new Set(s.esperando);
      esperando.delete(id);
      return { resultados: [...s.resultados, r], esperando };
    }),

  finalizarStreaming: () =>
    set({ carregando: false, esperando: new Set() }),

  falharStreaming: (msg) =>
    set({ carregando: false, erro: msg, esperando: new Set() }),

  reiniciar: () => set({ ...ESTADO_INICIAL, esperando: new Set() }),

  ofertas: () =>
    get()
      .resultados.filter(
        (r): r is Extract<ResultadoCotacao, { status: "COTADO" }> =>
          r.status === "COTADO",
      )
      .map((r) => r.oferta),
}));
