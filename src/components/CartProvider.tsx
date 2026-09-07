"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine, CartTotals } from "@/data/types";
import { getBookById } from "@/data/catalog";
import { computeTotals, lineKey } from "@/lib/pricing";

const STORAGE_KEY = "sp-prototype-cart-v2";

type AddOptions = {
  quantity?: number;
  packageId?: string;
  packageName?: string;
  discount?: number;
};

type CartContextValue = {
  lines: CartLine[];
  totals: CartTotals;
  count: number;
  add: (bookId: string, options?: AddOptions) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function isValidLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as Partial<CartLine>;
  return (
    typeof line.bookId === "string" &&
    typeof line.quantity === "number" &&
    typeof line.unitPrice === "number"
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed.filter(isValidLine));
      }
    } catch {
      /* the prototype simply starts with an empty cart */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore quota or private-mode errors */
    }
  }, [lines, ready]);

  const add = useCallback((bookId: string, options: AddOptions = {}) => {
    const book = getBookById(bookId);
    if (!book) return;
    const quantity = options.quantity ?? 1;
    const candidate: CartLine = {
      bookId,
      quantity,
      unitPrice: book.price,
      packageId: options.packageId,
      packageName: options.packageName,
      discount: options.discount,
    };
    setLines((prev) => {
      const key = lineKey(candidate);
      const existing = prev.find((l) => lineKey(l) === key);
      if (existing) {
        return prev.map((l) =>
          lineKey(l) === key ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, candidate];
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => lineKey(l) !== key)
        : prev.map((l) => (lineKey(l) === key ? { ...l, quantity } : l))
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => lineKey(l) !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const totals = computeTotals(lines);
    return { lines, totals, count: totals.count, add, setQuantity, remove, clear, ready };
  }, [lines, add, setQuantity, remove, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
