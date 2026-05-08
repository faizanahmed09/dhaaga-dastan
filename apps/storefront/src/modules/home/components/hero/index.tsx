import { Button } from "@modules/common/components/ui"
import Link from "next/link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-brand-background">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero_campaign.png"
          alt="Spring Summer Lawn Campaign"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <span className="mb-4 inline-block font-sans text-sm font-semibold uppercase tracking-[0.25em] text-white/90 drop-shadow-md">
          Volume I • Unstitched
        </span>
        <h1 className="mb-6 font-heading text-6xl font-bold tracking-tight text-white drop-shadow-lg md:text-8xl lg:text-9xl">
          Summer <br className="md:hidden" /> Lawn '26
        </h1>
        <p className="mb-10 max-w-lg font-sans text-lg font-medium text-white/90 drop-shadow-md md:text-xl">
          Embrace the season with our signature prints, airy fabrics, and vibrant hues designed for the elegant Pakistani woman.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/categories/stitched">
            <Button className="ani-btn min-w-[180px] rounded-none bg-brand-primary px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white shadow-xl hover:shadow-2xl">
              <span className="relative z-10">Shop Stitched</span>
            </Button>
          </Link>
          <Link href="/categories/unstitched">
            <Button className="ani-btn ani-btn-dark min-w-[180px] rounded-none border border-white bg-transparent px-8 py-4 font-sans text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md hover:text-white">
              <span className="relative z-10">Shop Unstitched</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
