import React from "react"
import { Phone } from "lucide-react"

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+923226644608"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <Phone className="h-6 w-6" fill="currentColor" />
    </a>
  )
}

export default WhatsAppButton
