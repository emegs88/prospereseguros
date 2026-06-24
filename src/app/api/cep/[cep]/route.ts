// GET /api/cep/:cep — consulta de endereço (MOCK; trocar por ViaCEP).
import { NextRequest, NextResponse } from "next/server";
import { consultarCep } from "@/lib/cep";

export async function GET(
  _req: NextRequest,
  { params }: { params: { cep: string } },
) {
  const endereco = await consultarCep(params.cep);
  if (!endereco) {
    return NextResponse.json({ erro: "CEP inválido" }, { status: 400 });
  }
  return NextResponse.json(endereco);
}
