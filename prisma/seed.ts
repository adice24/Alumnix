import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "admin@alumnix.com" },
    update: {},
    create: {
      email: "admin@alumnix.com",
      name: "AlumniX Admin",
      passwordHash: hashedPassword,
      role: "ADMIN",
      verifiedAt: new Date(),
    },
  });

  await prisma.gig.createMany({
    data: [
      {
        title: "Frontend Developer (React)",
        company: "Razorpay",
        location: "Bengaluru (Hybrid)",
        type: "Full-time",
        salaryBand: "12L - 18L",
        description: "Looking for an alumni intern with strong React and Tailwind skills.",
        tagsJson: JSON.stringify(["React", "Next.js", "Tailwind"]),
      },
      {
        title: "UI/UX Design Intern",
        company: "Zomato",
        location: "Gurugram (On-site)",
        type: "Internship",
        salaryBand: "40k - 60k",
        description: "Join the design team at Zomato to build the next gen of food delivery.",
        tagsJson: JSON.stringify(["Figma", "Design Systems"]),
      },
      {
        title: "Backend Engineer (Node.js)",
        company: "Swiggy",
        location: "Remote",
        type: "Contract",
        salaryBand: "80k - 1.2L / month",
        description: "Scale our logistics platform using Node.js and MongoDB.",
        tagsJson: JSON.stringify(["Node.js", "MongoDB", "AWS"]),
      },
    ],
  });

  console.log({ admin, seed: "Gigs created" });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
