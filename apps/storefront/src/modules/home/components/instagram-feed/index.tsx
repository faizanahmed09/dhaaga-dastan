import React from "react"
import Image from "next/image"

const InstagramIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const INSTAGRAM_URL = "https://www.instagram.com/haanis_collection_by_rabia"
const INSTAGRAM_HANDLE = "@haanis_collection_by_rabia"

const images = [
  "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583391733958-d25e07fac0ec?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
]

const InstagramFeed = () => {
  return (
    <div className="py-20 bg-brand-background">
      <div className="content-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-secondary mb-4">
            Social Media
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Follow Our Journey
          </h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary/60 hover:text-brand-primary transition-colors group"
          >
            <InstagramIcon size={16} />
            <span className="tracking-widest uppercase text-xs">{INSTAGRAM_HANDLE}</span>
            <div className="h-[1px] w-6 bg-brand-primary/20 group-hover:w-10 group-hover:bg-brand-primary transition-all duration-300" />
          </a>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((src, idx) => (
            <a
              key={idx}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden bg-brand-surface group block"
            >
              <Image
                src={src}
                alt={`HANI Instagram Post ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex flex-col items-center justify-center gap-2">
                <InstagramIcon
                  className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100"
                  size={28}
                />
                <span className="text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                  View Post
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 border border-brand-primary text-brand-primary text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all duration-300"
          >
            <InstagramIcon size={16} />
            Follow on Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default InstagramFeed
