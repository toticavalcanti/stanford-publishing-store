"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OrderSummaryLines from "./OrderSummaryLines";
import { useCart } from "./CartProvider";
import { getBookById } from "@/data/catalog";
import { mxn } from "@/lib/format";
import { lineKey, lineTotal } from "@/lib/pricing";
import { makeReference, saveOrderSnapshot } from "@/lib/orderSnapshot";

const payments = [
  { value: "tarjeta", label: "Tarjeta de crédito o débito" },
  { value: "spei", label: "Transferencia SPEI" },
  { value: "oxxo", label: "Pago en efectivo (OXXO)" },
];

export default function CheckoutForm() {
  const { lines, totals, clear, ready } = useCart();
  const router = useRouter();
  const [payment, setPayment] = useState("tarjeta");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Michoacán",
    zip: "",
  });

  if (!ready) return <p className="muted">Cargando el pedido…</p>;

  if (lines.length === 0) {
    return (
      <div className="empty">
        <h2>No hay nada que pagar</h2>
        <p className="muted small">Agrega títulos al carrito para continuar.</p>
        <Link href="/catalogo" className="btn btn--sm">
          Ir al catálogo
        </Link>
      </div>
    );
  }

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // Freeze the order first; only then empty the cart.
    saveOrderSnapshot({
      reference: makeReference(),
      lines,
      totals,
      buyer: { name: form.name, email: form.email, city: form.city, state: form.state },
    });
    clear();
    router.push("/pedido/confirmado");
  }

  return (
    <div className="checkout">
      <form className="checkout__form card" onSubmit={handleSubmit}>
        <p className="prototype-note">
          <strong>Muestra:</strong> demostración visual. No se realizará ningún cobro ni se enviará
          información.
        </p>

        <h2>Datos de contacto</h2>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="phone">Teléfono (opcional)</label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <h2>Dirección de entrega</h2>
        <div className="field">
          <label htmlFor="address">Calle y número</label>
          <input
            id="address"
            required
            autoComplete="street-address"
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="city">Ciudad</label>
            <input
              id="city"
              required
              autoComplete="address-level2"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="state">Estado</label>
            <select
              id="state"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
            >
              <option>Michoacán</option>
              <option>Ciudad de México</option>
              <option>Jalisco</option>
              <option>Guanajuato</option>
              <option>Nuevo León</option>
              <option>Otro</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="zip">Código postal</label>
          <input
            id="zip"
            required
            inputMode="numeric"
            autoComplete="postal-code"
            value={form.zip}
            onChange={(e) => update("zip", e.target.value)}
          />
        </div>

        <fieldset className="checkout__payment">
          <legend>Método de pago simulado</legend>
          {payments.map((p) => (
            <label key={p.value} className="radio">
              <input
                type="radio"
                name="payment"
                value={p.value}
                checked={payment === p.value}
                onChange={() => setPayment(p.value)}
              />
              <span>{p.label}</span>
            </label>
          ))}
          <p className="hypothesis">
            Ningún método está conectado a una pasarela de pago. La selección solo ilustra el paso.
          </p>
        </fieldset>

        <button type="submit" className="btn btn--block">
          Confirmar pedido
        </button>
      </form>

      <aside className="checkout__summary">
        <h2>Tu pedido</h2>
        <ul className="checkout__items">
          {lines.map((line) => {
            const book = getBookById(line.bookId);
            if (!book) return null;
            return (
              <li key={lineKey(line)}>
                <span>
                  {book.title} <span className="muted small">× {line.quantity}</span>
                </span>
                <span className="price">{mxn(lineTotal(line))}</span>
              </li>
            );
          })}
        </ul>
        <OrderSummaryLines
          totals={totals}
          discountRate={lines.find((l) => l.discount)?.discount}
        />
        <Link href="/carrito" className="btn btn--quiet btn--sm">
          Volver al carrito
        </Link>
      </aside>
    </div>
  );
}
