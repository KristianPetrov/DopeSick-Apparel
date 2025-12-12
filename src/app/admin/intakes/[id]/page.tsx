import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { intakeSubmissions } from "@/db/schema";

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

export default async function AdminIntakeDetailPage({
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
      .from(intakeSubmissions)
      .where(eq(intakeSubmissions.id, id))
      .limit(1)
  )[0];

  if (!row) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 md:px-10 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">
            Intake Submission #{row.id}
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Created:{" "}
            <span className="text-white/85">{formatCreatedAt(row.createdAt)}</span>
          </p>
        </div>
        <Link className="text-[var(--accent)] hover:underline" href="/admin/intakes">
          Back to intakes
        </Link>
      </div>

      <div className="mt-8 grid gap-6">
        <Section title="Personal">
          <Field label="First name" value={row.firstName} />
          <Field label="Last name" value={row.lastName} />
          <Field label="Date of birth" value={row.dateOfBirth} />
          <Field label="Gender" value={row.gender} />
          <Field label="Phone" value={row.phone} />
          <Field label="Email" value={row.email} />
          <Field label="Address 1" value={row.address1} />
          <Field label="Address 2" value={row.address2} />
          <Field label="City" value={row.city} />
          <Field label="State" value={row.state} />
          <Field label="Zip" value={row.zip} />
        </Section>

        <Section title="Emergency Contact">
          <Field label="Name" value={row.emergencyName} />
          <Field label="Relationship" value={row.emergencyRelationship} />
          <Field label="Phone" value={row.emergencyPhone} />
        </Section>

        <Section title="Insurance">
          <Field label="Uninsured" value={row.uninsured} />
          <Field label="Insurance provider" value={row.insuranceProvider} />
          <Field label="Member ID" value={row.memberId} />
          <Field label="Group number" value={row.groupNumber} />
          <Field label="Insured name" value={row.insuredName} />
        </Section>

        <Section title="Substance Use">
          <Field label="Primary substance" value={row.primarySubstance} />
          <Field label="Other substances" value={row.otherSubstances} />
          <Field label="Frequency" value={row.frequency} />
          <Field label="Duration" value={row.duration} />
          <Field label="Last use date" value={row.lastUseDate} />
          <Field label="Route of use" value={row.routeOfUse} />
          <Field label="Amount per use" value={row.amountPerUse} />
        </Section>

        <Section title="Medical & Mental Health">
          <Field label="Current medications" value={row.currentMedications} />
          <Field label="Allergies" value={row.allergies} />
          <Field label="Chronic conditions" value={row.chronicConditions} />
          <Field label="Mental health diagnoses" value={row.mentalHealthDiagnoses} />
          <Field label="Suicide risk" value={row.suicideRisk} />
          <Field label="Seizures history" value={row.seizuresHistory} />
          <Field label="Pregnancy status" value={row.pregnancyStatus} />
        </Section>

        <Section title="Treatment & Legal">
          <Field label="Prior treatment" value={row.priorTreatment} />
          <Field label="Prior facilities" value={row.priorFacilities} />
          <Field label="Legal issues" value={row.legalIssues} />
          <Field label="Court mandated" value={row.courtMandated} />
          <Field label="Probation officer" value={row.probationOfficer} />
          <Field label="Detox needed" value={row.detoxNeeded} />
        </Section>

        <Section title="Consent & Meta">
          <Field label="HIPAA consent" value={row.hipaaConsent} />
          <Field label="Contact consent" value={row.contactConsent} />
          <Field label="Agreed to terms" value={row.agreeToTerms} />
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

