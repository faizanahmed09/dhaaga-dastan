"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"

interface ClothingProductCardProps {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}

export default function ClothingProductCard({
  product,
  isFeatured,
  region,
}: ClothingProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { cheapestPrice, originalPrice } = getProductPrice({ product })
  const hasDiscount = originalPrice && cheapestPrice && originalPrice.amount > cheapestPrice.amount
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice!.amount - cheapestPrice.amount) / originalPrice!.amount) * 100)
    : 0

  const isNew = product.metadata?.new === "true"

  return (
    <div className="group relative">
      <LocalizedClientLink href={`/products/${product.handle}`}>
        {/* Product Image Container */}
        <div className="relative overflow-hidden bg-[#F5F5F5] aspect-[3/4] mb-3">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="absolute inset-0 !p-0 !aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.02]"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {isNew && (
              <span className="bg-[#1A1A1A] text-white text-[10px] font-light tracking-widest uppercase px-2.5 py-1">
                New
              </span>
            )}
            {hasDiscount && (
              <span className="bg-[#1A1A1A]/80 text-white text-[10px] font-light tracking-widest uppercase px-2.5 py-1">
                {discountPercentage}% Off
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300"
            aria-label="Add to wishlist"
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-[#1A1A1A] text-[#1A1A1A]" : "text-gray-600"}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          {/* Title */}
          <h3 className="font-medium text-sm text-[#1A1A1A] group-hover:text-gray-600 transition-colors line-clamp-2">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2">
            {cheapestPrice && (
              <span className="text-sm text-[#1A1A1A]">
                {new Intl.NumberFormat(region.currency_code, {
                  style: "currency",
                  currency: region.currency_code,
                }).format(cheapestPrice.amount / 100)}
              </span>
            )}
            {hasDiscount && originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {new Intl.NumberFormat(region.currency_code, {
                  style: "currency",
                  currency: region.currency_code,
                }).format(originalPrice.amount / 100)}
              </span>
            )}
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  )
}
