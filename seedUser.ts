import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("User@123", 10);
  
  const user = await prisma.user.upsert({
    where: { email: "user@alumnix.com" },
    update: {},
    create: {
      email: "user@alumnix.com",
      name: "Test Developer",
      passwordHash: hashedPassword,
      role: "USER",
      verifiedAt: new Date(),
    },
  });
  console.log("Successfully created test user:", user.email);
}

main().catch(console.error).finally(() => prisma.$disconnect());
