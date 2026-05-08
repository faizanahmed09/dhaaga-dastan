import React from "react"
import { Truck, RotateCcw, ShieldCheck, CreditCard } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Nationwide delivery",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
  },
  {
    icon: CreditCard,
    title: "COD Available",
    description: "Pay on delivery",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% secure checkout",
  },
]

const TrustStrip = () => {
  return (
    <div className="bg-brand-surface py-12">
      <div className="content-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-background text-brand-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-brand-primary">
                {feature.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustStrip
