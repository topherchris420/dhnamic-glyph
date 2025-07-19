import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resonance Glyph Decoder | AI-Powered Symbolic Interface",
  description:
    "Transform thoughts, voice, and symbols into dynamic glyphs using open-source LLaMA. Your thoughts, symbolized. Your resonance, revealed.",
  keywords: ["AI", "LLaMA", "Groq", "symbolic analysis", "glyph decoder", "emotional mapping"],
  authors: [{ name: "Resonance Glyph Team" }],
  creator: "Resonance Glyph Decoder",
  publisher: "Resonance Glyph Decoder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resonance-glyph.vercel.app",
    title: "Resonance Glyph Decoder",
    description: "AI-powered interface that transforms thoughts into dynamic symbolic glyphs",
    siteName: "Resonance Glyph Decoder",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resonance Glyph Decoder",
    description: "Transform your thoughts into dynamic glyphs with AI",
    creator: "@resonanceglyph",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
