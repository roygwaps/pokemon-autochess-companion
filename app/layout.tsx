import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PAC Academy - Pokemon Auto Chess Companion",
  description:
    "Your ultimate Pokemon Auto Chess companion. Tier list, team comps, item builds, and team builder.",
  keywords: ["Pokemon Auto Chess", "PAC", "tier list", "item builds", "team comps", "companion"],
}

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
