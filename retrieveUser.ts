import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Apk@123k", 10);
  
  const user = await prisma.user.upsert({
    where: { email: "shilpashreek2020@gmail.com" },
    update: {
      passwordHash: hashedPassword,
      verifiedAt: new Date(),
      role: "USER"
    },
    create: {
      email: "shilpashreek2020@gmail.com",
      name: "Shilpa",
      passwordHash: hashedPassword,
      role: "USER",
      verifiedAt: new Date(),
    },
  });
  console.log("Successfully retrieved/recreated test user:", user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
