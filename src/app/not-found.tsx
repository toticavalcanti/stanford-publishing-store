import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell shell--narrow">
        <div className="empty">
          <h1>No encontramos esa página</h1>
          <p className="muted">
            El enlace puede haber cambiado. Desde el catálogo puedes llegar a cualquier título.
          </p>
          <Link href="/catalogo" className="btn btn--sm">
            Ir al catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
