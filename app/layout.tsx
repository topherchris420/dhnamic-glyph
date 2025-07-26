import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Resonance Glyph Decoder | Transform Thoughts into Visual Symbols",
  description:
    "AI-powered interface that transforms natural language, voice, and symbols into dynamic glyphs representing cognitive-emotional states using open-source LLaMA.",
  keywords: [
    "AI",
    "LLaMA",
    "Groq",
    "glyph",
    "visualization",
    "consciousness",
    "archetypal analysis",
    "emotional mapping",
  ],
  authors: [{ name: "Resonance Glyph Decoder Team" }],
  creator: "Resonance Glyph Decoder",
  publisher: "Resonance Glyph Decoder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://resonance-glyph-decoder.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Resonance Glyph Decoder",
    description: "Transform your thoughts into dynamic visual symbols using AI-powered archetypal analysis",
    url: "https://resonance-glyph-decoder.vercel.app",
    siteName: "Resonance Glyph Decoder",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resonance Glyph Decoder - AI-powered symbolic visualization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resonance Glyph Decoder",
    description: "Transform your thoughts into dynamic visual symbols using AI-powered archetypal analysis",
    images: ["/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#8b5cf6" }],
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#8b5cf6" },
    { media: "(prefers-color-scheme: dark)", color: "#8b5cf6" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
