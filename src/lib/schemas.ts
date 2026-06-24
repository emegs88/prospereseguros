// ─────────────────────────────────────────────────────────────────────────
//  Validação (Zod) — fronteira do sistema.
//
//  Tudo que entra via formulário ou API é validado aqui antes de virar um
//  CotacaoRequest (types.ts). Mantém o domínio limpo e dá mensagens em pt-BR.
// ─────────────────────────────────────────────────────────────────────────

import { z } from "zod";
import { RAMOS } from "./seguradoras/types";
import { normalizarCep } from "./cep";

export const ramoSchema = z.enum(RAMOS as [string, ...string[]]);

export const cepSchema = z
  .string()
  .transform(normalizarCep)
  .refine((v) => v.length === 8, "CEP deve ter 8 dígitos");

export const perfilSchema = z.object({
  cep: cepSchema,
  idade: z
    .number({ invalid_type_error: "Informe a idade" })
    .int()
    .min(18, "Idade mínima de 18 anos")
    .max(99, "Idade inválida"),
  sexo: z.enum(["M", "F", "OUTRO"]).optional(),
  usoVeiculo: z.enum(["particular", "trabalho", "app"]).optional(),
  garagemResidencia: z.boolean().optional(),
  garagemTrabalho: z.boolean().optional(),
  condutorJovem: z.boolean().optional(),
});

export const veiculoSchema = z.object({
  placa: z
    .string()
    .regex(/^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/i, "Placa inválida")
    .optional()
    .or(z.literal("")),
  fipe: z.string().optional(),
  marca: z.string().min(1, "Selecione a marca"),
  modelo: z.string().min(1, "Selecione o modelo"),
  anoModelo: z
    .number()
    .int()
    .min(1990, "Ano inválido")
    .max(new Date().getFullYear() + 1),
  anoFabricacao: z.number().int().optional(),
  valorFipe: z.number().positive("Valor FIPE inválido"),
  zeroKm: z.boolean().optional(),
  combustivel: z.string().optional(),
});

export const coberturasSchema = z.object({
  casco: z.boolean().optional(),
  rcfDanosMateriais: z.number().nonnegative().optional(),
  rcfDanosCorporais: z.number().nonnegative().optional(),
  appMorteInvalidez: z.number().nonnegative().optional(),
  vidros: z.boolean().optional(),
  carroReserva: z.number().int().nonnegative().optional(),
  assistencia24h: z.boolean().optional(),
  franquiaReduzida: z.boolean().optional(),
});

export const cotacaoRequestSchema = z.object({
  ramo: ramoSchema,
  cotacaoId: z.string().optional(),
  perfil: perfilSchema,
  veiculo: veiculoSchema.optional(),
  coberturas: coberturasSchema,
  extra: z.record(z.unknown()).optional(),
});

// ── Lead (capturado antes de abrir o WhatsApp) ─────────────────────────────

export const leadSchema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  telefone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 10 && v.length <= 11, "Telefone inválido"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  ramo: ramoSchema.optional(),
  cotacaoId: z.string().optional(),
  origem: z.string().optional(),
  consentimentoLgpd: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar a política de privacidade"),
});

export type CotacaoRequestInput = z.infer<typeof cotacaoRequestSchema>;
export type LeadInput = z.infer<typeof leadSchema>;
