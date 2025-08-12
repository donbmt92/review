import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      highlights: true,
      offers: true,
      reviewMeta: true,
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json(products);
}



