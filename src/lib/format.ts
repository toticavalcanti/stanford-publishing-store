/**
 * Currency for the demo. Decimals are shown only when the value actually has
 * them, so a package total of 85 106.25 never looks rounded away while whole
 * amounts stay easy to read.
 */
export function mxn(value: number): string {
  const hasCents = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(value);
}

export function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}
