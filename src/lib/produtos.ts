// ─────────────────────────────────────────────────────────────────────────
//  PRODUTOS (ramos de seguro) — metadados de apresentação.
//
//  Usado no seletor de ramos da Home, no menu e nas landings de produto.
//  O domínio de cálculo vive em lib/seguradoras/types.ts (type Ramo). Aqui
//  ficam apenas rótulo, descrição curta, ícone (lucide) e o destino (href).
// ─────────────────────────────────────────────────────────────────────────

import type { Ramo } from "@/lib/seguradoras/types";

export interface Produto {
  ramo: Ramo;
  slug: string;
  rotulo: string;
  descricao: string;
  /** nome do ícone lucide-react */
  icone:
    | "Car"
    | "Bike"
    | "HeartPulse"
    | "Home"
    | "Plane"
    | "Smartphone"
    | "Building2"
    | "PawPrint";
  href: string;
  destaque?: boolean;
  emBreve?: boolean;
}

export const PRODUTOS: Produto[] = [
  {
    ramo: "AUTO",
    slug: "auto",
    rotulo: "Auto",
    descricao: "Cote 8 seguradoras em 2 minutos e compare lado a lado.",
    icone: "Car",
    href: "/cotar/auto",
    destaque: true,
  },
  {
    ramo: "MOTO",
    slug: "moto",
    rotulo: "Moto",
    descricao: "Proteção completa para sua moto, contra roubo e terceiros.",
    icone: "Bike",
    href: "/cotar/moto",
  },
  {
    ramo: "VIDA",
    slug: "vida",
    rotulo: "Vida",
    descricao: "Tranquilidade para quem você ama, com coberturas flexíveis.",
    icone: "HeartPulse",
    href: "/cotar/vida",
  },
  {
    ramo: "RESIDENCIAL",
    slug: "residencial",
    rotulo: "Residencial",
    descricao: "Seu lar protegido contra incêndio, roubo e mais.",
    icone: "Home",
    href: "/cotar/residencial",
  },
  {
    ramo: "VIAGEM",
    slug: "viagem",
    rotulo: "Viagem",
    descricao: "Viaje sem preocupação, com assistência no mundo todo.",
    icone: "Plane",
    href: "/cotar/viagem",
  },
  {
    ramo: "CELULAR",
    slug: "celular",
    rotulo: "Celular",
    descricao: "Seu aparelho coberto contra quebra, roubo e furto.",
    icone: "Smartphone",
    href: "/cotar/celular",
  },
  {
    ramo: "EMPRESARIAL",
    slug: "empresarial",
    rotulo: "Empresarial",
    descricao: "Proteção sob medida para o seu negócio prosperar.",
    icone: "Building2",
    href: "/cotar/empresarial",
  },
  {
    ramo: "PET",
    slug: "pet",
    rotulo: "Pet",
    descricao: "Saúde e bem-estar do seu melhor amigo de quatro patas.",
    icone: "PawPrint",
    href: "/cotar/pet",
  },
];

export function produtoPorSlug(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug);
}
