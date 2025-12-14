import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { desc } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { providerApplications, type ProviderApplication } from "@/db/schema";

export default async function AdminProviderApplicationsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const rows: ProviderApplication[] = await db
    .select()
    .from(providerApplications)
    .orderBy(desc(providerApplications.createdAt))
    .limit(250);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">Provider Applications</h1>
          <p className="mt-2 text-sm text-white/70">{rows.length} shown (latest first)</p>
        </div>
        <Link className="text-[var(--accent)] hover:underline" href="/admin">
          Back to dashboard
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-white/5 text-white/80">
            <tr>
              <th className="px-3 py-3 text-left font-medium">Created</th>
              <th className="px-3 py-3 text-left font-medium">Organization</th>
              <th className="px-3 py-3 text-left font-medium">Type</th>
              <th className="px-3 py-3 text-left font-medium">Contact</th>
              <th className="px-3 py-3 text-left font-medium">Email</th>
              <th className="px-3 py-3 text-left font-medium">Location</th>
              <th className="px-3 py-3 text-left font-medium">Status</th>
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
                    href={`/admin/provider-applications/${r.id}`}
                    className="text-white hover:text-[var(--accent)] hover:underline transition-colors"
                  >
                    {r.organizationName}
                  </Link>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.organizationType}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.contactName}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.contactEmail}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">
                  {r.city && r.state ? `${r.city}, ${r.state}` : r.city || r.state || "—"}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.status}</td>
                <td className="px-3 py-3 whitespace-nowrap">
                  <Link
                    href={`/admin/provider-applications/${r.id}`}
                    className="inline-flex h-9 px-3 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white hover:border-[var(--accent)]/60 hover:bg-white/5 transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-white/70" colSpan={8}>
                  No provider applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}



