import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { Heart } from "lucide-react"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <div className="group relative" data-testid="product-wrapper">
      {/* Wishlist Heart */}
      <button className="absolute right-4 top-4 z-10 p-2 text-gray-500 hover:text-brand-secondary transition-colors bg-white/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100">
        <Heart className="h-5 w-5" />
      </button>

      {/* Badges */}
      <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
        {cheapestPrice?.price_type === "sale" && (
          <span className="bg-brand-secondary text-white text-xs font-bold px-2 py-1 tracking-wider uppercase">
            Sale
          </span>
        )}
        {/* Placeholder for New badge */}
        <span className="bg-brand-primary text-white text-xs font-bold px-2 py-1 tracking-wider uppercase">
          New
        </span>
      </div>

      <LocalizedClientLink href={`/products/${product.handle}`}>
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="mt-4 flex flex-col gap-1">
          <Text className="font-heading text-lg text-brand-primary" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center gap-2 font-sans text-sm font-semibold">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          
          {/* Color Swatches Placeholder */}
          <div className="mt-2 flex gap-1">
            <div className="h-4 w-4 rounded-full bg-[#722F37] border border-gray-200"></div>
            <div className="h-4 w-4 rounded-full bg-[#1A1A1A] border border-gray-200"></div>
            <div className="h-4 w-4 rounded-full bg-[#FFE5E5] border border-gray-200"></div>
          </div>
        </div>
      </LocalizedClientLink>

      {/* Quick View Button */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto group-hover:top-[60%]">
        <button className="w-full bg-white/90 backdrop-blur-md text-brand-primary font-semibold py-3 px-4 border border-brand-primary/10 hover:bg-brand-primary hover:text-white transition-colors">
          Quick View
        </button>
      </div>
    </div>
  )
}
