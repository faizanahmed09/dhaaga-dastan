import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="space-y-3">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-xs font-medium tracking-widest uppercase text-gray-500 hover:text-[#1A1A1A] transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h3"
          className="text-xl font-medium text-[#1A1A1A]"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {product.description && (
          <Text
            className="text-sm text-gray-600 font-light leading-relaxed line-clamp-2"
            data-testid="product-description"
          >
            {product.description}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
