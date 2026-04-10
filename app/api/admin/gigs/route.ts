import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const GigSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  location: z.string().min(2),
  type: z.string(),
  salaryBand: z.string().optional(),
  description: z.string().min(10),
  tags: z.array(z.string()).default([]),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).role !== "ADMIN") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = GigSchema.safeParse(json);
  
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid data" }, { status: 400 });
  }

  const gig = await prisma.gig.create({
    data: {
      title: parsed.data.title,
      company: parsed.data.company,
      location: parsed.data.location,
      type: parsed.data.type,
      salaryBand: parsed.data.salaryBand,
      description: parsed.data.description,
      tagsJson: JSON.stringify(parsed.data.tags),
    },
  });

  return NextResponse.json({ ok: true, id: gig.id });
}
