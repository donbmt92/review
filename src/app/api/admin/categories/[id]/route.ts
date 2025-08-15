import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Danh mục không tồn tại" },
        { status: 404 }
      );
    }

    // Check if category has products
    if (category._count.products > 0) {
      return NextResponse.json(
        { error: "Không thể xóa danh mục có sản phẩm. Hãy xóa tất cả sản phẩm trước." },
        { status: 400 }
      );
    }

    // Delete the category
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Xóa danh mục thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa danh mục:", error);
    return NextResponse.json(
      { error: "Không thể xóa danh mục" },
      { status: 500 }
    );
  }
}
