"use client";

import type { CartSize } from "./CartProvider";

const SIZES: CartSize[] = ["S", "M", "L", "XL", "XXL"];

export default function SizeSelector({
  value,
  onChange,
  className,
}: {
  value: CartSize;
  onChange: (v: CartSize) => void;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="block text-xs uppercase tracking-wide text-white/60">Size</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as CartSize)}
        className="mt-2 h-11 w-full rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
      >
        {SIZES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}

