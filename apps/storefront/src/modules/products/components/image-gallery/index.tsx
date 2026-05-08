"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  // Use provided images or fallback to a placeholder
  const galleryImages = images?.length > 0 ? images : [{ id: "fallback", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" }]

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isFullscreen])

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setActiveIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Thumbnail Strip */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-24 lg:h-[85vh] pb-2 lg:pb-0 order-2 lg:order-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {galleryImages.map((image, index) => (
          <button
            key={image.id}
            className={`relative aspect-[3/4] w-20 lg:w-full flex-shrink-0 overflow-hidden bg-brand-surface transition-all ${
              activeIndex === index ? "border border-brand-primary opacity-100" : "opacity-60 hover:opacity-100"
            }`}
            onClick={() => {
              setActiveIndex(index)
              document.getElementById(`gallery-img-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {!!image.url && (
              <Image
                src={image.url}
                className="w-full h-full object-cover"
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="100px"
              />
            )}
          </button>
        ))}
        </div>

      {/* Main Images Stack */}
      <div className="relative lg:h-[85vh] lg:flex-1 w-full overflow-y-auto order-1 lg:order-2 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {galleryImages.map((img, index) => (
          <Container 
            key={img.id}
            id={`gallery-img-${index}`}
            className="relative aspect-[3/4] lg:aspect-auto lg:min-h-[85vh] w-full overflow-hidden bg-brand-surface group cursor-zoom-in rounded-none border-none flex-shrink-0"
            onClick={() => {
              setActiveIndex(index)
              setIsFullscreen(true)
            }}
          >
            {!!img.url && (
              <Image
                src={img.url}
                priority={index <= 1}
                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.05]"
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </Container>
        ))}
      </div>
    </div>

    {/* Fullscreen Lightbox Modal */}
    {isFullscreen && (
      <div 
        className="fixed inset-0 z-[200] bg-[#FAFAFA] flex items-center justify-center overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onClick={() => {
          setIsFullscreen(false)
          setIsZoomed(false)
        }}
      >
        {/* The Main Image in Fullscreen */}
        <div 
          className={`relative w-full transition-transform duration-300 ease-in-out ${
            isZoomed 
              ? "h-[150vh] md:w-[150vw] cursor-zoom-out" 
              : "h-[90vh] md:w-[80vw] md:h-[95vh] max-w-5xl cursor-zoom-in"
          }`}
          onClick={(e) => {
            e.stopPropagation()
            setIsZoomed(!isZoomed)
          }}
        >
          <Image
            src={galleryImages[activeIndex].url}
            alt={`Fullscreen Product image ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Navigation Controls (Bottom Center) */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          <button 
            onClick={(e) => {
              setIsZoomed(false)
              prevImage(e)
            }}
            className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={24} strokeWidth={1} />
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setIsFullscreen(false)
              setIsZoomed(false)
            }}
            className="w-14 h-14 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors"
          >
            <X size={28} strokeWidth={1} />
          </button>

          <button 
            onClick={(e) => {
              setIsZoomed(false)
              nextImage(e)
            }}
            className="w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-brand-primary hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={24} strokeWidth={1} />
          </button>
        </div>
      </div>
    )}
    </>
  )
}

export default ImageGallery
