import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  
  try {
    await prisma.newsletterSubscription.create({ 
      data: { 
        email: email.trim().toLowerCase()
      } 
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Email subscribed successfully" 
    });
  } catch (e: any) {
    if (e.code === 'P2002') {
      return NextResponse.json({ 
        error: "Email already subscribed" 
      }, { status: 409 });
    }
    
    console.error('Newsletter subscription error:', e);
    return NextResponse.json({ 
      error: "Failed to subscribe email" 
    }, { status: 500 });
  }
}



