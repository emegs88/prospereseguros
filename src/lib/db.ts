// ─────────────────────────────────────────────────────────────────────────
//  Prisma Client singleton.
//
//  Em dev, o hot-reload do Next recria módulos a cada save — sem o singleton
//  isso abre dezenas de conexões e estoura o pool do Postgres. Guardamos a
//  instância no globalThis para reaproveitar.
// ─────────────────────────────────────────────────────────────────────────

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
