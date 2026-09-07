import type { Metadata } from "next";
import PackageBuilder from "@/components/PackageBuilder";
import PrototypeNote from "@/components/PrototypeNote";

export const metadata: Metadata = { title: "Paquetes escolares" };

export default function PaquetesPage() {
  return (
    <section className="section">
      <div className="shell">
        <header className="page-head">
          <h1>Paquetes escolares</h1>
          <p className="lede">
            Elige el grado o semestre, ajusta los títulos que usa la escuela e indica cuántos alumnos
            hay en el grupo. El pedido se calcula solo.
          </p>
          <PrototypeNote>
            los descuentos institucionales son hipótesis para mostrar el flujo.
          </PrototypeNote>
        </header>
        <PackageBuilder />
      </div>
    </section>
  );
}
