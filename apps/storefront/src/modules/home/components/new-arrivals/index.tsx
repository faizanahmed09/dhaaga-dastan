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
    <div className="py-24 bg-brand-background overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 border-b border-brand-surface pb-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-secondary mb-4">
              Curated Collections
            </p>
            <Heading level="h2" className="font-heading text-4xl md:text-5xl font-bold text-brand-primary leading-tight">
              Latest Arrivals
            </Heading>
          </div>
          
          <LocalizedClientLink
            href="/store?sort=created_at-desc"
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary/60 hover:text-brand-primary transition-all mt-6 md:mt-0"
          >
            <span>View All Collections</span>
            <div className="h-[1px] w-8 bg-brand-primary/20 group-hover:w-12 group-hover:bg-brand-primary transition-all duration-300" />
          </LocalizedClientLink>
        </div>

        {/* Products Slider Container */}
        <div className="relative px-2">
          {/* Navigation Buttons - Extreme Ends */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-20px] md:left-[-60px] top-[40%] -translate-y-1/2 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-primary shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-50 transition-all hover:bg-brand-primary hover:text-white hover:scale-110 active:scale-95 hidden small:flex"
            aria-label="Previous products"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-[-20px] md:right-[-60px] top-[40%] -translate-y-1/2 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-primary shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-50 transition-all hover:bg-brand-primary hover:text-white hover:scale-110 active:scale-95 hidden small:flex"
            aria-label="Next products"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>

          {products && products.length > 0 ? (
            <div
              ref={scrollRef}
              className="flex gap-x-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12"
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
                  <div key={product.id} className="min-w-[300px] w-[300px] md:min-w-[380px] md:w-[380px] snap-start">
                    <LocalizedClientLink href={`/products/${product.handle}`} className="group block">
                      {/* Product Image Card */}
                      <div className="relative overflow-hidden bg-brand-surface aspect-[4/5] mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500 rounded-sm">
                        <Thumbnail
                          thumbnail={product.thumbnail}
                          images={product.images}
                          size="square"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        
                        {/* Status Badges */}
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                          <span className="bg-brand-primary text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-none shadow-lg">
                            New Arrival
                          </span>
                        </div>

                        {/* Hover Overlay - Pure Visual */}
                        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Product Details */}
                      <div className="space-y-3 px-1 text-center md:text-left">
                        <h3 className="font-heading text-lg md:text-xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
                          {product.title}
                        </h3>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          {cheapestPrice && (
                            <p className="text-base font-sans font-medium text-gray-500">
                              {new Intl.NumberFormat(region.currency_code === "pkr" ? "en-PK" : "en-US", {
                                style: "currency",
                                currency: region.currency_code,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }).format(cheapestPrice.amount)}
                            </p>
                          )}
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/60">
                            Volume I Collection
                          </span>
                        </div>
                      </div>
                    </LocalizedClientLink>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-sm text-gray-400 font-light italic tracking-widest">Awaiting new collections...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewArrivals
