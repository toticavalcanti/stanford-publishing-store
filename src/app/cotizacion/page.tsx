import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import PrototypeNote from "@/components/PrototypeNote";

export const metadata: Metadata = { title: "Cotización institucional" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function CotizacionPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const perfil = Array.isArray(params.perfil) ? params.perfil[0] : params.perfil;

  return (
    <section className="section">
      <div className="shell shell--narrow">
        <header className="page-head">
          <h1>Escuelas y distribuidores</h1>
          <p className="lede">
            Pedidos por volumen, condiciones por zona y facturación. Un asesor responde con la
            cotización formal.
          </p>
          <PrototypeNote>
            el formulario no envía datos; al enviarlo verás la pantalla de confirmación.
          </PrototypeNote>
        </header>
        <QuoteForm initialProfile={perfil === "distribuidor" ? "distribuidor" : "escuela"} />
      </div>
    </section>
  );
}
