import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCover from "@/components/BookCover";
import BookCard from "@/components/BookCard";
import AddToCart from "@/components/AddToCart";
import Reveal from "@/components/Reveal";
import { books, getBook, gradeLabel, levelLabel, semesterLabel } from "@/data/catalog";
import { mxn } from "@/lib/format";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  return { title: book ? book.title : "Título no encontrado" };
}

export default async function BookPage({ params }: { params: Params }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const stage =
    book.level === "secundaria"
      ? book.grade
        ? gradeLabel[book.grade]
        : ""
      : book.semester
        ? semesterLabel[book.semester]
        : "";

  const related = books
    .filter((b) => b.id !== book.id && b.collection === book.collection)
    .slice(0, 4);

  return (
    <>
      <section className="section section--tight">
        <div className="shell">
          <nav className="crumbs" aria-label="Ruta">
            <Link href="/catalogo">Catálogo</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/catalogo?nivel=${book.level}`}>{levelLabel[book.level]}</Link>
            <span aria-hidden="true">/</span>
            <span className="muted">{book.title}</span>
          </nav>

          <div className="product">
            <div className="product__cover">
              <BookCover book={book} eager />
            </div>

            <div className="product__info">
              <div className="row">
                <span className="badge">{levelLabel[book.level]}</span>
                {stage && <span className="badge">{stage}</span>}
                {book.isNew && <span className="badge badge--new">Novedad</span>}
              </div>

              <h1>{book.title}</h1>
              {book.subtitle && <p className="product__subtitle">{book.subtitle}</p>}
              <p className="lede">{book.description}</p>

              <dl className="specs">
                <div>
                  <dt>Autoría</dt>
                  <dd>{book.author}</dd>
                </div>
                <div>
                  <dt>ISBN</dt>
                  <dd>{book.isbn}</dd>
                </div>
                <div>
                  <dt>Disciplina</dt>
                  <dd>{book.subject}</dd>
                </div>
                <div>
                  <dt>Colección</dt>
                  <dd>{book.collection}</dd>
                </div>
              </dl>

              <div className="buybox">
                <p className="buybox__price price">{mxn(book.price)}</p>
                <p className="small muted">Precio público sugerido, IVA incluido.</p>
                <div className="buybox__actions">
                  <AddToCart bookId={book.id} block />
                  <Link href={`/cotizacion?libro=${book.slug}`} className="btn btn--ghost btn--block">
                    Solicitar cotización institucional
                  </Link>
                </div>
                {book.digital && (
                  <p className="buybox__digital">
                    <span className="badge badge--digital">Recursos digitales</span>
                    <span className="small muted">
                      La compra libera el material del título en la plataforma.{" "}
                      <Link href="/recursos">Ver cómo funciona</Link>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--wash">
          <div className="shell">
            <Reveal>
              <div className="section-head">
                <div>
                  <h2>De la misma colección</h2>
                  <p>{book.collection}</p>
                </div>
                <Link href={`/catalogo?coleccion=${encodeURIComponent(book.collection)}`} className="btn btn--quiet">
                  Ver la colección
                </Link>
              </div>
              <div className="grid-books">
                {related.map((b) => (
                  <BookCard key={b.id} book={b} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
