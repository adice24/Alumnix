import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { realtimeHub } from "@/lib/realtime";

const Schema = z.object({ eventId: z.string() });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ ok: false }, { status: 401 });
  const uid = (session as any).uid as string;

  const json = await req.json().catch(() => null);
  const parsed = Schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: parsed.data.eventId } });
  if (!event) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });

  // Minimal RSVP tracking: increment attendees. (Can be upgraded to join table later.)
  await prisma.event.update({
    where: { id: event.id },
    data: { attendees: { increment: 1 } },
  });

  const n = await prisma.notification.create({
    data: {
      userId: uid,
      title: "RSVP confirmed",
      body: `You’re attending: ${event.title}.`,
      href: `/events/${event.id}`,
    },
  });
  realtimeHub.publish(`notifications:${uid}`, { type: "created", id: n.id });

  return NextResponse.json({ ok: true });
}

