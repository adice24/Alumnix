import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { realtimeHub } from "@/lib/realtime";

const CreateSchema = z.object({
  content: z.string().min(8).max(2000),
});

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { author: { select: { name: true, email: true } } },
  });
  return NextResponse.json({ ok: true, posts });
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

  const post = await prisma.post.create({
    data: { authorId: uid, content: parsed.data.content },
  });

  realtimeHub.publish("posts", { type: "created", postId: post.id });

  return NextResponse.json({ ok: true, post });
}

