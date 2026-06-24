// ─────────────────────────────────────────────────────────────────────────
//  CEP — MOCK.
//
//  Simula consulta de endereço por CEP. Em produção, trocar pela ViaCEP
//  (https://viacep.com.br/ws/{cep}/json/) mantendo a MESMA assinatura.
//  Veja docs/INTEGRACAO.md.
// ─────────────────────────────────────────────────────────────────────────

export interface EnderecoCep {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

const BASE: Record<string, Omit<EnderecoCep, "cep">> = {
  "13186237": {
    logradouro: "Av. da Emancipação",
    bairro: "Jardim do Bosque",
    cidade: "Hortolândia",
    uf: "SP",
  },
  "13183000": {
    logradouro: "Rua José Camargo",
    bairro: "Centro",
    cidade: "Hortolândia",
    uf: "SP",
  },
  "13070000": {
    logradouro: "Av. John Boyd Dunlop",
    bairro: "Jardim Ipaussurama",
    cidade: "Campinas",
    uf: "SP",
  },
  "13170000": {
    logradouro: "Av. da Saudade",
    bairro: "Centro",
    cidade: "Sumaré",
    uf: "SP",
  },
};

export function normalizarCep(cep: string): string {
  return cep.replace(/\D/g, "");
}

export function formatarCep(cep: string): string {
  const n = normalizarCep(cep);
  return n.length === 8 ? `${n.slice(0, 5)}-${n.slice(5)}` : cep;
}

export async function consultarCep(cep: string): Promise<EnderecoCep | null> {
  await new Promise((r) => setTimeout(r, 200));
  const n = normalizarCep(cep);
  if (n.length !== 8) return null;

  const achado = BASE[n];
  if (achado) return { cep: formatarCep(n), ...achado };

  // fallback genérico p/ qualquer CEP de SP válido no mock
  return {
    cep: formatarCep(n),
    logradouro: "Logradouro não identificado (mock)",
    bairro: "—",
    cidade: "São Paulo",
    uf: "SP",
  };
}
