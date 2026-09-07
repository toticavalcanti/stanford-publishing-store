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
import type { CartLine } from "@/data/types";
import { books } from "@/data/catalog";

const STORAGE_KEY = "sp-prototype-cart";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (bookId: string, quantity?: number) => void;
  setQuantity: (bookId: string, quantity: number) => void;
  remove: (bookId: string) => void;
  clear: () => void;
  ready: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
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

  const add = useCallback((bookId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.bookId === bookId);
      if (existing) {
        return prev.map((l) =>
          l.bookId === bookId ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { bookId, quantity }];
    });
  }, []);

  const setQuantity = useCallback((bookId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.bookId !== bookId)
        : prev.map((l) => (l.bookId === bookId ? { ...l, quantity } : l))
    );
  }, []);

  const remove = useCallback((bookId: string) => {
    setLines((prev) => prev.filter((l) => l.bookId !== bookId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);
    const subtotal = lines.reduce((sum, l) => {
      const book = books.find((b) => b.id === l.bookId);
      return sum + (book ? book.price * l.quantity : 0);
    }, 0);
    return { lines, count, subtotal, add, setQuantity, remove, clear, ready };
  }, [lines, add, setQuantity, remove, clear, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
