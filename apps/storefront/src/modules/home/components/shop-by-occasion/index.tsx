import React from "react"
import Link from "next/link"

const occasions = [
  { title: "Casual", handle: "casual", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" },
  { title: "Party", handle: "party", image: "/images/hero_campaign.png" },
  { title: "Wedding", handle: "wedding", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac0ec?q=80&w=1000&auto=format&fit=crop" },
  { title: "Office", handle: "office", image: "https://images.unsplash.com/photo-1485230895905-ef08ba5ca2e1?q=80&w=1000&auto=format&fit=crop" },
]

const ShopByOccasion = () => {
  return (
    <div className="py-20 bg-white">
      <div className="content-container">
        <h2 className="mb-12 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          Shop by Occasion
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ, idx) => (
            <Link
              key={idx}
              href={`/collections/${occ.handle}`}
              className="group relative h-[400px] w-full overflow-hidden bg-brand-surface rounded-sm"
              style={{
                backgroundImage: `url(${occ.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="font-heading text-3xl font-bold text-white mb-4">
                  {occ.title}
                </h3>
                <span className="ani-btn ani-btn-dark relative z-10 inline-block border border-white px-8 py-3 text-xs font-bold tracking-[0.2em] text-white uppercase overflow-hidden">
                  <span className="relative z-10">Shop Now</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopByOccasion
