import { db } from "@/db/client";
import { orders } from "@/db/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST (req: Request)
{
  try {
    const session = await getServerSession(authOptions);
    const body = (await req.json()) as {
      email?: string;
      customerName?: string;
      phone?: string;
      shipping?: {
        address1?: string;
        address2?: string;
        city?: string;
        state?: string;
        zip?: string;
      };
      items?: unknown;
    };

    const email = body?.email?.trim().toLowerCase();
    const customerName = body?.customerName?.trim() || null;
    const phone = body?.phone?.trim() || null;
    const shipping = body?.shipping ?? null;
    const itemsJson = JSON.stringify({
      items: body?.items ?? null,
      phone,
      shipping,
    });

    if (!email || !email.includes("@")) {
      return new Response("Invalid email", { status: 400 });
    }
    if (!phone) {
      return new Response("Phone is required", { status: 400 });
    }
    if (!shipping?.address1 || !shipping?.city || !shipping?.state || !shipping?.zip) {
      return new Response("Shipping address is required", { status: 400 });
    }

    await db.insert(orders).values({
      userId: session?.user?.id ?? null,
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


