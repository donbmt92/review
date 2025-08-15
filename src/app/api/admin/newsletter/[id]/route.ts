import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if subscription exists
    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Đăng ký newsletter không tồn tại" },
        { status: 404 }
      );
    }

    // Delete the subscription
    await prisma.newsletterSubscription.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Xóa đăng ký newsletter thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa newsletter:", error);
    return NextResponse.json(
      { error: "Không thể xóa đăng ký newsletter" },
      { status: 500 }
    );
  }
}
