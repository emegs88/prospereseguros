// ─────────────────────────────────────────────────────────────────────────
//  FIPE — MOCK.
//
//  Simula a consulta de marcas/modelos/valor FIPE. Em produção, trocar o corpo
//  destas funções pela API real (ex.: Parallelum / fipe.org.br) mantendo a MESMA
//  assinatura — nada no resto do app muda. Veja docs/INTEGRACAO.md.
// ─────────────────────────────────────────────────────────────────────────

export interface FipeMarca {
  codigo: string;
  nome: string;
}

export interface FipeModelo {
  codigo: string;
  nome: string;
}

export interface FipeValor {
  fipe: string;
  marca: string;
  modelo: string;
  anoModelo: number;
  combustivel: string;
  valorFipe: number;
}

const MARCAS: FipeMarca[] = [
  { codigo: "21", nome: "Fiat" },
  { codigo: "59", nome: "Volkswagen" },
  { codigo: "23", nome: "GM - Chevrolet" },
  { codigo: "22", nome: "Ford" },
  { codigo: "26", nome: "Honda" },
  { codigo: "56", nome: "Toyota" },
  { codigo: "25", nome: "Hyundai" },
  { codigo: "44", nome: "Renault" },
  { codigo: "43", nome: "Nissan" },
  { codigo: "31", nome: "Jeep" },
];

const MODELOS: Record<string, FipeModelo[]> = {
  "21": [
    { codigo: "21-1", nome: "Argo Drive 1.0" },
    { codigo: "21-2", nome: "Mobi Like 1.0" },
    { codigo: "21-3", nome: "Pulse Drive 1.3" },
    { codigo: "21-4", nome: "Toro Freedom 1.8" },
  ],
  "59": [
    { codigo: "59-1", nome: "Polo Track 1.0" },
    { codigo: "59-2", nome: "T-Cross 200 TSI" },
    { codigo: "59-3", nome: "Nivus Comfortline" },
    { codigo: "59-4", nome: "Virtus Highline" },
  ],
  "23": [
    { codigo: "23-1", nome: "Onix LT 1.0" },
    { codigo: "23-2", nome: "Tracker LTZ 1.0 T" },
    { codigo: "23-3", nome: "Onix Plus Premier" },
  ],
  "26": [
    { codigo: "26-1", nome: "HR-V EXL 1.5" },
    { codigo: "26-2", nome: "City Sedan EX" },
    { codigo: "26-3", nome: "Civic Touring" },
  ],
  "56": [
    { codigo: "56-1", nome: "Corolla XEi 2.0" },
    { codigo: "56-2", nome: "Corolla Cross XRE" },
    { codigo: "56-3", nome: "Yaris XL 1.5" },
  ],
};

// valores-base por modelo (R$) — só para tornar o mock plausível
const VALOR_BASE: Record<string, number> = {
  "21-1": 78000,
  "21-2": 62000,
  "21-3": 98000,
  "21-4": 165000,
  "59-1": 84000,
  "59-2": 145000,
  "59-3": 132000,
  "59-4": 118000,
  "23-1": 79000,
  "23-2": 138000,
  "23-3": 95000,
  "26-1": 152000,
  "26-2": 112000,
  "26-3": 205000,
  "56-1": 158000,
  "56-2": 198000,
  "56-3": 102000,
};

function delay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function listarMarcas(): Promise<FipeMarca[]> {
  await delay();
  return MARCAS;
}

export async function listarModelos(codigoMarca: string): Promise<FipeModelo[]> {
  await delay();
  return MODELOS[codigoMarca] ?? [];
}

/** Anos disponíveis (atual e 9 anteriores). */
export async function listarAnos(): Promise<number[]> {
  await delay(120);
  const atual = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => atual - i);
}

export async function consultarValor(
  codigoModelo: string,
  anoModelo: number,
): Promise<FipeValor | null> {
  await delay();
  const base = VALOR_BASE[codigoModelo];
  if (!base) return null;

  // depreciação ~8%/ano a partir do ano atual
  const idade = Math.max(0, new Date().getFullYear() - anoModelo);
  const valorFipe = Math.round((base * Math.pow(0.92, idade)) / 100) * 100;

  const codigoMarca = codigoModelo.split("-")[0];
  const marca = MARCAS.find((m) => m.codigo === codigoMarca)?.nome ?? "—";
  const modelo =
    MODELOS[codigoMarca]?.find((m) => m.codigo === codigoModelo)?.nome ?? "—";

  return {
    fipe: codigoModelo,
    marca,
    modelo,
    anoModelo,
    combustivel: "Flex",
    valorFipe,
  };
}
