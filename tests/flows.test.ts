/* Logic checks for the money paths and the catalogue. Run with: npx tsx tests/flows.test.ts */
import assert from "node:assert/strict";
import { books, getBookById, isbnLabel, coverSrc, stageLabel } from "../src/data/catalog";
import { packages } from "../src/data/packages";
import { computeTotals, lineKey, lineTotal, round2 } from "../src/lib/pricing";
import { mxn } from "../src/lib/format";
import type { CartLine } from "../src/data/types";

let passed = 0;
const failures: string[] = [];
function test(name: string, fn: () => void) {
  try {
    fn();
    passed++;
    console.log(`  ok   ${name}`);
  } catch (error) {
    failures.push(`${name}: ${(error as Error).message}`);
    console.log(`  FAIL ${name}`);
    console.log(`       ${(error as Error).message}`);
  }
}

console.log("\n--- catálogo ---");
test("74 títulos", () => assert.equal(books.length, 74));
test("sin ids duplicados", () =>
  assert.equal(new Set(books.map((b) => b.id)).size, 74));
test("sin slugs duplicados", () =>
  assert.equal(new Set(books.map((b) => b.slug)).size, 74));
test("secundaria 1.er grado = 9", () =>
  assert.equal(books.filter((b) => b.level === "secundaria" && b.grade === 1).length, 9));
test("todo libro tiene grado o semestre", () =>
  books.forEach((b) =>
    assert.ok(
      b.level === "secundaria" ? b.grade : b.semester,
      `${b.id} sin etapa`
    )
  ));
test("stageLabel nunca vacío", () =>
  books.forEach((b) => assert.ok(stageLabel(b).length > 0, b.id)));

console.log("\n--- ISBN ---");
const digits = (s: string) => s.replace(/[^0-9X]/gi, "").toUpperCase();
function validIsbn13(d: string) {
  if (d.length !== 13 || !/^97[89]/.test(d)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) sum += Number(d[i]) * (i % 2 ? 3 : 1);
  return (10 - (sum % 10)) % 10 === Number(d[12]);
}
test("todo isbn 'verificado' pasa la validación ISBN-13", () =>
  books
    .filter((b) => b.isbnStatus === "verificado")
    .forEach((b) => assert.ok(validIsbn13(digits(b.isbn)), `${b.id}: ${b.isbn}`)));
test("ningún isbn dudoso se muestra como número", () =>
  books
    .filter((b) => b.isbnStatus !== "verificado")
    .forEach((b) =>
      assert.ok(
        ["Por confirmar", "En trámite"].includes(isbnLabel(b)),
        `${b.id} muestra ${isbnLabel(b)}`
      )
    ));
test("ningún placeholder 123-456 sobrevive", () =>
  books.forEach((b) => assert.ok(!/123-?456/.test(b.isbn), b.id)));
test("conteos: 39 verificados / 3 en trámite / 32 por confirmar", () => {
  const c = (s: string) => books.filter((b) => b.isbnStatus === s).length;
  assert.deepEqual([c("verificado"), c("en-tramite"), c("por-confirmar")], [39, 3, 32]);
});

console.log("\n--- portadas ---");
test("coverSrc devuelve una URL utilizable para los 74", () =>
  books.forEach((b) => assert.ok(coverSrc(b).length > 10, b.id)));
test("sin manifiesto local, ninguna ruta /covers/ puede dar 404", () =>
  books.forEach((b) =>
    assert.ok(!coverSrc(b).startsWith("/covers/"), `${b.id} apunta a un archivo local ausente`)
  ));

console.log("\n--- carrito: compra simple ---");
const simple: CartLine[] = [
  { bookId: "sec-mat1", quantity: 1, unitPrice: 340 },
  { bookId: "sec-esp1", quantity: 1, unitPrice: 340 },
  { bookId: "sec-cien1", quantity: 1, unitPrice: 340 },
];
const simpleTotals = computeTotals(simple);
test("subtotal 1020", () => assert.equal(simpleTotals.subtotal, 1020));
test("envío 189 bajo el umbral", () => assert.equal(simpleTotals.shipping, 189));
test("total = subtotal + envío (el bug de la confirmación)", () =>
  assert.equal(simpleTotals.total, 1209));
test("envío incluido a partir de 3000", () =>
  assert.equal(
    computeTotals([{ bookId: "sec-mat1", quantity: 10, unitPrice: 340 }]).shipping,
    0
  ));

console.log("\n--- paquete: 5 títulos, 45 alumnos, 15% ---");
const pack = packages.find((p) => p.id === "pkg-bach-1")!;
const kept = pack.bookIds.filter((id) => id !== "pfh1");
const packLines: CartLine[] = kept.map((id) => ({
  bookId: id,
  quantity: 45,
  unitPrice: getBookById(id)!.price,
  packageId: pack.id,
  packageName: pack.name,
  discount: pack.discount,
}));
const packTotals = computeTotals(packLines);
test("5 títulos tras quitar uno", () => assert.equal(kept.length, 5));
test("precio de lista 100 125", () => assert.equal(packTotals.gross, 100125));
test("descuento 15 018,75", () => assert.equal(packTotals.discount, 15018.75));
test("total 85 106,25", () => assert.equal(packTotals.total, 85106.25));
test("formato es-MX = $85,106.25", () => assert.equal(mxn(packTotals.total), "$85,106.25"));
test("el título retirado no reaparece", () =>
  assert.ok(!packLines.some((l) => l.bookId === "pfh1")));
test("cada línea conserva paquete y descuento", () =>
  packLines.forEach((l) => {
    assert.equal(l.packageId, "pkg-bach-1");
    assert.equal(l.discount, 0.15);
  }));

console.log("\n--- carrito mixto: suelto + paquete ---");
const mixed: CartLine[] = [
  ...packLines,
  { bookId: "pm1", quantity: 2, unitPrice: 445 },
];
test("mismo libro suelto y en paquete son líneas distintas", () => {
  const keys = mixed.map(lineKey);
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.includes("pm1::pkg-bach-1") && keys.includes("pm1::"));
});
test("el descuento sólo afecta las líneas del paquete", () => {
  const loose = mixed.find((l) => !l.packageId)!;
  assert.equal(lineTotal(loose), 890);
});
const mixedTotals = computeTotals(mixed);
test("totales del carrito mixto cuadran", () =>
  assert.equal(mixedTotals.total, round2(mixedTotals.gross - mixedTotals.discount)));

console.log("\n--- snapshot: carrito = checkout = confirmación ---");
const snapshot = { lines: mixed, totals: mixedTotals };
test("la confirmación reproduce el total del checkout", () =>
  assert.deepEqual(computeTotals(snapshot.lines), snapshot.totals));
test("el snapshot conserva el nombre del paquete", () =>
  assert.ok(snapshot.lines.some((l) => l.packageName === pack.name)));

console.log("\n--- paquetes ---");
test("todo bookId de paquete existe en el catálogo", () =>
  packages.forEach((p) =>
    p.bookIds.forEach((id) => assert.ok(getBookById(id), `${p.id} -> ${id}`))
  ));
test("descuentos entre 0 y 30%", () =>
  packages.forEach((p) => assert.ok(p.discount > 0 && p.discount <= 0.3, p.id)));

console.log(`\n${passed} pruebas ok, ${failures.length} fallos`);
if (failures.length) {
  failures.forEach((f) => console.log(" - " + f));
  process.exit(1);
}
