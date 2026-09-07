import type { SchoolPackage } from "./types";

/**
 * Sample school packages. Contents and discounts are placeholders agreed with
 * the publisher during the commercial phase.
 */
export const packages: SchoolPackage[] = [
  {
    id: "pkg-sec-1",
    name: "Paquete 1.º de secundaria",
    level: "secundaria",
    scope: "Ciclo escolar completo",
    bookIds: ["sec-mat1", "sec-esp1", "sec-cien1", "sec-hist1", "sec-fce1", "sec-tyes1"],
    discount: 0.12,
    note: "Seis cuadernos de trabajo alineados a la Nueva Escuela Mexicana.",
  },
  {
    id: "pkg-sec-2",
    name: "Paquete 2.º de secundaria",
    level: "secundaria",
    scope: "Ciclo escolar completo",
    bookIds: ["sec-mat2", "sec-esp2", "sec-cien2", "sec-hist2", "sec-fce2", "sec-tyes2"],
    discount: 0.12,
    note: "Incluye acceso a la plataforma para el grupo completo.",
  },
  {
    id: "pkg-sec-3",
    name: "Paquete 3.º de secundaria",
    level: "secundaria",
    scope: "Ciclo escolar completo",
    bookIds: ["sec-mat3", "sec-esp3", "sec-cien3", "sec-hist3", "sec-fce3", "sec-guia-bach"],
    discount: 0.14,
    note: "Con la guía de ingreso a bachillerato incluida.",
  },
  {
    id: "pkg-bach-1",
    name: "Paquete 1.er semestre · MCCEMS 2025",
    level: "bachillerato",
    scope: "Semestre",
    bookIds: ["pm1", "lc1", "cn1", "cs1", "cd1", "pfh1"],
    discount: 0.15,
    note: "Las seis áreas del currículum fundamental del primer semestre.",
  },
  {
    id: "pkg-bach-2",
    name: "Paquete 2.º semestre · MCCEMS 2025",
    level: "bachillerato",
    scope: "Semestre",
    bookIds: ["pm2", "lc2", "cn2", "cs2", "cd2", "pfh2"],
    discount: 0.15,
    note: "Continuidad directa del paquete de primer semestre.",
  },
  {
    id: "pkg-bach-ingles",
    name: "Paquete de inglés · Buzzing",
    level: "bachillerato",
    scope: "Tres semestres",
    bookIds: ["buzz1", "buzz2", "buzz3"],
    discount: 0.1,
    note: "Serie completa A1 a A2 con recursos de audio en la plataforma.",
  },
];
