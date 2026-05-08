import React from "react"
import Image from "next/image"

const images = [
  "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583391733958-d25e07fac0ec?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
]

const InstagramFeed = () => {
  return (
    <div className="py-16">
      <div className="content-container">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-brand-primary md:text-4xl mb-2">
            @HaniCloth
          </h2>
          <p className="font-sans text-gray-600">
            Follow us on Instagram for daily inspiration
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <div key={idx} className="relative aspect-square overflow-hidden bg-brand-surface group">
              <Image
                src={src}
                alt={`Instagram Feed ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InstagramFeed
