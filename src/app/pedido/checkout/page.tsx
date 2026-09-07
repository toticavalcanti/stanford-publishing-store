import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = { title: "Pago" };

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="shell">
        <header className="page-head">
          <h1>Finalizar compra</h1>
          <p className="lede">
            Último paso antes de la confirmación: datos de contacto, entrega y método de pago.
          </p>
        </header>
        <CheckoutForm />
      </div>
    </section>
  );
}
