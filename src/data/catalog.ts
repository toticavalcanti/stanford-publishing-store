import { bachilleratoBooks } from "./books";
import { secundariaBooks } from "./books-secundaria";
import { localCovers } from "./covers";
import type { Book, Level } from "./types";

export const books: Book[] = [...secundariaBooks, ...bachilleratoBooks];

export const levelLabel: Record<Level, string> = {
  secundaria: "Secundaria",
  bachillerato: "Bachillerato",
};

export const gradeLabel: Record<number, string> = {
  1: "1.º grado",
  2: "2.º grado",
  3: "3.º grado",
};

export const semesterLabel: Record<number, string> = {
  1: "Primer semestre",
  2: "Segundo semestre",
  3: "Tercer semestre",
  4: "Cuarto semestre",
  5: "Quinto semestre",
  6: "Sexto semestre",
};

/** What the interface shows in place of an ISBN we cannot vouch for. */
export function isbnLabel(book: Book): string {
  if (book.isbnStatus === "verificado" && book.isbn) return book.isbn;
  if (book.isbnStatus === "en-tramite") return "En trámite";
  return "Por confirmar";
}

/** Local file when it exists, otherwise the publisher's own URL. */
export function coverSrc(book: Book): string {
  return localCovers[book.slug] ?? book.cover;
}

/** Stage label: grade for secundaria, semester for bachillerato. */
export function stageLabel(book: Book): string {
  if (book.level === "secundaria") {
    return book.grade ? gradeLabel[book.grade] : "Secundaria";
  }
  return book.semester ? semesterLabel[book.semester] : "Bachillerato";
}

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export function getBooksByIds(ids: string[]): Book[] {
  return ids.map((id) => getBookById(id)).filter((b): b is Book => Boolean(b));
}

export function subjectsFor(level?: Level): string[] {
  const scope = level ? books.filter((b) => b.level === level) : books;
  return [...new Set(scope.map((b) => b.subject))].sort((a, b) => a.localeCompare(b, "es"));
}

export function collectionsFor(level?: Level): string[] {
  const scope = level ? books.filter((b) => b.level === level) : books;
  return [...new Set(scope.map((b) => b.collection))].sort((a, b) => a.localeCompare(b, "es"));
}

export const featuredBooks = books.filter((b) => b.featured);
export const newBooks = books.filter((b) => b.isNew).slice(0, 8);

/** Grouping used by the "compra por grado" entry points on the home page. */
export const entryPoints = [
  { level: "secundaria" as Level, key: "1", label: "1.º de secundaria" },
  { level: "secundaria" as Level, key: "2", label: "2.º de secundaria" },
  { level: "secundaria" as Level, key: "3", label: "3.º de secundaria" },
  { level: "bachillerato" as Level, key: "1", label: "1.er semestre" },
  { level: "bachillerato" as Level, key: "2", label: "2.º semestre" },
  { level: "bachillerato" as Level, key: "3", label: "3.er semestre" },
  { level: "bachillerato" as Level, key: "4", label: "4.º semestre" },
  { level: "bachillerato" as Level, key: "5", label: "5.º semestre" },
  { level: "bachillerato" as Level, key: "6", label: "6.º semestre" },
];
