"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Heart } from "lucide-react"
import { InputPanel } from "./input-panel"
import { GlyphVisualization } from "./glyph-visualization"
import { MeaningSignature } from "./meaning-signature"
import { useAnalysis } from "@/hooks/use-analysis"
import { useToast } from "@/hooks/use-toast"
import type { AnalysisResult, InputData } from "@/types/analysis"

export function ResonanceInterface() {
  const { toast } = useToast()
  const { analyzeInput, isLoading, error } = useAnalysis()
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const handleInputSubmit = useCallback(
    async (inputData: InputData) => {
      try {
        const result = await analyzeInput(inputData)
        setAnalysis(result)
        toast({
          title: "Analysis Complete",
          description: "Your resonance glyph has been generated successfully.",
        })
      } catch (err) {
        toast({
          title: "Analysis Failed",
          description: "Unable to process your input. Please try again.",
          variant: "destructive",
        })
      }
    },
    [analyzeInput, toast],
  )

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white mb-2">Resonance Glyph Decoder</h1>
        <p className="text-purple-200 text-lg">Your thoughts, symbolized. Your resonance, revealed.</p>
        <div className="flex justify-center gap-2">
          <Badge variant="secondary" className="bg-purple-800 text-purple-100">
            <Zap className="w-3 h-3 mr-1" />
            LLaMA via Groq
          </Badge>
          <Badge variant="secondary" className="bg-blue-800 text-blue-100">
            <Brain className="w-3 h-3 mr-1" />
            Real-time Analysis
          </Badge>
          <Badge variant="secondary" className="bg-pink-800 text-pink-100">
            <Heart className="w-3 h-3 mr-1" />
            Emotional Mapping
          </Badge>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Input Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <InputPanel onSubmit={handleInputSubmit} isLoading={isLoading} error={error} />
          </CardContent>
        </Card>

        {/* Glyph Visualization */}
        <Card className="bg-slate-800/50 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white">Dynamic Glyph</CardTitle>
          </CardHeader>
          <CardContent>
            <GlyphVisualization analysis={analysis} isProcessing={isLoading} />
          </CardContent>
        </Card>
      </div>

      {/* Meaning Signature */}
      {analysis && <MeaningSignature analysis={analysis} />}
    </div>
  )
}
