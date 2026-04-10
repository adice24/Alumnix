import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { email: "shilpashreek2020@gmail.com" } });
  if (!user) {
    console.log("USER NOT FOUND");
    return;
  }
  console.log("User found:", user.email);
  console.log("Role:", user.role);
  console.log("Verified At:", user.verifiedAt);
  const ok = await bcrypt.compare("Apk@123k", user.passwordHash);
  console.log("Password matches 'Apk@123k':", ok);
}

main().catch(console.error).finally(() => prisma.$disconnect());
