import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { desc } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { intakeSubmissions, type IntakeSubmission } from "@/db/schema";

export default async function AdminIntakesPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const rows: IntakeSubmission[] = await db
    .select()
    .from(intakeSubmissions)
    .orderBy(desc(intakeSubmissions.createdAt))
    .limit(250);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">Intake Submissions</h1>
          <p className="mt-2 text-sm text-white/70">{rows.length} shown (latest first)</p>
        </div>
        <Link className="text-[var(--accent)] hover:underline" href="/admin">
          Back to dashboard
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-white/5 text-white/80">
            <tr>
              <th className="px-3 py-3 text-left font-medium">Created</th>
              <th className="px-3 py-3 text-left font-medium">Name</th>
              <th className="px-3 py-3 text-left font-medium">DOB</th>
              <th className="px-3 py-3 text-left font-medium">Phone</th>
              <th className="px-3 py-3 text-left font-medium">Email</th>
              <th className="px-3 py-3 text-left font-medium">Primary substance</th>
              <th className="px-3 py-3 text-left font-medium">Frequency</th>
              <th className="px-3 py-3 text-left font-medium">Duration</th>
              <th className="px-3 py-3 text-left font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10">
                <td className="px-3 py-3 whitespace-nowrap text-white/80">
                  {typeof r.createdAt === "string" ? r.createdAt : r.createdAt.toISOString()}
                </td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <Link
                    href={`/admin/intakes/${r.id}`}
                    className="text-white hover:text-[var(--accent)] hover:underline transition-colors"
                  >
                    {r.firstName} {r.lastName}
                  </Link>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">
                  {String(r.dateOfBirth)}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.phone}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.email}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.primarySubstance}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.frequency}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.duration}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <Link
                    href={`/admin/intakes/${r.id}`}
                    className="inline-flex h-9 px-3 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[var(--accent)]/60 hover:bg-white/5 transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-white/70" colSpan={9}>
                  No intake submissions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}


