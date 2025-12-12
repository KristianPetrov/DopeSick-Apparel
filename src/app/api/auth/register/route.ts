import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/db/client";
import { users } from "@/db/schema";

export const runtime = "nodejs";

function normalizeEmail (email: string)
{
  return email.trim().toLowerCase();
}

export async function POST (req: Request)
{
  try {
    const body = (await req.json()) as { name?: string; email?: string; password?: string };
    const name = body?.name?.trim() || null;
    const emailRaw = body?.email;
    const password = body?.password;

    if (!emailRaw || !password || password.length < 8) {
      return new Response("Invalid payload", { status: 400 });
    }

    const email = normalizeEmail(emailRaw);

    const existing = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
    if (existing) {
      return new Response("Email already in use", { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({
      email,
      name,
      passwordHash,
      role: "user",
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}


