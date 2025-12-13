import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { providerApplications } from "@/db/schema";

function formatValue(v: unknown) {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  return String(v);
}

function formatCreatedAt(v: unknown) {
  if (!v) return "—";
  if (typeof v === "string") return v;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

export default async function AdminProviderApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) notFound();

  const row = (
    await db
      .select()
      .from(providerApplications)
      .where(eq(providerApplications.id, id))
      .limit(1)
  )[0];

  if (!row) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 md:px-10 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">
            Provider Application #{row.id}
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Created:{" "}
            <span className="text-white/85">{formatCreatedAt(row.createdAt)}</span>
          </p>
        </div>
        <Link className="text-[var(--accent)] hover:underline" href="/admin/provider-applications">
          Back to provider applications
        </Link>
      </div>

      <div className="mt-8 grid gap-6">
        <Section title="Organization">
          <Field label="Organization name" value={row.organizationName} />
          <Field label="Organization type" value={row.organizationType} />
          <Field label="Website" value={row.website} />
        </Section>

        <Section title="Contact Information">
          <Field label="Contact name" value={row.contactName} />
          <Field label="Contact title" value={row.contactTitle} />
          <Field label="Contact email" value={row.contactEmail} />
          <Field label="Contact phone" value={row.contactPhone} />
        </Section>

        <Section title="Location">
          <Field label="Address 1" value={row.address1} />
          <Field label="Address 2" value={row.address2} />
          <Field label="City" value={row.city} />
          <Field label="State" value={row.state} />
          <Field label="Zip" value={row.zip} />
        </Section>

        <Section title="Program Details">
          <Field label="Services" value={row.services} />
          <Field label="Levels of care" value={row.levelsOfCare} />
          <Field label="Accepts insurance" value={row.acceptsInsurance} />
          <Field label="Notes" value={row.notes} />
        </Section>

        <Section title="Status & Meta">
          <Field label="Status" value={row.status} />
          <Field label="Agree to contact" value={row.agreeToContact} />
          <Field label="Submitted at (client)" value={row.submittedAt} />
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-white/55">{label}</div>
      <div className="mt-1 text-sm text-white/85 whitespace-pre-wrap break-words">
        {formatValue(value)}
      </div>
    </div>
  );
}

