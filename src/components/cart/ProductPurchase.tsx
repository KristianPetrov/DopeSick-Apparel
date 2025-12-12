"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import type { CartSize } from "./CartProvider";
import SizeSelector from "./SizeSelector";

export default function ProductPurchase({
  productId,
  buttonClassName,
  buttonText = "Add to Cart",
}: {
  productId: string;
  buttonClassName: string;
  buttonText?: string;
}) {
  const [size, setSize] = useState<CartSize>("M");

  return (
    <div className="flex flex-col gap-3">
      <SizeSelector value={size} onChange={setSize} />
      <AddToCartButton productId={productId} size={size} className={buttonClassName}>
        {buttonText}
      </AddToCartButton>
    </div>
  );
}

