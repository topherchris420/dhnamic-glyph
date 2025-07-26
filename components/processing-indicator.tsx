"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, Eye, Target } from "lucide-react"

const processingSteps = [
  { icon: Brain, label: "Analyzing input", duration: 1000 },
  { icon: Sparkles, label: "Extracting patterns", duration: 1500 },
  { icon: Target, label: "Identifying archetypes", duration: 1200 },
  { icon: Eye, label: "Generating glyph", duration: 800 },
]

export function ProcessingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-purple-500/20"
    >
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-purple-400" />
        </motion.div>
        <span className="text-white font-medium">Processing your resonance...</span>
      </div>

      <div className="space-y-3">
        {processingSteps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-purple-900/30 rounded-full flex items-center justify-center">
              <step.icon className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-white">{step.label}</div>
              <Progress value={75} className="h-1 mt-1" />
            </div>
            <Badge variant="secondary" className="bg-purple-800/50 text-purple-200 text-xs">
              {step.duration}ms
            </Badge>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <div className="text-xs text-slate-400">Powered by LLaMA 3.1 via Groq's lightning-fast inference</div>
      </div>
    </motion.div>
  )
}
