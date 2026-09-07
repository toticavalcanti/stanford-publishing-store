import type { Metadata } from "next";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import Reveal from "@/components/Reveal";
import PrototypeNote from "@/components/PrototypeNote";
import { books } from "@/data/catalog";

export const metadata: Metadata = { title: "Recursos digitales" };

const steps = [
  {
    title: "Se confirma la compra",
    text: "Al pagar en línea o al recibir el pedido institucional, cada ejemplar queda asociado a la cuenta del comprador.",
  },
  {
    title: "Se liberan los accesos",
    text: "La tienda genera un código por ejemplar. Las escuelas reciben la lista completa del grupo en un solo archivo.",
  },
  {
    title: "El material queda disponible",
    text: "Alumnado y docentes entran a la plataforma con su código y encuentran los recursos del título correspondiente.",
  },
];

const owned = ["pm1", "lc1", "buzz1"]
  .map((id) => books.find((b) => b.id === id))
  .filter(Boolean) as typeof books;

export default function RecursosPage() {
  return (
    <>
      <section className="section section--tight">
        <div className="shell">
          <header className="page-head">
            <h1>Recursos digitales</h1>
            <p className="lede">
              El libro impreso y el material en línea se entregan juntos. Así se vería el acceso
              después de la compra.
            </p>
            <PrototypeNote>
              no hay inicio de sesión ni liberación real; la pantalla es ilustrativa.
            </PrototypeNote>
          </header>

          <ol className="steps">
            {steps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 70}>
                <span className="steps__num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p className="small muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--wash">
        <div className="shell">
          <Reveal>
            <div className="section-head">
              <div>
                <h2>Mis recursos digitales</h2>
                <p>Vista simulada de la cuenta de una familia después de comprar tres títulos.</p>
              </div>
            </div>
          </Reveal>

          <div className="resources">
            {owned.map((book, i) => (
              <Reveal key={book.id} delay={i * 60}>
                <article className="resource">
                  <BookCover book={book} className="cover--mini" />
                  <div className="resource__body">
                    <h3>{book.title}</h3>
                    <p className="small muted">{book.subject}</p>
                    <p className="resource__code">
                      <span className="muted small">Código de acceso</span>
                      <code>SP-{book.id.toUpperCase()}-4821</code>
                    </p>
                  </div>
                  <span className="btn btn--sm btn--ghost resource__cta" aria-disabled="true">
                    Entrar a la plataforma
                  </span>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="cta-band cta-band--soft">
            <div>
              <h3>Escuelas: accesos de todo el grupo</h3>
              <p className="muted small">
                Una sola descarga con los códigos por alumno y por título, lista para repartir en
                clase.
              </p>
            </div>
            <Link href="/paquetes" className="btn btn--ghost">
              Ver paquetes escolares
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
