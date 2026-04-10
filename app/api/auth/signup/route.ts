import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const SignupSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  password: z.string().min(8).max(72),
  batchYear: z.number().int().min(2000).max(2100).optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = SignupSchema.safeParse(json);
  
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input. Check your password length." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase().trim();

  // Check if user already exists and is verified
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing?.verifiedAt) {
    return NextResponse.json(
      { ok: false, error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const now = new Date();

  // Mark user as verified immediately to bypass OTP
  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        name: parsed.data.name.trim(),
        passwordHash,
        verifiedAt: now,
        profile: {
          update: {
            batchYear: parsed.data.batchYear
          }
        }
      },
    });
    
    return NextResponse.json({ ok: true, message: "Account verified" });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name.trim(),
      passwordHash,
      verifiedAt: now, // INSTANT VERIFICATION
      profile: { 
        create: {
          batchYear: parsed.data.batchYear
        } 
      },
    },
  });

  return NextResponse.json({
    ok: true,
    user: { id: user.id, email: user.email },
  });
}
