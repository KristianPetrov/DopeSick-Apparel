import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { db } from "@/db/client";
import { users } from "@/db/schema";

type AppRole = "admin" | "user";

function normalizeEmail (email: string)
{
  return email.trim().toLowerCase();
}

async function ensureAdminUser (email: string, password: string)
{
  const existing = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
  if (existing) {
    if (existing.role !== "admin") {
      await db.update(users).set({ role: "admin" }).where(eq(users.id, existing.id));
    }
    return (await db.select().from(users).where(eq(users.id, existing.id)).limit(1))[0];
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({
    email,
    name: "Admin",
    passwordHash,
    role: "admin",
  });

  return (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize (credentials)
      {
        const emailRaw = credentials?.email;
        const password = credentials?.password;
        if (!emailRaw || !password) return null;

        const email = normalizeEmail(emailRaw);

        const adminEmail = process.env.ADMIN_EMAIL ? normalizeEmail(process.env.ADMIN_EMAIL) : undefined;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (adminEmail && adminPassword && email === adminEmail && password === adminPassword) {
          const admin = await ensureAdminUser(adminEmail, adminPassword);
          if (!admin) return null;
          return {
            id: String(admin.id),
            email: admin.email,
            name: admin.name ?? admin.email,
            role: admin.role as AppRole,
          };
        }

        const user = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? user.email,
          role: user.role as AppRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt ({ token, user })
    {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role?: AppRole }).role ?? "user";
      }
      return token;
    },
    async session ({ session, token })
    {
      if (session.user) {
        session.user.id = typeof token.id === "string" ? token.id : "";
        session.user.role = (token.role as AppRole) ?? "user";
      }
      return session;
    },
  },
};


