import { Button, Heading } from "@modules/common/components/ui"
import Link from "next/link"

const SaleBanner = () => {
  return (
    <div className="w-full bg-[#1A1A1A] relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg
          className="h-full w-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left space-y-6">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/60">
                Limited Time
              </p>
              <Heading
                level="h2"
                className="font-serif text-4xl md:text-6xl font-light text-white"
              >
                Season Sale
              </Heading>
              <p className="text-white/80 text-base md:text-lg font-light max-w-md">
                Selected pieces at reduced prices for a limited time.
              </p>
              <Link href="/store?sort=discount-desc">
                <Button className="bg-white text-[#1A1A1A] px-10 py-4 text-sm font-light tracking-widest hover:bg-gray-100 transition-colors duration-300 rounded-none">
                  SHOP SALE
                </Button>
              </Link>
            </div>

            {/* Right Content */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                {[
                  { label: "Women", discount: "30%" },
                  { label: "Men", discount: "25%" },
                  { label: "Accessories", discount: "20%" },
                  { label: "New", discount: "15%" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center space-y-2 group cursor-pointer"
                  >
                    <span className="font-serif text-5xl md:text-6xl font-light text-white/90 group-hover:text-white transition-colors">
                      {item.discount}
                    </span>
                    <span className="text-xs font-medium tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SaleBanner
