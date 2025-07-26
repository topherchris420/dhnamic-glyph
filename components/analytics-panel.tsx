"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, Zap, Target, Activity, BarChart3, PieChart } from "lucide-react"

interface AnalyticsPanelProps {
  analysis: any
}

export function AnalyticsPanel({ analysis }: AnalyticsPanelProps) {
  if (!analysis) {
    return (
      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription>Real-time analysis metrics will appear here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Submit input to see analytics</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getEmotionalState = (valence: number) => {
    if (valence > 0.5) return { label: "Highly Positive", color: "text-green-400", bg: "bg-green-900/30" }
    if (valence > 0) return { label: "Positive", color: "text-green-300", bg: "bg-green-900/20" }
    if (valence > -0.5) return { label: "Negative", color: "text-red-300", bg: "bg-red-900/20" }
    return { label: "Highly Negative", color: "text-red-400", bg: "bg-red-900/30" }
  }

  const getComplexityLevel = (complexity: number) => {
    if (complexity > 0.8) return { label: "Highly Complex", color: "text-purple-400" }
    if (complexity > 0.6) return { label: "Complex", color: "text-purple-300" }
    if (complexity > 0.4) return { label: "Moderate", color: "text-blue-300" }
    return { label: "Simple", color: "text-blue-400" }
  }

  const getEnergyLevel = (energy: number) => {
    if (energy > 0.8) return { label: "High Energy", color: "text-yellow-400" }
    if (energy > 0.6) return { label: "Energetic", color: "text-yellow-300" }
    if (energy > 0.4) return { label: "Moderate", color: "text-orange-300" }
    return { label: "Low Energy", color: "text-orange-400" }
  }

  const emotionalState = getEmotionalState(analysis.emotional_valence)
  const complexityLevel = getComplexityLevel(analysis.cognitive_complexity)
  const energyLevel = getEnergyLevel(analysis.energy_level)

  return (
    <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Analytics Dashboard
        </CardTitle>
        <CardDescription>Real-time cognitive-emotional analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Emotional Valence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-white text-sm font-medium">Emotional Valence</span>
            </div>
            <Badge className={`${emotionalState.bg} ${emotionalState.color} border-none`}>{emotionalState.label}</Badge>
          </div>
          <div className="space-y-2">
            <Progress value={((analysis.emotional_valence + 1) / 2) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Negative</span>
              <span className="text-white font-medium">
                {analysis.emotional_valence > 0 ? "+" : ""}
                {analysis.emotional_valence.toFixed(2)}
              </span>
              <span>Positive</span>
            </div>
          </div>
        </motion.div>

        {/* Cognitive Complexity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-white text-sm font-medium">Cognitive Complexity</span>
            </div>
            <Badge className={`bg-blue-900/30 ${complexityLevel.color} border-none`}>{complexityLevel.label}</Badge>
          </div>
          <div className="space-y-2">
            <Progress value={analysis.cognitive_complexity * 100} className="h-2" />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Simple</span>
              <span className="text-white font-medium">{Math.round(analysis.cognitive_complexity * 100)}%</span>
              <span>Complex</span>
            </div>
          </div>
        </motion.div>

        {/* Energy Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm font-medium">Energy Level</span>
            </div>
            <Badge className={`bg-yellow-900/30 ${energyLevel.color} border-none`}>{energyLevel.label}</Badge>
          </div>
          <div className="space-y-2">
            <Progress value={analysis.energy_level * 100} className="h-2" />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Low</span>
              <span className="text-white font-medium">{Math.round(analysis.energy_level * 100)}%</span>
              <span>High</span>
            </div>
          </div>
        </motion.div>

        {/* Archetypal Resonance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            <span className="text-white text-sm font-medium">Archetypal Resonance</span>
          </div>
          <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-300 mb-1">{analysis.archetypal_resonance}</div>
              <div className="text-xs text-purple-200/80">Primary archetypal pattern detected</div>
            </div>
          </div>
        </motion.div>

        {/* Symbolic Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-green-400" />
            <span className="text-white text-sm font-medium">Symbolic Elements</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.symbolic_elements.map((element: string, index: number) => (
              <motion.div
                key={element}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              >
                <Badge variant="secondary" className="bg-green-900/30 text-green-300 border-green-500/30 text-xs">
                  {element}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700"
        >
          <div className="text-center">
            <div className="text-lg font-semibold text-white">
              {Math.round(analysis.glyph_parameters.shape_complexity * 100)}%
            </div>
            <div className="text-xs text-slate-400">Shape Complexity</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-white">
              {Math.round(analysis.glyph_parameters.resonance_frequency * 10) / 10}Hz
            </div>
            <div className="text-xs text-slate-400">Resonance Freq</div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
