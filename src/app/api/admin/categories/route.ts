import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
    
    // Transform data to include productsCount
    const categoriesWithCount = categories.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      icon: (category as any).icon ?? null,
      createdAt: category.createdAt,
      productsCount: category._count.products
    }));
    
    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách danh mục:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách danh mục" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, icon } = body;

    // Validate input
    if (!name || !slug) {
      return NextResponse.json(
        { error: "Thiếu tên hoặc slug danh mục" },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [
          { name },
          { slug }
        ]
      }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Danh mục với tên hoặc slug này đã tồn tại" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        icon,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error);
    return NextResponse.json(
      { error: "Không thể thêm danh mục" },
      { status: 500 }
    );
  }
}
