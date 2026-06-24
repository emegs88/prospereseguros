// ─────────────────────────────────────────────────────────────────────────
//  WhatsApp — deep links contextuais (Núcleo 5).
//
//  Toda CTA de WhatsApp no site passa por aqui. A mensagem é pré-preenchida
//  conforme o contexto (ramo, código de cotação, oferta escolhida) para que a
//  Carla já receba o lead "quente" e com contexto, sem precisar perguntar tudo
//  de novo. O lead deve ser persistido ANTES de abrir o link (ver API /lead).
// ─────────────────────────────────────────────────────────────────────────

import { EMPRESA } from "./empresa";
import type { Ramo } from "./seguradoras/types";

const NUMERO = EMPRESA.contato.whatsapp; // 5519995431000

const RAMO_LABEL: Record<Ramo, string> = {
  AUTO: "Seguro Auto",
  MOTO: "Seguro Moto",
  VIDA: "Seguro de Vida",
  RESIDENCIAL: "Seguro Residencial",
  VIAGEM: "Seguro Viagem",
  CELULAR: "Seguro de Celular",
  EMPRESARIAL: "Seguro Empresarial",
  PET: "Seguro Pet",
};

export interface ContextoWhatsApp {
  ramo?: Ramo;
  codigoCotacao?: string;
  seguradora?: string;
  precoMensal?: number;
  origem?: string; // ex.: "home", "comparador", "checkout"
  mensagemLivre?: string;
}

/** Monta a mensagem pré-preenchida a partir do contexto. */
export function montarMensagem(ctx: ContextoWhatsApp = {}): string {
  if (ctx.mensagemLivre) return ctx.mensagemLivre;

  const linhas: string[] = ["Olá! Vim pelo site da Prospere Seguros."];

  if (ctx.ramo) {
    linhas.push(`Tenho interesse em *${RAMO_LABEL[ctx.ramo]}*.`);
  }
  if (ctx.seguradora) {
    const preco = ctx.precoMensal
      ? ` (a partir de R$ ${ctx.precoMensal.toFixed(2).replace(".", ",")}/mês)`
      : "";
    linhas.push(`Gostei da oferta da *${ctx.seguradora}*${preco}.`);
  }
  if (ctx.codigoCotacao) {
    linhas.push(`Minha cotação é a *${ctx.codigoCotacao}*.`);
  }
  linhas.push("Pode me ajudar?");

  return linhas.join("\n");
}

/** URL wa.me com a mensagem contextual já codificada. */
export function whatsappLink(ctx: ContextoWhatsApp = {}): string {
  const texto = montarMensagem(ctx);
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}`;
}
