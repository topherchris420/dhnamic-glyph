"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, Target } from "lucide-react"
import { motion } from "framer-motion"

interface AnalyticsPanelProps {
  analysis: {
    emotional_valence: number
    cognitive_complexity: number
    energy_level: number
    archetypal_resonance: string
  } | null
}

export function AnalyticsPanel({ analysis }: AnalyticsPanelProps) {
  if (!analysis) {
    return (
      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-slate-400 py-8">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Submit input to see analytics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getValenceColor = (valence: number) => {
    if (valence > 0.3) return "text-green-400"
    if (valence < -0.3) return "text-red-400"
    return "text-yellow-400"
  }

  const getComplexityLevel = (complexity: number) => {
    if (complexity > 0.7) return "Highly Complex"
    if (complexity > 0.4) return "Moderate"
    return "Simple"
  }

  const getEnergyLevel = (energy: number) => {
    if (energy > 0.7) return "High Energy"
    if (energy > 0.4) return "Moderate"
    return "Low Energy"
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Real-time Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Emotional Valence */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Emotional Valence</span>
            <span className={`text-sm font-medium ${getValenceColor(analysis.emotional_valence)}`}>
              {analysis.emotional_valence > 0 ? "+" : ""}
              {(analysis.emotional_valence * 100).toFixed(0)}%
            </span>
          </div>
          <Progress value={(analysis.emotional_valence + 1) * 50} className="h-2" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Negative</span>
            <span>Neutral</span>
            <span>Positive</span>
          </div>
        </motion.div>

        {/* Cognitive Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Cognitive Complexity</span>
            <span className="text-blue-400 text-sm font-medium">
              {getComplexityLevel(analysis.cognitive_complexity)}
            </span>
          </div>
          <Progress value={analysis.cognitive_complexity * 100} className="h-2" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Simple</span>
            <span>Complex</span>
          </div>
        </motion.div>

        {/* Energy Level */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Energy Level</span>
            <span className="text-yellow-400 text-sm font-medium">{getEnergyLevel(analysis.energy_level)}</span>
          </div>
          <Progress value={analysis.energy_level * 100} className="h-2" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </motion.div>

        {/* Archetypal Resonance */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-slate-300 text-sm">Archetypal Resonance</span>
          </div>
          <Badge
            variant="outline"
            className="bg-purple-900/50 text-purple-200 border-purple-500 w-full justify-center py-2"
          >
            {analysis.archetypal_resonance}
          </Badge>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{Math.round(analysis.cognitive_complexity * 100)}</div>
            <div className="text-xs text-slate-400">Complexity Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-400">{Math.round(analysis.energy_level * 100)}</div>
            <div className="text-xs text-slate-400">Energy Score</div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
