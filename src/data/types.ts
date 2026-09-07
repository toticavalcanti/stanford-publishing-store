export type Level = "secundaria" | "bachillerato";

/**
 * How much we can say about a title's ISBN.
 * - "verificado": printed on the official catalogue and passes ISBN-13/10 validation.
 * - "en-tramite": the official catalogue literally states "En trámite".
 * - "por-confirmar": the official catalogue shows no ISBN, or the printed value is
 *   malformed (wrong prefix, failed checksum, evident placeholder). We never guess
 *   a replacement — the UI says the number is pending confirmation.
 */
export type IsbnStatus = "verificado" | "en-tramite" | "por-confirmar";

export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  /** Empty when the official source has no usable value. */
  isbn: string;
  isbnStatus: IsbnStatus;
  level: Level;
  /** Secundaria: school year (1-3). */
  grade?: 1 | 2 | 3;
  /** Bachillerato: semester (1-6). */
  semester?: 1 | 2 | 3 | 4 | 5 | 6;
  subject: string;
  collection: string;
  description: string;
  /** Remote cover on the publisher's site; a local copy takes precedence when present. */
  cover: string;
  /** Hypothetical public price in MXN, for the demo only. */
  price: number;
  digital: boolean;
  featured?: boolean;
  isNew?: boolean;
};

export type SchoolPackage = {
  id: string;
  name: string;
  level: Level;
  scope: string;
  bookIds: string[];
  /** Hypothetical institutional discount, 0-1. */
  discount: number;
  note: string;
};

/**
 * A cart line keeps where it came from so a package discount survives the whole
 * journey: cart -> checkout -> quote -> confirmation.
 */
export type CartLine = {
  bookId: string;
  quantity: number;
  /** List price captured when the line was created. */
  unitPrice: number;
  packageId?: string;
  packageName?: string;
  /** Discount applied to this line, 0-1. */
  discount?: number;
};

export type CartTotals = {
  count: number;
  gross: number;
  discount: number;
  subtotal: number;
  shipping: number;
  total: number;
};

/** Frozen copy of an order, kept in sessionStorage across checkout and confirmation. */
export type OrderSnapshot = {
  reference: string;
  lines: CartLine[];
  totals: CartTotals;
  buyer: { name: string; email: string; city: string; state: string };
};

export type OrderChannel = "familia" | "escuela" | "distribuidor";
