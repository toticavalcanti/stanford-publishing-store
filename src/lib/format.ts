export function mxn(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function plural(n: number, one: string, many: string): string {
  return n === 1 ? one : many;
}
