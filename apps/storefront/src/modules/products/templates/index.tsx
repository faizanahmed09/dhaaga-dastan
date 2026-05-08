import React, { Suspense } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductReviews from "@modules/products/components/product-reviews"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ProductActionsWrapper from "./product-actions-wrapper"
import ProductInfo from "./product-info"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <>
      {/* Product Header Section */}
      <div className="content-container pt-12 pb-8">
        <nav className="text-sm text-gray-500 mb-6">
          <LocalizedClientLink href="/" className="hover:text-[#1A1A1A]">
            Home
          </LocalizedClientLink>
          {" / "}
          {product.collection && (
            <>
              <LocalizedClientLink
                href={`/collections/${product.collection.handle}`}
                className="hover:text-[#1A1A1A]"
              >
                {product.collection.title}
              </LocalizedClientLink>
              {" / "}
            </>
          )}
          <span className="text-[#1A1A1A]">{product.title}</span>
        </nav>

        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1A1A] leading-tight">
          {product.title}
        </h1>
      </div>

      {/* Product Details Grid */}
      <div className="content-container pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:h-[85vh] lg:overflow-hidden relative">
          {/* Left Column - Images */}
          <div className="lg:col-span-8 h-full">
            <ImageGallery images={images} />
          </div>

          {/* Right Column - Info & Actions */}
          <div className="lg:col-span-4 space-y-8 h-full lg:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-20 lg:pr-4">
            {/* Description */}
            {product.description && (
              <div className="prose prose prose-sm max-w-none">
                <p className="text-gray-600 font-light leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Price */}
            <div className="border-t border-gray-200 pt-6">
              <ProductInfo product={product} />
            </div>

            {/* Tabs */}
            <ProductTabs product={product} />

            {/* Actions */}
            <div>
              <ProductOnboardingCta />
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <ProductReviews />

      {/* Related Products */}
      <div
        className="content-container py-20 border-t border-gray-200"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
