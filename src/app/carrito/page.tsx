import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = { title: "Carrito" };

export default function CarritoPage() {
  return (
    <section className="section">
      <div className="shell">
        <header className="page-head">
          <h1>Carrito</h1>
          <p className="lede">
            Compra directa para familias y docentes, o el mismo pedido convertido en cotización para
            una escuela.
          </p>
        </header>
        <CartView />
      </div>
    </section>
  );
}
