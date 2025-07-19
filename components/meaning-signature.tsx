"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Zap, Eye } from "lucide-react"

interface MeaningSignatureProps {
  analysis: {
    emotional_valence: number
    cognitive_complexity: number
    energy_level: number
    archetypal_resonance: string
    symbolic_elements: string[]
    meaning_signature: string
  }
}

export function MeaningSignature({ analysis }: MeaningSignatureProps) {
  const getValenceColor = (valence: number) => {
    if (valence > 0.3) return "text-green-400"
    if (valence < -0.3) return "text-red-400"
    return "text-yellow-400"
  }

  const getValenceLabel = (valence: number) => {
    if (valence > 0.5) return "Highly Positive"
    if (valence > 0.2) return "Positive"
    if (valence > -0.2) return "Neutral"
    if (valence > -0.5) return "Negative"
    return "Highly Negative"
  }

  return (
    <Card className="bg-slate-800/50 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Meaning Signature
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Signature */}
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <p className="text-purple-200 leading-relaxed">{analysis.meaning_signature}</p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-slate-300">Emotional Valence</span>
            </div>
            <Progress value={(analysis.emotional_valence + 1) * 50} className="h-2" />
            <p className={`text-sm font-medium ${getValenceColor(analysis.emotional_valence)}`}>
              {getValenceLabel(analysis.emotional_valence)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Cognitive Complexity</span>
            </div>
            <Progress value={analysis.cognitive_complexity * 100} className="h-2" />
            <p className="text-sm text-blue-300">
              {analysis.cognitive_complexity > 0.7
                ? "Highly Complex"
                : analysis.cognitive_complexity > 0.4
                  ? "Moderate"
                  : "Simple"}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Energy Level</span>
            </div>
            <Progress value={analysis.energy_level * 100} className="h-2" />
            <p className="text-sm text-yellow-300">
              {analysis.energy_level > 0.7 ? "High Energy" : analysis.energy_level > 0.4 ? "Moderate" : "Low Energy"}
            </p>
          </div>
        </div>

        {/* Archetypal Resonance */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Archetypal Resonance</h4>
          <Badge variant="outline" className="bg-purple-900/50 text-purple-200 border-purple-500">
            {analysis.archetypal_resonance}
          </Badge>
        </div>

        {/* Symbolic Elements */}
        <div className="space-y-3">
          <h4 className="text-white font-medium">Symbolic Elements</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.symbolic_elements.map((element, index) => (
              <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-200">
                {element}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
