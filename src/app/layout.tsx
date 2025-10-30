import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import MobileMenu from "@/components/MobileMenu";
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
  authors: [{ name: "Set Free Digital Disciples", url: "https://www.setfreedigitaldisciples.com" }],
  openGraph: {
    title: "Dopesick Apparel — Bold Streetwear Born from Recovery",
    description:
      "To redefine streetwear through the lens of recovery — bold, unapologetic, and born from the struggle.",
    url: "https://dopesick.apparel", // adjust when domain is final
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Dopesick Apparel — Bold Streetwear Born from Recovery",
      },
    ],
  },
  themeColor: "#000000",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
            <Link href="/" aria-label="Home" className="inline-flex items-center">
              <Image
                src="/DopeSick-White-Logo.png"
                alt="Dopesick Apparel"
                width={120}
                height={120}
                sizes="40px"
                quality={100}
                priority
                className="h-10 w-auto"
              />
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3">
                <Link className="inline-flex h-9 px-4 items-center justify-center rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[var(--accent)] hover:border-[var(--accent)] shadow-none hover:shadow-[0_0_16px_2px_rgba(220,38,38,0.6)] transition-all duration-200" href="/store">Shop</Link>
                <Link className="inline-flex h-9 px-4 items-center justify-center rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[var(--accent)] hover:border-[var(--accent)] shadow-none hover:shadow-[0_0_16px_2px_rgba(220,38,38,0.6)] transition-all duration-200" href="/#story">Our Story</Link>
                <Link
                 className="inline-flex h-9 px-4 items-center justify-center rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[var(--accent)] hover:border-[var(--accent)] shadow-none hover:shadow-[0_0_16px_2px_rgba(220,38,38,0.6)] transition-all duration-200" href="/#contact">Contact</Link>
              </div>
              <MobileMenu />
            </div>
          </nav>
        </header>
        {children}
        {store}
      </body>
    </html>
  );
}
