import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formata número como moeda BRL. */
export function brl(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: valor % 1 === 0 ? 0 : 2,
  }).format(valor);
}

/** Gera código amigável de cotação: PRO-4821 */
export function gerarCodigoCotacao(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `PRO-${n}`;
}

/** Gera código de proposta: PROP-2026-0001 (timestamp curto). */
export function gerarCodigoProposta(): string {
  return `PROP-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
}
