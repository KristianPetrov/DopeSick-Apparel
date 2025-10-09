import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dopesick Apparel — Bold Streetwear Born from Recovery",
  description:
    "To redefine streetwear through the lens of recovery — bold, unapologetic, and born from the struggle.",
  openGraph: {
    title: "Dopesick Apparel — Bold Streetwear Born from Recovery",
    description:
      "To redefine streetwear through the lens of recovery — bold, unapologetic, and born from the struggle.",
    url: "https://dopesick.apparel", // adjust when domain is final
    type: "website",
  },
  themeColor: "#000000",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  store,
}: Readonly<{
  children: React.ReactNode;
  store: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 w-full border-b border-[var(--accent)]/40" style={{ backgroundColor: "#7f1d1d" }}>
          <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
            <Link href="/" className="text-sm font-semibold tracking-wide text-white/90 hover:text-white">DOPESICK</Link>
            <div className="flex items-center gap-3">
              <Link className="inline-flex h-9 px-4 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] bg-black hover:bg-[#7f1d1d]/60 transition-colors" href="/store">Shop</Link>
              <a className="inline-flex h-9 px-4 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] bg-black hover:bg-[#7f1d1d]/60 transition-colors" href="#story">Our Story</a>
              <a className="inline-flex h-9 px-4 items-center justify-center rounded-full border border-[var(--accent)] text-[var(--accent)] bg-black hover:bg-[#7f1d1d]/60 transition-colors" href="#contact">Contact</a>
            </div>
          </nav>
        </header>
        {children}
        {store}
      </body>
    </html>
  );
}
