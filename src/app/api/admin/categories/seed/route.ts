import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// Seed all categories used on the homepage into the database.
// Idempotent: use createMany with skipDuplicates to avoid duplicate unique(name/slug) errors.
export async function POST() {
	const categoriesToSeed: Array<{ name: string; slug: string; icon?: string }> = [
		{ slug: "appliances", name: "Appliances", icon: "/categories/appliances.png" },
		{ slug: "automobile", name: "Automobile", icon: "/categories/automobile.png" },
		{ slug: "beauty", name: "Beauty", icon: "/categories/beauty.png" },
		{ slug: "electronics", name: "Electronics", icon: "/categories/electronics.png" },
		{ slug: "garden", name: "Garden", icon: "/categories/garden.png" },
		{ slug: "health", name: "Health", icon: "/categories/health.png" },
		{ slug: "home-kitchen", name: "Home & Kitchen", icon: "/categories/home-kitchen.png" },
		{ slug: "improvements", name: "Home Improvements", icon: "/categories/improvements.png" },
		{ slug: "office", name: "Office", icon: "/categories/office.png" },
		{ slug: "pets", name: "Pets", icon: "/categories/pets.png" },
		{ slug: "sports", name: "Sports", icon: "/categories/sports.png" },
		{ slug: "toys", name: "Toys & Games", icon: "/categories/toys.png" },
		{ slug: "other", name: "Other", icon: "/categories/other.png" },
	];

	try {
		let insertedOrUpdated = 0;
		for (const cat of categoriesToSeed) {
			await prisma.category.upsert({
				where: { slug: cat.slug },
				update: { name: cat.name, icon: cat.icon },
				create: { slug: cat.slug, name: cat.name, icon: cat.icon },
			});
			insertedOrUpdated++;
		}

		return NextResponse.json({ ok: true, affected: insertedOrUpdated });
	} catch (error) {
		console.error("Seed categories error:", error);
		return NextResponse.json(
			{ ok: false, error: "Không thể seed danh mục" },
			{ status: 500 }
		);
	}
}


