"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { Button, Text } from "@modules/common/components/ui"

// Clothing sizes
const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"]

// Clothing colors
const CLOTHING_COLORS = [
  { name: "Black", value: "black", hex: "#1A1A1A" },
  { name: "White", value: "white", hex: "#FFFFFF" },
  { name: "Navy", value: "navy", hex: "#2C3E50" },
  { name: "Burgundy", value: "burgundy", hex: "#722F37" },
  { name: "Olive", value: "olive", hex: "#556B2F" },
  { name: "Sage", value: "sage", hex: "#87A96B" },
  { name: "Blush", value: "blush", hex: "#FFE5E5" },
  { name: "Sand", value: "sand", hex: "#F5DEB3" },
]

// Price ranges in PKR
const PRICE_RANGES = [
  { label: "Under Rs. 5,000", min: 0, max: 5000 },
  { label: "Rs. 5,000 - Rs. 10,000", min: 5000, max: 10000 },
  { label: "Rs. 10,000 - Rs. 20,000", min: 10000, max: 20000 },
  { label: "Rs. 20,000 - Rs. 50,000", min: 20000, max: 50000 },
  { label: "Rs. 50,000+", min: 50000, max: Infinity },
]

// Categories
const CATEGORIES = [
  "Pret",
  "Unstitched",
  "Formals",
  "Bridal",
  "Lawn",
  "Western Fusion",
]

// Fabrics
const FABRICS = [
  "Lawn",
  "Cotton",
  "Chiffon",
  "Silk",
  "Velvet",
  "Organza",
]

// Occasions
const OCCASIONS = [
  "Casual",
  "Party",
  "Wedding",
  "Office",
  "Eid Collection",
]

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  sizes: string[]
  colors: string[]
  priceRange: { min: number; max: number } | null
  categories: string[]
  fabrics: string[]
  occasions: string[]
}

const ProductFilters = ({ onFilterChange }: ProductFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories", "sizes"])
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: null,
    categories: [],
    fabrics: [],
    occasions: [],
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const toggleFilter = (
    type: "sizes" | "colors" | "categories" | "fabrics" | "occasions",
    value: string
  ) => {
    const newFilters = { ...selectedFilters }
    const currentArray = newFilters[type]

    if (currentArray.includes(value)) {
      newFilters[type] = currentArray.filter((item) => item !== value)
    } else {
      newFilters[type] = [...currentArray, value]
    }

    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const setPriceRange = (range: { min: number; max: number } | null) => {
    const newFilters = {
      ...selectedFilters,
      priceRange: range,
    }
    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      sizes: [],
      colors: [],
      priceRange: null,
      categories: [],
      fabrics: [],
      occasions: [],
    }
    setSelectedFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters =
    selectedFilters.sizes.length > 0 ||
    selectedFilters.colors.length > 0 ||
    selectedFilters.priceRange !== null ||
    selectedFilters.categories.length > 0 ||
    selectedFilters.fabrics.length > 0 ||
    selectedFilters.occasions.length > 0

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Text className="font-semibold text-lg text-brand-primary">Filters</Text>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-brand-accent hover:text-brand-accent/80 flex items-center gap-1"
          >
            <X size={14} />
            Clear all
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedFilters.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 bg-brand-primary/5 text-brand-primary text-xs px-3 py-1 rounded-full"
            >
              {cat}
              <button onClick={() => toggleFilter("categories", cat)}>
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedFilters.sizes.map((size) => (
            <span
              key={size}
              className="inline-flex items-center gap-1 bg-brand-primary/5 text-brand-primary text-xs px-3 py-1 rounded-full"
            >
              {size}
              <button onClick={() => toggleFilter("sizes", size)}>
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedFilters.colors.map((color) => (
            <span
              key={color}
              className="inline-flex items-center gap-1 bg-brand-primary/5 text-brand-primary text-xs px-3 py-1 rounded-full"
            >
              {color}
              <button onClick={() => toggleFilter("colors", color)}>
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedFilters.fabrics.map((fabric) => (
            <span
              key={fabric}
              className="inline-flex items-center gap-1 bg-brand-primary/5 text-brand-primary text-xs px-3 py-1 rounded-full"
            >
              {fabric}
              <button onClick={() => toggleFilter("fabrics", fabric)}>
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedFilters.occasions.map((occ) => (
            <span
              key={occ}
              className="inline-flex items-center gap-1 bg-brand-primary/5 text-brand-primary text-xs px-3 py-1 rounded-full"
            >
              {occ}
              <button onClick={() => toggleFilter("occasions", occ)}>
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedFilters.priceRange && (
            <span className="inline-flex items-center gap-1 bg-brand-primary/5 text-brand-primary text-xs px-3 py-1 rounded-full">
              Rs. {selectedFilters.priceRange.min} - Rs. {selectedFilters.priceRange.max === Infinity ? "∞" : selectedFilters.priceRange.max}
              <button onClick={() => setPriceRange(null)}>
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-6">
        {/* Categories */}
        <FilterSection
          title="Categories"
          isExpanded={expandedSections.includes("categories")}
          onToggle={() => toggleSection("categories")}
        >
          <div className="space-y-2">
            {CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedFilters.categories.includes(category)}
                    onChange={() => toggleFilter("categories", category)}
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-brand-accent peer-checked:bg-brand-accent transition-colors" />
                  <svg
                    className="absolute inset-0 w-5 h-5 text-brand-primary opacity-0 peer-checked:opacity-100 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <Text className="text-sm text-gray-700 group-hover:text-brand-primary transition-colors">
                  {category}
                </Text>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Sizes */}
        <FilterSection
          title="Sizes"
          isExpanded={expandedSections.includes("sizes")}
          onToggle={() => toggleSection("sizes")}
        >
          <div className="grid grid-cols-4 gap-2">
            {CLOTHING_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => toggleFilter("sizes", size)}
                className={`
                  py-2 px-3 text-sm border rounded-md transition-all
                  ${selectedFilters.sizes.includes(size)
                    ? "border-brand-accent bg-brand-accent text-brand-primary font-medium"
                    : "border-gray-300 text-gray-700 hover:border-brand-primary"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Colors */}
        <FilterSection
          title="Colors"
          isExpanded={expandedSections.includes("colors")}
          onToggle={() => toggleSection("colors")}
        >
          <div className="space-y-3">
            {CLOTHING_COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => toggleFilter("colors", color.value)}
                className="flex items-center gap-3 w-full group"
              >
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedFilters.colors.includes(color.value)
                        ? "border-brand-accent ring-2 ring-brand-accent/50"
                        : "border-gray-300 group-hover:border-brand-primary"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  {selectedFilters.colors.includes(color.value) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <Text className="text-sm text-gray-700 group-hover:text-brand-primary transition-colors">
                  {color.name}
                </Text>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.includes("price")}
          onToggle={() => toggleSection("price")}
        >
          <div className="space-y-2">
            {PRICE_RANGES.map((range) => (
              <button
                key={range.label}
                onClick={() => setPriceRange(
                  selectedFilters.priceRange?.min === range.min &&
                  selectedFilters.priceRange?.max === range.max
                    ? null
                    : range
                )}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all ${
                  selectedFilters.priceRange?.min === range.min &&
                  selectedFilters.priceRange?.max === range.max
                    ? "bg-brand-accent text-brand-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Fabrics */}
        <FilterSection
          title="Fabric"
          isExpanded={expandedSections.includes("fabrics")}
          onToggle={() => toggleSection("fabrics")}
        >
          <div className="space-y-2">
            {FABRICS.map((fabric) => (
              <label
                key={fabric}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedFilters.fabrics.includes(fabric)}
                    onChange={() => toggleFilter("fabrics", fabric)}
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-brand-accent peer-checked:bg-brand-accent transition-colors" />
                  <svg
                    className="absolute inset-0 w-5 h-5 text-brand-primary opacity-0 peer-checked:opacity-100 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <Text className="text-sm text-gray-700 group-hover:text-brand-primary transition-colors">
                  {fabric}
                </Text>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Occasions */}
        <FilterSection
          title="Occasion"
          isExpanded={expandedSections.includes("occasions")}
          onToggle={() => toggleSection("occasions")}
        >
          <div className="space-y-2">
            {OCCASIONS.map((occ) => (
              <label
                key={occ}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedFilters.occasions.includes(occ)}
                    onChange={() => toggleFilter("occasions", occ)}
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:border-brand-accent peer-checked:bg-brand-accent transition-colors" />
                  <svg
                    className="absolute inset-0 w-5 h-5 text-brand-primary opacity-0 peer-checked:opacity-100 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <Text className="text-sm text-gray-700 group-hover:text-brand-primary transition-colors">
                  {occ}
                </Text>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  )
}

interface FilterSectionProps {
  title: string
  isExpanded: boolean
  onToggle: () => void
  children: React.ReactNode
}

const FilterSection = ({ title, isExpanded, onToggle, children }: FilterSectionProps) => {
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2"
      >
        <Text className="font-semibold text-brand-primary">{title}</Text>
        {isExpanded ? (
          <ChevronUp size={18} className="text-gray-500" />
        ) : (
          <ChevronDown size={18} className="text-gray-500" />
        )}
      </button>
      {isExpanded && <div className="pt-3">{children}</div>}
    </div>
  )
}

export default ProductFilters
