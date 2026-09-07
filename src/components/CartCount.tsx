"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartCount() {
  const { count, ready } = useCart();
  return (
    <Link href="/carrito" className="cart-link">
      <span aria-hidden="true" className="cart-link__icon">
        {/* simple bag glyph */}
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3.5 6.5h13l-1 10.5h-11z" strokeLinejoin="round" />
          <path d="M7 6.5V5a3 3 0 1 1 6 0v1.5" strokeLinecap="round" />
        </svg>
      </span>
      Carrito
      {ready && count > 0 && <span className="cart-link__count">{count}</span>}
    </Link>
  );
}
