import type { CartLine, CartTotals } from "@/data/types";
import { getBookById } from "@/data/catalog";

/** Hypothetical shipping rules for the demo, not a commercial commitment. */
export const SHIPPING_FLAT = 189;
export const FREE_SHIPPING_FROM = 3000;

export function lineGross(line: CartLine): number {
  return line.unitPrice * line.quantity;
}

export function lineDiscount(line: CartLine): number {
  return lineGross(line) * (line.discount ?? 0);
}

export function lineTotal(line: CartLine): number {
  return lineGross(line) - lineDiscount(line);
}

export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/** Single source of truth for every total shown in cart, checkout and confirmation. */
export function computeTotals(lines: CartLine[]): CartTotals {
  const gross = round2(lines.reduce((sum, l) => sum + lineGross(l), 0));
  const discount = round2(lines.reduce((sum, l) => sum + lineDiscount(l), 0));
  const subtotal = round2(gross - discount);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FLAT;
  return {
    count: lines.reduce((sum, l) => sum + l.quantity, 0),
    gross,
    discount,
    subtotal,
    shipping,
    total: round2(subtotal + shipping),
  };
}

/** Lines sharing a package, for grouped display. */
export function groupByPackage(lines: CartLine[]): Map<string, CartLine[]> {
  const groups = new Map<string, CartLine[]>();
  for (const line of lines) {
    const key = line.packageId ?? "";
    const current = groups.get(key) ?? [];
    current.push(line);
    groups.set(key, current);
  }
  return groups;
}

export function lineKey(line: Pick<CartLine, "bookId" | "packageId">): string {
  return `${line.bookId}::${line.packageId ?? ""}`;
}

export function lineTitle(line: CartLine): string {
  return getBookById(line.bookId)?.title ?? line.bookId;
}
