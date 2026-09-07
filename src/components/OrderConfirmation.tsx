"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { books } from "@/data/catalog";
import { mxn } from "@/lib/format";
import type { CartLine } from "@/data/types";

export default function OrderConfirmation() {
  const { lines, subtotal, clear, ready } = useCart();
  const [snapshot, setSnapshot] = useState<{ lines: CartLine[]; total: number } | null>(null);

  // Freeze the cart at arrival so the summary stays visible after clearing it.
  useEffect(() => {
    if (!ready) return;
    setSnapshot((prev) => prev ?? { lines, total: subtotal });
    clear();
  }, [ready, lines, subtotal, clear]);

  const items = snapshot?.lines ?? [];

  return (
    <div className="confirmation confirmation--order">
      <span className="confirmation__mark" aria-hidden="true">
        ✓
      </span>
      <h1>Pedido confirmado</h1>
      <p className="muted">
        Folio <strong>SP-2420</strong>. Enviamos el comprobante y los accesos digitales al correo
        registrado.
      </p>

      {items.length > 0 && (
        <div className="card confirmation__summary">
          <ul className="confirmation__items">
            {items.map((line) => {
              const book = books.find((b) => b.id === line.bookId);
              if (!book) return null;
              return (
                <li key={line.bookId}>
                  <span>
                    {book.title} <span className="muted small">× {line.quantity}</span>
                  </span>
                  <span className="price">{mxn(book.price * line.quantity)}</span>
                </li>
              );
            })}
          </ul>
          <p className="confirmation__total">
            <span>Total</span>
            <span className="price">{mxn(snapshot?.total ?? 0)}</span>
          </p>
        </div>
      )}

      <div className="row">
        <Link href="/recursos" className="btn">
          Ver mis recursos digitales
        </Link>
        <Link href="/catalogo" className="btn btn--ghost">
          Volver al catálogo
        </Link>
      </div>

      <p className="small muted">
        Prototipo: no se procesó ningún pago ni se generó un pedido real.
      </p>
    </div>
  );
}
