import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        roleRequirement: { label: "Role", type: "text" }, // "USER" or "ADMIN"
      },
      async authorize(credentials) {
        const email = (credentials?.email || "").toLowerCase().trim();
        const password = (credentials?.password || "").trim();
        const roleRequirement = credentials?.roleRequirement;
        
        console.log("--- DEBUG AUTH ---", { incomingEmail: email, pwLength: password.length, roleReq: roleRequirement });
        
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) { console.log("--- DEBUG AUTH --- FAILED: USER NOT FOUND in DB"); return null; }
        if (!user.verifiedAt) { console.log("--- DEBUG AUTH --- FAILED: USER NOT VERIFIED"); return null; }

        // Check password
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) { console.log("--- DEBUG AUTH --- FAILED: PASSWORD MISMATCH"); return null; }

        // SEPARATION LOGIC: If a role requirement is passed, reject if the user doesn't match
        if (roleRequirement && user.role !== roleRequirement) {
          console.log("--- DEBUG AUTH --- FAILED: ROLE MISMATCH", { userRole: user.role, required: roleRequirement });
          return null;
        }

        console.log("--- DEBUG AUTH --- SUCCESS:", user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).uid = token.uid;
      (session as any).role = token.role;
      return session;
    },
  },
};

