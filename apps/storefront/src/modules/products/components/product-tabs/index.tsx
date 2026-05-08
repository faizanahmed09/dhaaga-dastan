"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Description & Details",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Fabric & Care",
      component: <FabricCareTab />,
    },
    {
      label: "Size & Fit",
      component: <SizeFitTab />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const FabricCareTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="flex flex-col gap-y-4">
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>100% Premium Lawn / Chiffon / Silk</li>
          <li>Hand wash or dry clean recommended</li>
          <li>Do not use bleach or stain removing chemicals</li>
          <li>Iron at moderate temperature</li>
          <li>Wash dark colors separately</li>
        </ul>
      </div>
    </div>
  )
}

const SizeFitTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="flex flex-col gap-y-4">
        <p className="text-gray-600">
          Our standard length for long kurtas is 40-42 inches, and short kurtis is 36-38 inches. 
          Pants are typically 37-38 inches in length.
        </p>
        <p className="text-gray-600">
          Model is 5'7" and is wearing size Small (S).
        </p>
        <p className="text-gray-600 font-medium mt-2">
          Please refer to the Size Guide above the add to cart button for detailed measurements.
        </p>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast Nationwide Delivery</span>
            <p className="max-w-sm text-gray-600">
              Orders within Pakistan are delivered within 3-5 business days. International orders take 7-14 business days via DHL.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Hassle-Free Exchanges</span>
            <p className="max-w-sm text-gray-600">
              You can exchange any unwashed, unworn item with original tags within 14 days of delivery.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Return Policy</span>
            <p className="max-w-sm text-gray-600">
              We offer store credit or refunds for defective items. Sale items are final sale and cannot be returned.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
