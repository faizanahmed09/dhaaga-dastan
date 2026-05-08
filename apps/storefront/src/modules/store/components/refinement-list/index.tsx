"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

import SortProducts, { SortOptions } from "./sort-products"
import ProductFilters, { FilterState } from "../product-filters"
import { Filter, X } from "lucide-react"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  'data-testid'?: string
}

const RefinementList = ({ sortBy, 'data-testid': dataTestId }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  const handleFilterChange = (filters: FilterState) => {
    const params = new URLSearchParams(searchParams)

    // Add filter parameters
    if (filters.sizes.length > 0) {
      params.set("sizes", filters.sizes.join(","))
    } else {
      params.delete("sizes")
    }

    if (filters.colors.length > 0) {
      params.set("colors", filters.colors.join(","))
    } else {
      params.delete("colors")
    }

    if (filters.categories.length > 0) {
      params.set("categories", filters.categories.join(","))
    } else {
      params.delete("categories")
    }

    if (filters.fabrics && filters.fabrics.length > 0) {
      params.set("fabrics", filters.fabrics.join(","))
    } else {
      params.delete("fabrics")
    }

    if (filters.occasions && filters.occasions.length > 0) {
      params.set("occasions", filters.occasions.join(","))
    } else {
      params.delete("occasions")
    }

    if (filters.priceRange) {
      params.set("priceMin", filters.priceRange.min.toString())
      params.set("priceMax", filters.priceRange.max === Infinity ? "999999" : filters.priceRange.max.toString())
    } else {
      params.delete("priceMin")
      params.delete("priceMax")
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6 small:min-w-[280px] small:mr-16">
      <div className="w-full small:w-auto flex flex-col small:block pr-6 small:pr-0">
        <div className="flex items-center justify-between small:block">
          <SortProducts sortBy={sortBy} setQueryParams={setQueryParams} data-testid={dataTestId} />
          <button 
            className="small:hidden flex items-center gap-2 text-brand-primary border border-gray-300 px-4 py-2 rounded-sm mt-4"
            onClick={() => setIsOpen(true)}
          >
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Desktop Filters */}
        <div className="hidden small:block mt-8">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Mobile Filter Drawer */}
        <div 
          className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 small:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 h-[80vh] overflow-y-auto transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-brand-primary">Filters</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full text-brand-primary">
                <X size={20} />
              </button>
            </div>
            <ProductFilters onFilterChange={handleFilterChange} />
            <div className="mt-8 pb-4">
              <button 
                className="w-full bg-brand-primary text-white py-3 rounded-sm font-semibold hover:bg-brand-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinementList
