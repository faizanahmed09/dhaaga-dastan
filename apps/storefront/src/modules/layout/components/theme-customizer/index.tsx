"use client"

import { useState, useEffect, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { Palette, Check, Monitor } from "lucide-react"
import { clx } from "@modules/common/components/ui"

const themes = [
  { id: "default", name: "Hani Signature", colors: ["#1A1A1A", "#FAF9F6"] },
  { id: "minimal", name: "Minimal Mono", colors: ["#000000", "#FFFFFF"] },
  { id: "luxury", name: "Luxury Gold", colors: ["#9C835F", "#F9F5F0"] },
  { id: "pastel", name: "Soft Pastel", colors: ["#E91E63", "#FFF0F5"] },
  { id: "dark", name: "Elegant Dark", colors: ["#A0A0A0", "#121212"] },
  { id: "brown", name: "Trendy Brown", colors: ["#795548", "#EFEBE9"] },
  { id: "nude", name: "Modern Nude", colors: ["#8D6E63", "#FDF5E6"] },
]

const ThemeCustomizer = () => {
  const [currentTheme, setCurrentTheme] = useState("default")
  const [isAuto, setIsAuto] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("hani-theme") || "default"
    const savedAuto = localStorage.getItem("hani-theme-auto") === "true"
    
    setCurrentTheme(savedTheme)
    setIsAuto(savedAuto)
    
    if (savedAuto) {
      applyAutoTheme()
    } else {
      document.documentElement.setAttribute("data-theme", savedTheme)
    }
  }, [])

  const applyAutoTheme = () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const theme = isDark ? "dark" : "default"
    document.documentElement.setAttribute("data-theme", theme)
  }

  const handleThemeChange = (themeId: string) => {
    setIsAuto(false)
    setCurrentTheme(themeId)
    document.documentElement.setAttribute("data-theme", themeId)
    localStorage.setItem("hani-theme", themeId)
    localStorage.setItem("hani-theme-auto", "false")
  }

  const handleToggleAuto = () => {
    const newAuto = !isAuto
    setIsAuto(newAuto)
    localStorage.setItem("hani-theme-auto", String(newAuto))
    
    if (newAuto) {
      applyAutoTheme()
    } else {
      document.documentElement.setAttribute("data-theme", currentTheme)
    }
  }

  return (
    <div className="relative inline-block text-left">
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center gap-x-2 text-brand-primary hover:opacity-70 transition-opacity">
          <Palette className="w-5 h-5" />
          <span className="hidden small:block text-xs font-bold uppercase tracking-widest">Theme</span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-4 w-64 origin-top-right divide-y divide-gray-100 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-[110] p-4">
            <div className="mb-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">
                Select Theme
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {themes.map((theme) => (
                  <Menu.Item key={theme.id}>
                    {({ active }) => (
                      <button
                        onClick={() => handleThemeChange(theme.id)}
                        className={clx(
                          "flex items-center justify-between w-full px-3 py-3 text-sm transition-colors group",
                          currentTheme === theme.id && !isAuto ? "bg-gray-50" : "hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-200" 
                              style={{ backgroundColor: theme.colors[0] }} 
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-gray-200" 
                              style={{ backgroundColor: theme.colors[1] }} 
                            />
                          </div>
                          <span className={clx(
                            "font-medium",
                            currentTheme === theme.id && !isAuto ? "text-brand-primary" : "text-gray-600"
                          )}>
                            {theme.name}
                          </span>
                        </div>
                        {currentTheme === theme.id && !isAuto && (
                          <Check className="w-4 h-4 text-brand-primary" />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-gray-100">
              <button
                onClick={handleToggleAuto}
                className={clx(
                  "flex items-center justify-between w-full px-3 py-3 text-sm transition-colors",
                  isAuto ? "bg-gray-50" : "hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3 text-gray-600">
                  <Monitor className="w-4 h-4" />
                  <span className={clx("font-medium", isAuto && "text-brand-primary")}>Auto Mode</span>
                </div>
                {isAuto && <Check className="w-4 h-4 text-brand-primary" />}
              </button>
              <p className="px-3 mt-2 text-[10px] text-gray-400 leading-relaxed italic">
                Follows your device's light and dark settings automatically.
              </p>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeCustomizer
