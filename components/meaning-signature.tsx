"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, Download, Share2, Copy, Sparkles, Heart, Brain, Zap, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MeaningSignatureProps {
  analysis: any
}

export function MeaningSignature({ analysis }: MeaningSignatureProps) {
  const { toast } = useToast()

  const copyToClipboard = async () => {
    const text = `Resonance Glyph Analysis:
Archetypal Resonance: ${analysis.archetypal_resonance}
Emotional Valence: ${analysis.emotional_valence.toFixed(2)}
Cognitive Complexity: ${(analysis.cognitive_complexity * 100).toFixed(0)}%
Energy Level: ${(analysis.energy_level * 100).toFixed(0)}%
Symbolic Elements: ${analysis.symbolic_elements.join(", ")}

Meaning Signature: ${analysis.meaning_signature}`

    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: "Analysis results have been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const downloadAnalysis = () => {
    const data = {
      timestamp: new Date().toISOString(),
      analysis: analysis,
      version: "1.0",
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `glyph-analysis-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const shareAnalysis = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resonance Glyph Analysis",
          text: `I just decoded my thoughts with Resonance Glyph Decoder! My archetypal resonance is ${analysis.archetypal_resonance}.`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share failed:", err)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <CardTitle className="text-white">Meaning Signature</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={shareAnalysis}
                className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadAnalysis}
                className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <CardDescription>AI-generated interpretation of your cognitive-emotional resonance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Analysis Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-500/20"
          >
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <p className="text-purple-100 leading-relaxed text-sm">{analysis.meaning_signature}</p>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center space-y-2"
            >
              <div className="w-12 h-12 mx-auto bg-pink-900/30 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">
                  {analysis.emotional_valence > 0 ? "+" : ""}
                  {analysis.emotional_valence.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400">Emotional Valence</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center space-y-2"
            >
              <div className="w-12 h-12 mx-auto bg-blue-900/30 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">
                  {Math.round(analysis.cognitive_complexity * 100)}%
                </div>
                <div className="text-xs text-slate-400">Complexity</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center space-y-2"
            >
              <div className="w-12 h-12 mx-auto bg-yellow-900/30 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{Math.round(analysis.energy_level * 100)}%</div>
                <div className="text-xs text-slate-400">Energy Level</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center space-y-2"
            >
              <div className="w-12 h-12 mx-auto bg-purple-900/30 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white truncate">{analysis.archetypal_resonance}</div>
                <div className="text-xs text-slate-400">Archetype</div>
              </div>
            </motion.div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Symbolic Elements */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="space-y-3"
          >
            <h4 className="text-white font-medium text-sm">Symbolic Elements</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.symbolic_elements.map((element: string, index: number) => (
                <motion.div
                  key={element}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-slate-700/50 text-slate-200 border-slate-600 hover:bg-slate-600/50 transition-colors"
                  >
                    {element}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Glyph Parameters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-slate-900/50 p-4 rounded-lg space-y-3"
          >
            <h4 className="text-white font-medium text-sm">Glyph Parameters</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Shape Complexity:</span>
                <span className="text-white font-medium">
                  {Math.round(analysis.glyph_parameters.shape_complexity * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Color Hue:</span>
                <span className="text-white font-medium">{Math.round(analysis.glyph_parameters.color_hue)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Animation Speed:</span>
                <span className="text-white font-medium">{analysis.glyph_parameters.animation_speed.toFixed(1)}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Resonance Freq:</span>
                <span className="text-white font-medium">
                  {analysis.glyph_parameters.resonance_frequency.toFixed(1)}Hz
                </span>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
