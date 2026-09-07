"use client";

import Link from "next/link";
import BookCover from "./BookCover";
import OrderSummaryLines from "./OrderSummaryLines";
import { useCart } from "./CartProvider";
import { getBookById, isbnLabel } from "@/data/catalog";
import { mxn, percent } from "@/lib/format";
import { lineGross, lineKey, lineTotal } from "@/lib/pricing";

export default function CartView() {
  const { lines, totals, setQuantity, remove, ready } = useCart();

  if (!ready) {
    return <p className="muted">Cargando el carrito…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="empty">
        <h3>El carrito está vacío</h3>
        <p className="muted small">
          Agrega títulos desde el catálogo o arma un paquete escolar completo.
        </p>
        <div className="row">
          <Link href="/catalogo" className="btn btn--sm">
            Ir al catálogo
          </Link>
          <Link href="/paquetes" className="btn btn--sm btn--ghost">
            Ver paquetes
          </Link>
        </div>
      </div>
    );
  }

  const packageRate = lines.find((l) => l.discount)?.discount;

  return (
    <div className="cart">
      <ul className="cart__lines">
        {lines.map((line) => {
          const book = getBookById(line.bookId);
          if (!book) return null;
          const key = lineKey(line);
          return (
            <li key={key} className="cart-line">
              <BookCover book={book} className="cover--mini" />
              <div className="cart-line__body">
                <Link href={`/libro/${book.slug}`} className="cart-line__title">
                  {book.title}
                </Link>
                <p className="small muted">
                  {book.subject} · ISBN {isbnLabel(book)}
                </p>
                {line.packageName && (
                  <p className="cart-line__origin">
                    <span className="badge badge--digital">
                      {line.packageName}
                      {line.discount ? ` · −${percent(line.discount)}` : ""}
                    </span>
                  </p>
                )}
                <button type="button" className="btn btn--quiet btn--sm" onClick={() => remove(key)}>
                  Quitar
                </button>
              </div>
              <div className="cart-line__qty">
                <label className="visually-hidden" htmlFor={`qty-${key}`}>
                  Cantidad de {book.title}
                </label>
                <input
                  id={`qty-${key}`}
                  type="number"
                  min={1}
                  max={5000}
                  value={line.quantity}
                  onChange={(e) => setQuantity(key, Number(e.target.value) || 1)}
                />
              </div>
              <p className="cart-line__total">
                {line.discount ? (
                  <>
                    <span className="cart-line__was">{mxn(lineGross(line))}</span>
                    <span className="price">{mxn(lineTotal(line))}</span>
                  </>
                ) : (
                  <span className="price">{mxn(lineTotal(line))}</span>
                )}
              </p>
            </li>
          );
        })}
      </ul>

      <aside className="cart__summary">
        <h2>Resumen</h2>
        <OrderSummaryLines totals={totals} discountRate={packageRate} />

        <Link href="/pedido/checkout" className="btn btn--block">
          Continuar al pago
        </Link>
        <Link href="/cotizacion?origen=carrito" className="btn btn--ghost btn--block">
          Convertir en cotización institucional
        </Link>
        <p className="small muted">
          Demostración visual. No se realizará ningún cobro ni se enviará información.
        </p>
      </aside>
    </div>
  );
}
