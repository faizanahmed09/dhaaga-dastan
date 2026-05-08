"use client"

import { useRef } from "react"
import { Heading } from "@modules/common/components/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewArrivalsProps {
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

const NewArrivals = ({ products, region }: NewArrivalsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <div className="py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 mb-3">
              New In
            </p>
            <Heading level="h2" className="font-heading text-3xl md:text-4xl font-bold text-brand-primary">
              Latest Arrivals
            </Heading>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <LocalizedClientLink
              href="/store?sort=created_at-desc"
              className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-colors mr-4"
            >
              View all
            </LocalizedClientLink>
            
            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-brand-primary shadow-sm transition-all hover:bg-gray-50 active:scale-95"
                aria-label="Previous products"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-brand-primary shadow-sm transition-all hover:bg-gray-50 active:scale-95"
                aria-label="Next products"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Slider */}
        {products && products.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => {
              const cheapestPrice = product.variants?.reduce((acc, variant) => {
                const price = variant.prices?.find((p) => p.region_id === region.id)
                if (!price) return acc
                if (!acc || price.amount < acc.amount) return price
                return acc
              }, null as HttpTypes.StoreProductPrice | null)

              return (
                <div key={product.id} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] snap-start">
                  <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-brand-surface aspect-[3/4] mb-4">
                      <Thumbnail
                        thumbnail={product.thumbnail}
                        images={product.images}
                        size="square"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Brand Label */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                          New
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <h3 className="font-heading text-sm font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      {cheapestPrice && (
                        <p className="text-sm font-sans text-gray-500">
                          {new Intl.NumberFormat(region.currency_code === "pkr" ? "en-PK" : "en-US", {
                            style: "currency",
                            currency: region.currency_code,
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(cheapestPrice.amount)}
                        </p>
                      )}
                    </div>
                  </LocalizedClientLink>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-400 font-light">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewArrivals
