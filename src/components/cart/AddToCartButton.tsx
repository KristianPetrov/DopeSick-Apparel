"use client";

import { useCart } from "./CartProvider";
import type { CartSize } from "./CartProvider";

export default function AddToCartButton({
  productId,
  size,
  className,
  children,
}: {
  productId: string;
  size: CartSize;
  className?: string;
  children?: React.ReactNode;
}) {
  const { addItem } = useCart();
  return (
    <button type="button" className={className} onClick={() => addItem(productId, size, 1)}>
      {children ?? "Add to Cart"}
    </button>
  );
}

