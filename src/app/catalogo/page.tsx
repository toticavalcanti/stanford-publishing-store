import type { Metadata } from "next";
import CatalogBrowser, { type CatalogFilters } from "@/components/CatalogBrowser";
import PrototypeNote from "@/components/PrototypeNote";
import type { Level } from "@/data/types";

export const metadata: Metadata = { title: "Catálogo" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CatalogoPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const level = first(params.nivel);

  const initial: Partial<CatalogFilters> = {
    query: first(params.q) ?? "",
    level: level === "secundaria" || level === "bachillerato" ? (level as Level) : "todos",
    stage: first(params.etapa) ?? "todos",
    subject: first(params.materia) ?? "todas",
    collection: first(params.coleccion) ?? "todas",
  };

  return (
    <section className="section">
      <div className="shell">
        <header className="page-head">
          <h1>Catálogo</h1>
          <p className="lede">
            Todo el fondo editorial de Stanford Publishing organizado por nivel, grado o semestre,
            disciplina y colección.
          </p>
          <PrototypeNote>
            los precios son de referencia y sirven para mostrar el flujo de compra.
          </PrototypeNote>
        </header>
        <CatalogBrowser initial={initial} />
      </div>
    </section>
  );
}
