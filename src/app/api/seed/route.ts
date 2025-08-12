import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST() {
  // Idempotent seed: wipe and insert minimal demo data
  await prisma.highlight.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.reviewMeta.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const cat = await prisma.category.create({
    data: { name: "Air Purifiers", slug: "air-purifiers" },
  });

  const product1 = await prisma.product.create({
    data: {
      title: "Elevate Your Home PuroAir 1115 Sq Ft Air Purifier",
      imageUrl: "https://m.media-amazon.com/images/I/31xF+ksXkKL._SL240_.jpg",
      score: 9.9,
      categoryId: cat.id,
    },
  });
  await prisma.highlight.createMany({
    data: [
      { productId: product1.id, text: "Covers large areas effectively up to 1,115 sq ft." },
      { productId: product1.id, text: "Removes 99% of common allergens and pollutants." },
      { productId: product1.id, text: "Operates automatically for hassle-free air cleaning." },
    ],
  });
  await prisma.offer.create({
    data: {
      productId: product1.id,
      retailer: "amazon",
      url: "https://www.amazon.com",
      badge: "Best Overall",
      discount: "20% off",
    },
  });
  await prisma.reviewMeta.create({
    data: { productId: product1.id, reviewsCount: 13721, boughtNote: "9K+ bought in past month" },
  });

  return NextResponse.json({ ok: true });
}




