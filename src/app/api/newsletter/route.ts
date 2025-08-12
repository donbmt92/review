import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  try {
    await prisma.newsletterSubscription.create({ data: { email } });
  } catch (e) {
    return NextResponse.json({ error: "Email already subscribed" }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}



