"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OrderSummaryLines from "./OrderSummaryLines";
import { getBookById } from "@/data/catalog";
import { mxn } from "@/lib/format";
import { lineKey, lineTotal } from "@/lib/pricing";
import { readOrderSnapshot } from "@/lib/orderSnapshot";
import type { OrderSnapshot } from "@/data/types";

export default function OrderConfirmation() {
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrder(readOrderSnapshot());
    setLoaded(true);
  }, []);

  if (!loaded) return <p className="muted">Cargando la confirmación…</p>;

  if (!order) {
    return (
      <div className="empty">
        <h1>No encontramos un pedido reciente</h1>
        <p className="muted small">
          La confirmación se genera al terminar el pago. Vuelve al catálogo para iniciar uno nuevo.
        </p>
        <Link href="/catalogo" className="btn btn--sm">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="confirmation confirmation--order">
      <span className="confirmation__mark" aria-hidden="true">
        ✓
      </span>
      <h1>Pedido confirmado</h1>
      <p className="muted">
        Folio <strong>{order.reference}</strong>
        {order.buyer.name ? ` · ${order.buyer.name}` : ""}. Los accesos digitales se enviarían al
        correo registrado.
      </p>

      <div className="card confirmation__summary">
        <ul className="confirmation__items">
          {order.lines.map((line) => {
            const book = getBookById(line.bookId);
            return (
              <li key={lineKey(line)}>
                <span>
                  {book?.title ?? line.bookId} <span className="muted small">× {line.quantity}</span>
                  {line.packageName && (
                    <span className="muted small"> · {line.packageName}</span>
                  )}
                </span>
                <span className="price">{mxn(lineTotal(line))}</span>
              </li>
            );
          })}
        </ul>
        <OrderSummaryLines
          totals={order.totals}
          discountRate={order.lines.find((l) => l.discount)?.discount}
        />
      </div>

      <div className="row">
        <Link href="/recursos" className="btn">
          Ver mis recursos digitales
        </Link>
        <Link href="/catalogo" className="btn btn--ghost">
          Volver al catálogo
        </Link>
      </div>

      <p className="small muted">
        Demostración visual. No se procesó ningún cobro ni se generó un pedido real.
      </p>
    </div>
  );
}
