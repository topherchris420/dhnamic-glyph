"use client"

import { Loader2, Brain } from "lucide-react"

export function ProcessingIndicator() {
  return (
    <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
      <div className="flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
        <div className="space-y-1">
          <p className="text-purple-200 font-medium">Processing Neural Patterns...</p>
          <p className="text-purple-300 text-sm">Analyzing semantic vectors and archetypal resonance</p>
        </div>
        <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
      </div>
    </div>
  )
}
