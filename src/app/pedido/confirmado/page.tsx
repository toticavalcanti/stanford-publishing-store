import type { Metadata } from "next";
import OrderConfirmation from "@/components/OrderConfirmation";

export const metadata: Metadata = { title: "Pedido confirmado" };

export default function ConfirmadoPage() {
  return (
    <section className="section">
      <div className="shell shell--narrow">
        <OrderConfirmation />
      </div>
    </section>
  );
}
