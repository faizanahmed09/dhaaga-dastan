import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <div className="flex flex-col gap-1 text-ui-fg-base mb-6">
      <div className="flex items-center gap-4">
        <span
          className={clx("font-heading text-3xl font-bold", {
            "text-brand-secondary": selectedPrice.price_type === "sale",
            "text-brand-primary": selectedPrice.price_type !== "sale",
          })}
        >
          {!variant && <span className="text-sm font-normal text-gray-500 mr-2 font-sans">From</span>}
          <span
            data-testid="product-price"
            data-value={selectedPrice.calculated_price_number}
          >
            {selectedPrice.calculated_price}
          </span>
        </span>
        {selectedPrice.price_type === "sale" && (
          <span
            className="text-lg text-gray-400 line-through decoration-1"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
        )}
      </div>
      {selectedPrice.price_type === "sale" && (
        <span className="text-sm font-semibold text-brand-secondary tracking-wider uppercase">
          Save {selectedPrice.percentage_diff}%
        </span>
      )}
      <span className="text-xs text-gray-500 mt-1">Tax included.</span>
    </div>
  )
}
