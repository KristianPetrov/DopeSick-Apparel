import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { desc } from "drizzle-orm";

import { authOptions } from "@/lib/auth";
import { db } from "@/db/client";
import { orders, type Order } from "@/db/schema";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  const rows: Order[] = await db.select().from(orders).orderBy(desc(orders.createdAt)).limit(250);

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-wide">Orders</h1>
          <p className="mt-2 text-sm text-white/70">{rows.length} shown (latest first)</p>
        </div>
        <Link className="text-[var(--accent)] hover:underline" href="/admin">
          Back to dashboard
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-white/5 text-white/80">
            <tr>
              <th className="px-3 py-3 text-left font-medium">Created</th>
              <th className="px-3 py-3 text-left font-medium">Email</th>
              <th className="px-3 py-3 text-left font-medium">Customer</th>
              <th className="px-3 py-3 text-left font-medium">Status</th>
              <th className="px-3 py-3 text-left font-medium">Items</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-white/10 align-top">
                <td className="px-3 py-3 whitespace-nowrap text-white/80">
                  {typeof r.createdAt === "string" ? r.createdAt : r.createdAt.toISOString()}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.email}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.customerName ?? "-"}</td>
                <td className="px-3 py-3 whitespace-nowrap text-white/80">{r.status}</td>
                <td className="px-3 py-3 text-white/70">
                  <pre className="whitespace-pre-wrap break-words max-w-[700px]">{r.itemsJson}</pre>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-3 py-6 text-white/70" colSpan={5}>
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}


