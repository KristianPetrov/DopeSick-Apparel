import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") redirect("/login");

  return (
    <main className="mx-auto max-w-5xl px-6 md:px-10 py-12">
      <h1 className="text-2xl font-semibold tracking-wide">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-white/70">View intake submissions and orders.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/intakes"
          className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-[var(--accent)]/50 transition-colors"
        >
          <div className="font-medium">Intake submissions</div>
          <div className="mt-1 text-sm text-white/60">Browse all intake forms.</div>
        </Link>
        <Link
          href="/admin/orders"
          className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-[var(--accent)]/50 transition-colors"
        >
          <div className="font-medium">Orders</div>
          <div className="mt-1 text-sm text-white/60">Browse all orders.</div>
        </Link>
        <Link
          href="/admin/provider-applications"
          className="rounded-xl border border-white/10 bg-black/40 p-5 hover:border-[var(--accent)]/50 transition-colors"
        >
          <div className="font-medium">Provider applications</div>
          <div className="mt-1 text-sm text-white/60">Browse all provider applications.</div>
        </Link>
      </div>
    </main>
  );
}


