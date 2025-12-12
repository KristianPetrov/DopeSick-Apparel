"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FeaturedProductOpener() {
  const sp = useSearchParams();
  const router = useRouter();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const id = sp.get("featured");
    if (!id) return;

    // Navigate from /store -> /store/[id] so the intercepting route
    // opens the product modal with the store page as the background.
    router.push(`/store/${encodeURIComponent(id)}`);
  }, [router, sp]);

  return null;
}

