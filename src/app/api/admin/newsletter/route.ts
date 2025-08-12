import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  try {
    const subscriptions = await prisma.newsletterSubscription.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(subscriptions);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách newsletter:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách newsletter" },
      { status: 500 }
    );
  }
}
