import type { OrderSnapshot } from "@/data/types";

const KEY = "sp-prototype-order";

/**
 * The order is frozen in sessionStorage at checkout, before the cart is cleared,
 * so the confirmation screen shows exactly the same numbers the buyer approved.
 */
export function saveOrderSnapshot(snapshot: OrderSnapshot): void {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(snapshot));
  } catch {
    /* confirmation falls back to an empty state */
  }
}

export function readOrderSnapshot(): OrderSnapshot | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OrderSnapshot) : null;
  } catch {
    return null;
  }
}

export function makeReference(): string {
  const n = 2420 + Math.floor(Math.random() * 80);
  return `SP-${n}`;
}
