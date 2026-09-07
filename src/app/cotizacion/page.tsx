import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import type { QuoteContext } from "@/components/QuoteSummary";

export const metadata: Metadata = { title: "Cotización institucional" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export default async function CotizacionPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const perfil = first(params.perfil);
  const incluidos = first(params.incluidos);

  const context: QuoteContext = {
    bookSlug: first(params.libro),
    quantity: toNumber(first(params.cantidad)),
    packageId: first(params.paquete),
    students: toNumber(first(params.alumnos)),
    includedIds: incluidos ? incluidos.split(",").filter(Boolean) : undefined,
    fromCart: first(params.origen) === "carrito",
  };

  return (
    <section className="section">
      <div className="shell shell--narrow">
        <header className="page-head">
          <h1>Escuelas y distribuidores</h1>
          <p className="lede">
            Pedidos por volumen, condiciones por zona y facturación. Un asesor respondería con la
            cotización formal.
          </p>
          <p className="prototype-note">
            <strong>Muestra:</strong> demostración visual. No se realizará ningún cobro ni se
            enviará información.
          </p>
        </header>
        <QuoteForm
          initialProfile={perfil === "distribuidor" ? "distribuidor" : "escuela"}
          context={context}
        />
      </div>
    </section>
  );
}
