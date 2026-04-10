import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { realtimeHub } from "@/lib/realtime";

const Schema = z.object({ toUserId: z.string() });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const uid = (session as any).uid as string;

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }
  if (parsed.data.toUserId === uid) {
    return NextResponse.json({ ok: false, error: "Cannot connect to self" }, { status: 400 });
  }

  await prisma.connection.upsert({
    where: { fromId_toId: { fromId: uid, toId: parsed.data.toUserId } },
    update: {},
    create: { fromId: uid, toId: parsed.data.toUserId },
  });

  const [me, them] = await Promise.all([
    prisma.user.findUnique({ where: { id: uid }, select: { name: true } }),
    prisma.user.findUnique({ where: { id: parsed.data.toUserId }, select: { name: true } }),
  ]);

  const n = await prisma.notification.create({
    data: {
      userId: parsed.data.toUserId,
      title: "New connection",
      body: `${me?.name ?? "An alum"} connected with you on AlumniX.`,
      href: `/network/${uid}`,
    },
  });

  realtimeHub.publish(`notifications:${parsed.data.toUserId}`, { type: "created", id: n.id });

  return NextResponse.json({ ok: true, connectedTo: them?.name ?? null });
}

