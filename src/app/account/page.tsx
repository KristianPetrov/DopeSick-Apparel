import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  if (session.user.role === "admin") redirect("/admin");

  return (
    <main className="mx-auto max-w-3xl px-6 md:px-10 py-12">
      <h1 className="text-2xl font-semibold tracking-wide">Your Account</h1>
      <p className="mt-2 text-sm text-white/70">
        Signed in as <span className="text-white/90">{session.user.email}</span>
      </p>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-6 py-6">
        <div className="text-sm text-white/80">Profile</div>
        <div className="mt-2 grid gap-2 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-white/60">Name:</span>
            <span className="text-white/90">{session.user.name ?? "—"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-white/60">Email:</span>
            <span className="text-white/90">{session.user.email ?? "—"}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/store"
            className="inline-flex h-10 px-4 items-center justify-center rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/intake"
            className="inline-flex h-10 px-4 items-center justify-center rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity"
          >
            Start Intake
          </Link>
        </div>
      </div>
    </main>
  );
}

