import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import ThemeCustomizer from "@modules/layout/components/theme-customizer"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-500 bg-brand-background border-brand-surface">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center gap-6">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            {/* Desktop Mega Menu Placeholder */}
            <div className="hidden lg:flex items-center gap-6 font-sans text-xs font-bold uppercase tracking-widest text-brand-primary">
              <LocalizedClientLink href="/categories/stitched" className="hover:text-brand-secondary transition-colors">Stitched</LocalizedClientLink>
              <LocalizedClientLink href="/categories/unstitched" className="hover:text-brand-secondary transition-colors">Unstitched</LocalizedClientLink>
              <LocalizedClientLink href="/categories/lawn" className="opacity-50 cursor-not-allowed">Lawn</LocalizedClientLink>
              <LocalizedClientLink href="/categories/formals" className="opacity-50 cursor-not-allowed">Formals</LocalizedClientLink>
            </div>
          </div>

          <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="font-heading text-3xl font-bold tracking-widest text-brand-primary uppercase hover:text-brand-secondary transition-colors"
                data-testid="nav-store-link"
              >
                HANI
              </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <ThemeCustomizer />
              <LocalizedClientLink
                className="hover:text-brand-secondary transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
