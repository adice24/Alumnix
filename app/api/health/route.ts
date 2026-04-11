import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    return NextResponse.json({ 
      ok: true, 
      database: "connected", 
      userCount,
      environment: process.env.NODE_ENV,
      authUrl: process.env.NEXTAUTH_URL
    });
  } catch (error: any) {
    return NextResponse.json({ 
      ok: false, 
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    }, { status: 500 });
  }
}
