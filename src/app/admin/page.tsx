import type { Metadata } from "next";
import AdminScreens from "@/components/AdminScreens";
import PrototypeNote from "@/components/PrototypeNote";

export const metadata: Metadata = { title: "Administración (demo)" };

export default function AdminPage() {
  return (
    <section className="section">
      <div className="shell">
        <header className="page-head">
          <h1>Administración</h1>
          <p className="lede">
            Cómo se vería el trabajo diario del equipo de Stanford Publishing: catálogo, pedidos,
            escuelas y distribuidores en un solo lugar.
          </p>
          <PrototypeNote>
            pantallas ilustrativas con datos de ejemplo. No hay backend ni edición real.
          </PrototypeNote>
        </header>
        <AdminScreens />
      </div>
    </section>
  );
}
