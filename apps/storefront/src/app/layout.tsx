import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"
import { Playfair_Display, Inter } from "next/font/google"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "HANI | Premium Pakistani Fashion & Pret",
  description: "Discover the latest in premium Pakistani fashion. Shop Pret, Unstitched, and Luxury wear at HANI.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
