"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface AppLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  animated?: boolean
}

export function AppLogo({ size = "md", animated = true }: AppLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  }

  const LogoContent = () => (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg`}
    >
      <Sparkles className={`${iconSizes[size]} text-white`} />
    </div>
  )

  if (animated) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <LogoContent />
      </motion.div>
    )
  }

  return <LogoContent />
}
