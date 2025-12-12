import { db } from "@/db/client";
import { orders } from "@/db/schema";

export const runtime = "nodejs";

export async function POST (req: Request)
{
  try {
    const body = (await req.json()) as {
      email?: string;
      customerName?: string;
      items?: unknown;
    };

    const email = body?.email?.trim().toLowerCase();
    const customerName = body?.customerName?.trim() || null;
    const itemsJson = JSON.stringify(body?.items ?? null);

    if (!email || !email.includes("@")) {
      return new Response("Invalid email", { status: 400 });
    }

    await db.insert(orders).values({
      email,
      customerName,
      itemsJson,
      status: "new",
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}


