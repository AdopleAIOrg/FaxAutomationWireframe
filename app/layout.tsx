import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AppShell } from "@/components/app-sidebar"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "02.AI — Fax Automation",
  description: "Secure, modern fax automation SaaS.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppShell>{children}</AppShell>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
