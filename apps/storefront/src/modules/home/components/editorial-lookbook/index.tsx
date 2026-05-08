import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const EditorialLookbook = () => {
  return (
    <div className="py-20 bg-brand-background">
      <div className="content-container">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-surface">
              <Image
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
                alt="Editorial Campaign"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-brand-secondary font-sans tracking-[0.2em] text-sm uppercase mb-4 block">
              Generation
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-brand-primary mb-6 leading-tight">
              The Art of <br /> Everyday Elegance
            </h2>
            <p className="font-sans text-gray-600 mb-8 text-lg leading-relaxed">
              Discover our latest collection where traditional craftsmanship meets contemporary silhouettes. Designed for the modern Pakistani woman who values both comfort and impeccable style.
            </p>
            <Link 
              href="/collections/lookbook" 
              className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:text-brand-secondary transition-colors font-sans w-fit border-b-2 border-brand-primary hover:border-brand-secondary pb-1"
            >
              Explore the Lookbook <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorialLookbook
