"use client"
import { cn } from "@/lib/utils"

interface AppLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
}

const sizeClasses = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl",
}

export function AppLogo({ size = "md", className, showText = true }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Placeholder logo - replace with actual brand logo */}
      <div
        className={cn(
          "rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center",
          sizeClasses[size],
        )}
      >
        <span className="text-white font-bold text-xs">RG</span>
      </div>

      {showText && (
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent",
            textSizeClasses[size],
          )}
        >
          Resonance Glyph
        </span>
      )}
    </div>
  )
}
