import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        {title.toLowerCase() === "size" && (
          <button 
            type="button"
            className="text-xs text-brand-primary underline hover:text-brand-secondary transition-colors"
            onClick={() => {
              // We'll dispatch a custom event or we can handle it via state if we pass down a prop.
              // For simplicity, we'll just open a modal here using standard DOM or state if we add it.
              document.getElementById('size-guide-modal')?.showModal()
            }}
          >
            Size Guide
          </button>
        )}
      </div>
      <div
        className="flex flex-wrap gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          const isColor = title.toLowerCase() === "color" || title.toLowerCase() === "colour";
          
          if (isColor) {
            // Very simple color mapping for demo purposes. In a real app, this might come from metadata.
            const colorMap: Record<string, string> = {
              "Black": "#1A1A1A",
              "White": "#FFFFFF",
              "Maroon": "#722F37",
              "Navy": "#000080",
              "Beige": "#F5F5DC",
              "Red": "#FF0000",
              "Green": "#008000"
            };
            const hex = colorMap[v] || "#CCCCCC";

            return (
              <button
                onClick={() => updateOption(option.id, v)}
                key={v}
                className={clx(
                  "relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center",
                  {
                    "border-brand-primary": v === current,
                    "border-transparent hover:border-gray-300": v !== current,
                  }
                )}
                disabled={disabled}
                title={v}
              >
                <span 
                  className="w-8 h-8 rounded-full border border-gray-200" 
                  style={{ backgroundColor: hex }} 
                />
              </button>
            )
          }

          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border px-4 py-2 text-sm font-medium transition-colors min-w-[3rem]",
                {
                  "border-brand-primary bg-brand-primary text-white": v === current,
                  "border-gray-200 bg-white text-gray-700 hover:border-gray-400": v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>

      {/* Size Guide Dialog (native HTML5 dialog for simplicity without external libs) */}
      {title.toLowerCase() === "size" && (
        <dialog id="size-guide-modal" className="backdrop:bg-black/50 p-0 rounded-md shadow-xl w-full max-w-2xl bg-white m-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading text-2xl font-bold text-brand-primary">Pakistani Size Guide (Women)</h3>
              <button 
                onClick={() => document.getElementById('size-guide-modal')?.close()}
                className="text-gray-500 hover:text-black font-bold text-xl"
              >
                &times;
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Bust (in)</th>
                    <th className="px-4 py-3">Waist (in)</th>
                    <th className="px-4 py-3">Hips (in)</th>
                    <th className="px-4 py-3">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-900">XS (Extra Small)</td>
                    <td className="px-4 py-3">34</td>
                    <td className="px-4 py-3">28</td>
                    <td className="px-4 py-3">38</td>
                    <td className="px-4 py-3">38</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">S (Small)</td>
                    <td className="px-4 py-3">36</td>
                    <td className="px-4 py-3">30</td>
                    <td className="px-4 py-3">40</td>
                    <td className="px-4 py-3">38</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 font-medium text-gray-900">M (Medium)</td>
                    <td className="px-4 py-3">38</td>
                    <td className="px-4 py-3">32</td>
                    <td className="px-4 py-3">42</td>
                    <td className="px-4 py-3">39</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">L (Large)</td>
                    <td className="px-4 py-3">40.5</td>
                    <td className="px-4 py-3">35</td>
                    <td className="px-4 py-3">44.5</td>
                    <td className="px-4 py-3">40</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-gray-900">XL (Extra Large)</td>
                    <td className="px-4 py-3">43</td>
                    <td className="px-4 py-3">38</td>
                    <td className="px-4 py-3">47</td>
                    <td className="px-4 py-3">40</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-xs text-gray-500">
              * Measurements are in inches. Variations of 0.5 to 1 inch may occur.
            </div>
          </div>
        </dialog>
      )}
    </div>
  )
}

export default OptionSelect
