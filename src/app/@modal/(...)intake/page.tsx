"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import IntakeForm from "@/components/IntakeForm";

export default function IntakeModalPage() {
  const router = useRouter();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function close() {
    router.back();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden />
      <div role="dialog" aria-modal="true" className="relative z-10 w-full max-w-2xl rounded-xl border border-white/15 bg-[#0a0a0a] shadow-2xl max-h-[calc(100vh-2rem)] overflow-y-auto">
        <button
          type="button"
          aria-label="Close intake"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-white/90 hover:bg-white/10"
          onClick={close}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd"/></svg>
        </button>
        <IntakeForm onCancel={close} onSubmitted={close} />
      </div>
    </div>
  );
}








