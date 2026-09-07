/**
 * Discreet marker for commercial assumptions (prices, discounts, shipping,
 * digital access rules) at the points where a viewer might mistake them for
 * confirmed terms.
 */
export default function Hypothesis({ children }: { children?: React.ReactNode }) {
  return (
    <p className="hypothesis">
      {children ?? "Precio hipotético para esta muestra, sujeto a validación con Stanford Publishing."}
    </p>
  );
}
