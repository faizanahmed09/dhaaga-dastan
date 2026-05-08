import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import NewArrivals from "@modules/home/components/new-arrivals"
import SaleBanner from "@modules/home/components/sale-banner"
import TrustStrip from "@modules/home/components/trust-strip"
import CategoryTiles from "@modules/home/components/category-tiles"
import EditorialLookbook from "@modules/home/components/editorial-lookbook"
import ShopByOccasion from "@modules/home/components/shop-by-occasion"
import InstagramFeed from "@modules/home/components/instagram-feed"
import { listCollections } from "@lib/data/collections"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Hani Cloth - Premium Fashion Store",
  description:
    "Discover your unique style with our curated collection of premium Pakistani women's clothing. Shop the latest Pret, Unstitched, and Formals.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  // Fetch new arrivals (latest products)
  const { 
    response: { products: newProducts } 
  } = await listProducts({
    regionId: region.id,
    queryParams: { limit: 8 }
  })

  // Fetch sale products (discounted products)
  const { 
    response: { products: saleProducts } 
  } = await listProducts({
    regionId: region.id,
    queryParams: { limit: 4 }
  })

  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryTiles />
      <NewArrivals products={newProducts} region={region} />
      <EditorialLookbook />
      <ShopByOccasion />
      <div className="py-12 bg-white">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <InstagramFeed />
    </>
  )
}
