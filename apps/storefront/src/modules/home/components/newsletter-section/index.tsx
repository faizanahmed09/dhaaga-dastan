"use client"

import React from "react"
import { Mail } from "lucide-react"

const NewsletterSection = () => {
  return (
    <div className="bg-brand-surface py-24">
      <div className="content-container mx-auto px-4 text-center sm:px-6 lg:px-8 max-w-3xl">
        <Mail className="mx-auto mb-6 h-12 w-12 text-brand-secondary" />
        <h2 className="mb-4 font-heading text-3xl font-bold text-brand-primary md:text-4xl">
          Join the Hani Community
        </h2>
        <p className="mb-8 font-sans text-lg text-gray-600">
          Subscribe to receive updates, access to exclusive deals, and more. Get 10% off your first order.
        </p>
        <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full rounded-sm border border-gray-300 px-4 py-3 font-sans outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            required
          />
          <button
            type="submit"
            className="whitespace-nowrap rounded-sm bg-brand-primary px-8 py-3 font-sans font-semibold text-white transition-colors hover:bg-brand-secondary"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewsletterSection
