import Link from "next/link";
import Reveal from "@/components/Reveal";
import BookCard from "@/components/BookCard";
import BookCover from "@/components/BookCover";
import { books, entryPoints, newBooks } from "@/data/catalog";
import { packages } from "@/data/packages";
import { mxn } from "@/lib/format";

const shelf = ["pm1", "sec-esp1", "buzz1"]
  .map((id) => books.find((b) => b.id === id))
  .filter(Boolean) as typeof books;

const collections = [
  {
    title: "MCCEMS 2025",
    text: "Bachillerato por propósitos formativos, semestre por semestre.",
    href: "/catalogo?coleccion=MCCEMS%202025",
  },
  {
    title: "Cuadernos de trabajo",
    text: "Secundaria de 1.º a 3.º, alineados a la Nueva Escuela Mexicana.",
    href: "/catalogo?nivel=secundaria",
  },
  {
    title: "Series de inglés",
    text: "Buzzing, Magazine, Xtreme y Totem, del A1 al B1 del MCER.",
    href: "/catalogo?materia=Ingl%C3%A9s",
  },
  {
    title: "Carreras técnicas",
    text: "Recursos humanos, logística, comercio exterior, turismo y datos.",
    href: "/catalogo?coleccion=Carreras%20t%C3%A9cnicas",
  },
];

export default function HomePage() {
  const samplePackage = packages[3];

  return (
    <>
      <section className="hero">
        <div className="shell hero__inner">
          <div className="hero__copy">
            <h1>Los libros del ciclo escolar, ordenados como se enseña.</h1>
            <p className="lede">
              Compra por grado o por semestre, arma el paquete de un grupo completo y recibe el
              acceso a la plataforma junto con el libro impreso.
            </p>
            <div className="row hero__cta">
              <Link href="/catalogo" className="btn">
                Ver el catálogo
              </Link>
              <Link href="/cotizacion" className="btn btn--ghost">
                Soy escuela o distribuidor
              </Link>
            </div>
            <p className="small muted hero__note">
              Prototipo visual · sin cobros ni datos reales
            </p>
          </div>

          <div className="hero__shelf" aria-hidden="true">
            {shelf.map((book, i) => (
              <div key={book.id} className={`hero__book hero__book--${i + 1}`}>
                <BookCover book={book} eager />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <h2>Empieza por el grado</h2>
                <p>Cada entrada abre el catálogo ya filtrado.</p>
              </div>
            </div>
            <div className="chips">
              {entryPoints.map((entry) => (
                <Link
                  key={`${entry.level}-${entry.key}`}
                  href={`/catalogo?nivel=${entry.level}&etapa=${entry.key}`}
                  className="chip"
                >
                  {entry.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <h2>Novedades del ciclo 2026–2027</h2>
                <p>Títulos publicados para el nuevo marco curricular.</p>
              </div>
              <Link href="/catalogo" className="btn btn--quiet">
                Ver todo el catálogo
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid-books">
              {newBooks.slice(0, 6).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--wash">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <h2>Colecciones</h2>
                <p>La misma estructura editorial que ya conocen las escuelas.</p>
              </div>
            </div>
          </Reveal>
          <div className="grid-collections">
            {collections.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <Link href={c.href} className="collection-card">
                  <h3>{c.title}</h3>
                  <p className="small muted">{c.text}</p>
                  <span className="collection-card__cue">Ver títulos</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <h2>Un mismo catálogo, tres formas de comprar</h2>
                <p>Cada público entra por donde le corresponde.</p>
              </div>
            </div>
          </Reveal>
          <div className="grid-audience">
            <Reveal>
              <div className="audience">
                <h3>Familias y estudiantes</h3>
                <p className="small muted">
                  Buscan un título, ven el precio y pagan en línea. El acceso a la plataforma llega
                  con la confirmación de compra.
                </p>
                <Link href="/catalogo" className="btn btn--sm">
                  Comprar un libro
                </Link>
              </div>
            </Reveal>
            <Reveal delay={70}>
              <div className="audience">
                <h3>Escuelas</h3>
                <p className="small muted">
                  Arman el paquete por grado, indican el número de alumnos y reciben una cotización
                  formal con condiciones institucionales.
                </p>
                <Link href="/paquetes" className="btn btn--sm btn--institutional">
                  Armar paquete escolar
                </Link>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="audience">
                <h3>Distribuidores</h3>
                <p className="small muted">
                  Piden por volumen con su descuento de zona y dan seguimiento a los pedidos en
                  curso.
                </p>
                <Link href="/cotizacion?perfil=distribuidor" className="btn btn--sm btn--ghost">
                  Pedido por volumen
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--wash">
        <div className="shell package-teaser">
          <Reveal>
            <div>
              <h2>Un paquete listo en dos pasos</h2>
              <p className="muted">
                Elige el grado, indica cuántos alumnos hay en el grupo y el sistema calcula el
                pedido completo. Las escuelas pueden pagar en línea o pedir cotización.
              </p>
              <p className="package-teaser__example">
                <strong>{samplePackage.name}</strong>
                <span className="muted small">
                  {samplePackage.bookIds.length} títulos · desde{" "}
                  {mxn(
                    Math.round(
                      books
                        .filter((b) => samplePackage.bookIds.includes(b.id))
                        .reduce((s, b) => s + b.price, 0) *
                        (1 - samplePackage.discount)
                    )
                  )}{" "}
                  por alumno
                </span>
              </p>
              <Link href="/paquetes" className="btn">
                Ver paquetes escolares
              </Link>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <ul className="package-teaser__list">
              {books
                .filter((b) => samplePackage.bookIds.includes(b.id))
                .map((b) => (
                  <li key={b.id}>
                    <span>{b.title}</span>
                    <span className="muted small">{b.subject}</span>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="cta-band">
              <div>
                <h2>Los recursos digitales viajan con el libro</h2>
                <p className="muted">
                  Cada ejemplar comprado libera su material en la plataforma. Las escuelas reciben
                  los códigos de todo el grupo en un solo archivo.
                </p>
              </div>
              <Link href="/recursos" className="btn btn--ghost">
                Ver cómo funciona
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
