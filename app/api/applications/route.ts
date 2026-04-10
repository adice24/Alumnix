import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { realtimeHub } from "@/lib/realtime";

const CreateSchema = z.object({
  gigId: z.string().optional(),
  company: z.string().min(2).max(120),
  roleTitle: z.string().min(2).max(120),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const uid = (session as any).uid as string;

  const items = await prisma.application.findMany({
    where: { userId: uid },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const uid = (session as any).uid as string;

  const json = await req.json().catch(() => null);
  const parsed = CreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  const app = await prisma.application.create({
    data: {
      userId: uid,
      gigId: parsed.data.gigId,
      company: parsed.data.company,
      roleTitle: parsed.data.roleTitle,
    },
  });

  const n = await prisma.notification.create({
    data: {
      userId: uid,
      title: "Application added",
      body: `Tracking started for ${parsed.data.roleTitle} @ ${parsed.data.company}.`,
      href: "/applications",
    },
  });
  realtimeHub.publish(`notifications:${uid}`, { type: "created", id: n.id });

  return NextResponse.json({ ok: true, app });
}

