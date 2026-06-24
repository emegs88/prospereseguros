import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Semeando dados da Prospere Seguros...");

  // Avaliações de prova social (estrutura — substituir por fonte real)
  const avaliacoes = [
    {
      nomeExibicao: "Rafael M.",
      cidade: "Hortolândia/SP",
      nota: 5,
      ramo: "AUTO" as const,
      comentario:
        "Cotei meu carro em menos de 2 minutos e fechei pelo WhatsApp. Atendimento rápido e sem enrolação.",
      aprovada: true,
    },
    {
      nomeExibicao: "Juliana S.",
      cidade: "Campinas/SP",
      nota: 5,
      ramo: "RESIDENCIAL" as const,
      comentario:
        "Comparei 6 seguradoras lado a lado e economizei mais de R$ 400 no ano. Recomendo demais.",
      aprovada: true,
    },
    {
      nomeExibicao: "Carlos E.",
      cidade: "Sumaré/SP",
      nota: 5,
      ramo: "AUTO" as const,
      comentario:
        "A corretora me ajudou a entender cada cobertura. Senti confiança do começo ao fim.",
      aprovada: true,
    },
    {
      nomeExibicao: "Patrícia L.",
      cidade: "Hortolândia/SP",
      nota: 4,
      ramo: "MOTO" as const,
      comentario: "Processo 100% online e o corretor respondeu na hora. Muito prático.",
      aprovada: true,
    },
  ];

  for (const a of avaliacoes) {
    await prisma.avaliacao.create({ data: a });
  }

  console.log(`✅ ${avaliacoes.length} avaliações criadas.`);
  console.log("🌱 Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
