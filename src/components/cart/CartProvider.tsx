"use client";

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type CartSize = "S" | "M" | "L" | "XL" | "XXL";

export type CartLine = {
  productId: string;
  size: CartSize;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
};

type CartAction =
  | { type: "hydrate"; state: CartState }
  | { type: "add"; productId: string; size: CartSize; quantity: number }
  | { type: "setQty"; productId: string; size: CartSize; quantity: number }
  | { type: "remove"; productId: string; size: CartSize }
  | { type: "clear" };

const STORAGE_KEY = "dopesick.cart.v1";

function normalizeSize(size: unknown): CartSize {
  const s = String(size || "").toUpperCase();
  if (s === "S" || s === "M" || s === "L" || s === "XL" || s === "XXL") return s;
  return "M";
}

function clampQty(q: number) {
  if (!Number.isFinite(q)) return 1;
  return Math.max(1, Math.min(99, Math.floor(q)));
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const quantity = clampQty(action.quantity);
      const size = normalizeSize(action.size);
      const existing = state.lines.find((l) => l.productId === action.productId && l.size === size);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === action.productId && l.size === size
              ? { ...l, quantity: clampQty(l.quantity + quantity) }
              : l,
          ),
        };
      }
      return { lines: [...state.lines, { productId: action.productId, size, quantity }] };
    }
    case "setQty": {
      const quantity = clampQty(action.quantity);
      const size = normalizeSize(action.size);
      return {
        lines: state.lines.map((l) =>
          l.productId === action.productId && l.size === size ? { ...l, quantity } : l,
        ),
      };
    }
    case "remove":
      return {
        lines: state.lines.filter((l) => !(l.productId === action.productId && l.size === action.size)),
      };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartApi = {
  lines: CartLine[];
  addItem: (productId: string, size: CartSize, quantity?: number) => void;
  setQty: (productId: string, size: CartSize, quantity: number) => void;
  removeItem: (productId: string, size: CartSize) => void;
  clear: () => void;
  itemCount: number;
};

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  // Hydrate from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (!parsed || !Array.isArray(parsed.lines)) return;
      // Backward compatible: old carts without size default to "M"
      const lines = parsed.lines
        .filter(Boolean)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((l: any) => ({
          productId: String(l.productId),
          size: normalizeSize(l.size),
          quantity: clampQty(Number(l.quantity)),
        }));
      dispatch({ type: "hydrate", state: { lines } });
    } catch {
      // ignore
    }
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const api = useMemo<CartApi>(() => {
    const itemCount = state.lines.reduce((sum, l) => sum + (l.quantity || 0), 0);
    return {
      lines: state.lines,
      addItem: (productId, size, quantity = 1) => dispatch({ type: "add", productId, size, quantity }),
      setQty: (productId, size, quantity) => dispatch({ type: "setQty", productId, size, quantity }),
      removeItem: (productId, size) => dispatch({ type: "remove", productId, size }),
      clear: () => dispatch({ type: "clear" }),
      itemCount,
    };
  }, [state.lines]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

