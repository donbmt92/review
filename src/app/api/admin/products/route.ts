import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        reviewMeta: true,
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách sản phẩm" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, imageUrl, score, categoryId } = body;

    // Validate input
    if (!title || !imageUrl || score === undefined || !categoryId) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    if (score < 0 || score > 10) {
      return NextResponse.json(
        { error: "Điểm đánh giá phải từ 0-10" },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Danh mục không tồn tại" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        imageUrl,
        score,
        categoryId,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    return NextResponse.json(
      { error: "Không thể thêm sản phẩm" },
      { status: 500 }
    );
  }
}
