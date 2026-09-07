import { mxn, percent } from "@/lib/format";
import { FREE_SHIPPING_FROM } from "@/lib/pricing";
import type { CartTotals } from "@/data/types";

/** The one component that renders totals, so cart, checkout and confirmation agree. */
export default function OrderSummaryLines({
  totals,
  discountRate,
}: {
  totals: CartTotals;
  discountRate?: number;
}) {
  return (
    <dl className="summary-lines">
      <div>
        <dt>Ejemplares</dt>
        <dd>{totals.count}</dd>
      </div>
      <div>
        <dt>Subtotal</dt>
        <dd>{mxn(totals.gross)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className="summary-lines__discount">
          <dt>
            Descuento institucional
            {discountRate ? ` (${percent(discountRate)})` : ""}
          </dt>
          <dd>−{mxn(totals.discount)}</dd>
        </div>
      )}
      <div>
        <dt>Envío</dt>
        <dd>{totals.shipping === 0 ? "Incluido" : mxn(totals.shipping)}</dd>
      </div>
      <div className="summary-lines__total">
        <dt>Total estimado</dt>
        <dd>{mxn(totals.total)}</dd>
      </div>
      <p className="hypothesis">
        Precios, descuentos y envío son hipotéticos para esta muestra. El envío se muestra
        incluido a partir de {mxn(FREE_SHIPPING_FROM)}, sujeto a validación con Stanford
        Publishing.
      </p>
    </dl>
  );
}
