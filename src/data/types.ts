export type Level = "secundaria" | "bachillerato";

export type Book = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  isbn: string;
  level: Level;
  /** Secundaria: school year (1-3). */
  grade?: 1 | 2 | 3;
  /** Bachillerato: semester (1-6). */
  semester?: 1 | 2 | 3 | 4 | 5 | 6;
  subject: string;
  collection: string;
  description: string;
  cover: string;
  /** Simulated public price in MXN. Replace with real pricing rules later. */
  price: number;
  /** Whether the printed book unlocks material on the digital platform. */
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
  /** Simulated institutional discount applied to the sum of list prices. */
  discount: number;
  note: string;
};

export type CartLine = {
  bookId: string;
  quantity: number;
};

export type OrderChannel = "familia" | "escuela" | "distribuidor";
