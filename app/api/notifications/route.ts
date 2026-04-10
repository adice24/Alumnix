import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const uid = (session as any).uid as string;

  const items = await prisma.notification.findMany({
    where: { userId: uid },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ ok: true, items });
}

const ReadSchema = z.object({ id: z.string() });

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const uid = (session as any).uid as string;

  const json = await req.json().catch(() => null);
  const parsed = ReadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  await prisma.notification.updateMany({
    where: { id: parsed.data.id, userId: uid },
    data: { readAt: new Date() },
  });
  return NextResponse.json({ ok: true });
}

