import { db } from "@/db/client";
import { providerApplications } from "@/db/schema";

export const runtime = "nodejs";

function isEmail(v: unknown) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (
      !body ||
      typeof body.organizationName !== "string" ||
      !body.organizationName.trim() ||
      typeof body.organizationType !== "string" ||
      !body.organizationType.trim() ||
      typeof body.contactName !== "string" ||
      !body.contactName.trim() ||
      !isEmail(body.contactEmail) ||
      !body.agreeToContact
    ) {
      return new Response("Missing required fields", { status: 400 });
    }

    await db.insert(providerApplications).values({
      organizationName: body.organizationName.trim(),
      organizationType: body.organizationType.trim(),
      website: typeof body.website === "string" && body.website.trim() ? body.website.trim() : null,

      contactName: body.contactName.trim(),
      contactTitle: typeof body.contactTitle === "string" && body.contactTitle.trim() ? body.contactTitle.trim() : null,
      contactEmail: body.contactEmail.trim().toLowerCase(),
      contactPhone: typeof body.contactPhone === "string" && body.contactPhone.trim() ? body.contactPhone.trim() : null,

      address1: typeof body.address1 === "string" && body.address1.trim() ? body.address1.trim() : null,
      address2: typeof body.address2 === "string" && body.address2.trim() ? body.address2.trim() : null,
      city: typeof body.city === "string" && body.city.trim() ? body.city.trim() : null,
      state: typeof body.state === "string" && body.state.trim() ? body.state.trim() : null,
      zip: typeof body.zip === "string" && body.zip.trim() ? body.zip.trim() : null,

      services: typeof body.services === "string" && body.services.trim() ? body.services.trim() : null,
      levelsOfCare: typeof body.levelsOfCare === "string" && body.levelsOfCare.trim() ? body.levelsOfCare.trim() : null,
      acceptsInsurance: !!body.acceptsInsurance,
      notes: typeof body.notes === "string" && body.notes.trim() ? body.notes.trim() : null,

      agreeToContact: !!body.agreeToContact,
      submittedAt: typeof body.submittedAt === "string" ? body.submittedAt : null,
      // status uses DB default
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}




