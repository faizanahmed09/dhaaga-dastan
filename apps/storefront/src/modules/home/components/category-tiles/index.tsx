import React from "react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  { title: "Stitched", handle: "stitched", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac0ec?q=80&w=1000&auto=format&fit=crop", available: true },
  { title: "Unstitched", handle: "unstitched", image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=1000&auto=format&fit=crop", available: true },
  { title: "Formals", handle: "formals", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop", available: false },
  { title: "Lawn", handle: "lawn", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop", available: false },
]

const CategoryTiles = () => {
  return (
    <div className="py-16">
      <div className="content-container">
        <h2 className="mb-10 text-center font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative block aspect-[3/4] overflow-hidden bg-brand-surface"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
              
              {!cat.available && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-brand-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    Coming Soon
                  </span>
                </div>
              )}

              <div className="absolute bottom-6 left-0 right-0 text-center">
                {cat.available ? (
                  <Link href={`/categories/${cat.handle}`}>
                    <span className="inline-block bg-white/90 px-6 py-2 font-heading text-lg font-semibold tracking-wide text-brand-primary backdrop-blur-sm transition-colors group-hover:bg-white cursor-pointer">
                      {cat.title}
                    </span>
                  </Link>
                ) : (
                  <span className="inline-block bg-white/50 px-6 py-2 font-heading text-lg font-semibold tracking-wide text-brand-primary/50 backdrop-blur-sm">
                    {cat.title}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryTiles
