import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.prismaGlobal ?? new PrismaClient();
export const db = prisma; // Alias for easier imports

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}



