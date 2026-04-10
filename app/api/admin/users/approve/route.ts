import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const Schema = z.object({ userId: z.string() });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: parsed.data.userId },
    data: { verifiedAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
