"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      const { overflow } = document.body.style;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflow;
      };
    }
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white text-white hover:bg-white hover:text-[var(--accent)] transition-colors"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? (
          // Close icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path fillRule="evenodd" d="M6.225 4.811a1 1 0 011.414 0L12 9.172l4.361-4.361a1 1 0 111.414 1.414L13.414 10.586l4.361 4.361a1 1 0 01-1.414 1.414L12 12l-4.361 4.361a1 1 0 01-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          // Hamburger icon
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={closeMenu}
            aria-hidden
          />
          <div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            className="fixed top-16 inset-x-0 z-50 bg-[#7f1d1d] border-t border-[var(--accent)]/40"
          >
            <nav className="px-6 py-4 flex flex-col gap-3">
              <Link
                href="/store"
                onClick={closeMenu}
                className="inline-flex h-11 px-4 items-center justify-center rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/#story"
                onClick={closeMenu}
                className="inline-flex h-11 px-4 items-center justify-center rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                Our Story
              </Link>
              <Link
                href="/#contact"
                onClick={closeMenu}
                className="inline-flex h-11 px-4 items-center justify-center rounded-full border border-white text-white bg-transparent hover:bg-white hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}


