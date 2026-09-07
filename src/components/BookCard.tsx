import Link from "next/link";
import BookCover from "./BookCover";
import { mxn } from "@/lib/format";
import { gradeLabel, semesterLabel } from "@/data/catalog";
import type { Book } from "@/data/types";

export default function BookCard({ book, eager }: { book: Book; eager?: boolean }) {
  const stage =
    book.level === "secundaria"
      ? book.grade
        ? gradeLabel[book.grade]
        : "Secundaria"
      : book.semester
        ? semesterLabel[book.semester]
        : "Bachillerato";

  return (
    <article className="book-card">
      <Link href={`/libro/${book.slug}`} className="book-card__link">
        <BookCover book={book} eager={eager} />
        <div className="book-card__body">
          <p className="book-card__meta">
            {stage} · {book.subject}
          </p>
          <h3 className="book-card__title">{book.title}</h3>
          {book.subtitle && <p className="book-card__sub">{book.subtitle}</p>}
        </div>
      </Link>
      <div className="book-card__foot">
        <span className="price">{mxn(book.price)}</span>
        {book.digital && <span className="badge badge--digital">Recursos digitales</span>}
      </div>
    </article>
  );
}
