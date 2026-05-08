"use client"

import { Star } from "lucide-react"

export default function ProductReviews() {
  return (
    <div className="product-page-constraint py-16 border-t border-gray-200">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Reviews Summary */}
        <div className="md:w-1/3 flex flex-col items-start gap-4">
          <h2 className="font-heading text-3xl font-light text-brand-primary">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-lg text-brand-primary">4.9</span>
            <span className="text-gray-500 text-sm">(128 Reviews)</span>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            98% of customers recommend this product.
          </p>
          <button className="mt-4 px-6 py-3 border border-brand-primary text-brand-primary font-bold uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-colors">
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="md:w-2/3 flex flex-col gap-8">
          <div className="border-b border-gray-100 pb-8">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold text-brand-primary block">Ayesha K.</span>
                <span className="text-xs text-gray-500">Verified Buyer • Lahore</span>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <h4 className="font-semibold text-brand-primary mb-2">Beautiful Print and Fabric</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              The lawn is extremely soft and breathable, perfect for summer in Lahore. The embroidery on the neckline is very neat and exactly as shown in the pictures. Highly recommend!
            </p>
            <div className="mt-4 flex gap-2">
              <div className="w-16 h-16 bg-gray-200 rounded-sm"></div>
              <div className="w-16 h-16 bg-gray-200 rounded-sm"></div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-8">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold text-brand-primary block">Sana M.</span>
                <span className="text-xs text-gray-500">Verified Buyer • Karachi</span>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <h4 className="font-semibold text-brand-primary mb-2">Fast Delivery</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Got this within 2 days via COD. The colors are so vibrant and it stitched perfectly. I was worried about the color bleeding but it washed fine. Will buy again from this collection!
            </p>
          </div>
          
          <button className="text-center w-full py-4 text-sm font-semibold underline text-brand-primary hover:text-brand-secondary">
            Read all 128 Reviews
          </button>
        </div>
      </div>
    </div>
  )
}
