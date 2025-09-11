import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

// Force create new instance to avoid cache issues
export const prisma: PrismaClient = new PrismaClient();
export const db = prisma; // Alias for easier imports
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}



  