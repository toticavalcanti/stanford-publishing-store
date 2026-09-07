"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import BookCover from "./BookCover";
import { useCart } from "./CartProvider";
import { books } from "@/data/catalog";
import { mxn } from "@/lib/format";

export default function CartView() {
  const { lines, subtotal, count, setQuantity, remove, ready } = useCart();
  const router = useRouter();

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

  const shipping = subtotal > 3000 ? 0 : 189;

  return (
    <div className="cart">
      <ul className="cart__lines">
        {lines.map((line) => {
          const book = books.find((b) => b.id === line.bookId);
          if (!book) return null;
          return (
            <li key={line.bookId} className="cart-line">
              <BookCover book={book} className="cover--mini" />
              <div className="cart-line__body">
                <Link href={`/libro/${book.slug}`} className="cart-line__title">
                  {book.title}
                </Link>
                <p className="small muted">
                  {book.subject} · ISBN {book.isbn}
                </p>
                <button type="button" className="btn btn--quiet btn--sm" onClick={() => remove(book.id)}>
                  Quitar
                </button>
              </div>
              <div className="cart-line__qty">
                <label className="visually-hidden" htmlFor={`qty-${book.id}`}>
                  Cantidad de {book.title}
                </label>
                <input
                  id={`qty-${book.id}`}
                  type="number"
                  min={1}
                  max={5000}
                  value={line.quantity}
                  onChange={(e) => setQuantity(book.id, Number(e.target.value) || 1)}
                />
              </div>
              <p className="cart-line__total price">{mxn(book.price * line.quantity)}</p>
            </li>
          );
        })}
      </ul>

      <aside className="cart__summary">
        <h2>Resumen</h2>
        <dl className="summary-lines">
          <div>
            <dt>Ejemplares</dt>
            <dd>{count}</dd>
          </div>
          <div>
            <dt>Subtotal</dt>
            <dd>{mxn(subtotal)}</dd>
          </div>
          <div>
            <dt>Envío</dt>
            <dd>{shipping === 0 ? "Incluido" : mxn(shipping)}</dd>
          </div>
          <div className="summary-lines__total">
            <dt>Total</dt>
            <dd>{mxn(subtotal + shipping)}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="btn btn--block"
          onClick={() => router.push("/pedido/confirmado")}
        >
          Pagar
        </button>
        <Link href="/cotizacion?origen=carrito" className="btn btn--ghost btn--block">
          Convertir en cotización institucional
        </Link>
        <p className="small muted">
          Ningún cobro se procesa en este prototipo. El botón lleva a la pantalla de confirmación.
        </p>
      </aside>
    </div>
  );
}
