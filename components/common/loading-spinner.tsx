"use client"

import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin mx-auto" />
        <p className="text-purple-200">Loading Resonance Decoder...</p>
      </div>
    </div>
  )
}
