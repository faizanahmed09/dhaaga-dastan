import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text, Heading } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ClothingProductCard from "@modules/products/components/clothing-product-card"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container py-16 md:py-20 border-t border-gray-200">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500 mb-2">
            Collection
          </p>
          <Heading level="h2" className="font-serif text-2xl md:text-3xl font-light text-[#1A1A1A]">
            {collection.title}
          </Heading>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          <div className="group inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A1A] transition-colors">
            View collection
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ClothingProductCard product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
