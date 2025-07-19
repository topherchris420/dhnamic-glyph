"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Heart } from "lucide-react"
import { InputPanel } from "./input-panel"
import { GlyphVisualization } from "./glyph-visualization"
import { MeaningSignature } from "./meaning-signature"
import { AppLogo } from "@/components/app-logo"
import { ApiKeyManager } from "@/components/api-key-manager"
import { useAnalysis } from "@/hooks/use-analysis"
import { useToast } from "@/hooks/use-toast"
import type { AnalysisResult, InputData } from "@/types/analysis"

export function ResonanceInterface() {
  const { toast } = useToast()
  const { analyzeInput, isLoading, error } = useAnalysis()
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [hasApiKey, setHasApiKey] = useState(false)

  const handleInputSubmit = useCallback(
    async (inputData: InputData) => {
      if (!hasApiKey) {
        toast({
          title: "API Key Required",
          description: "Please set your Groq API key to use the analysis features.",
          variant: "destructive",
        })
        return
      }

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
          description: "Unable to process your input. Please check your API key and try again.",
          variant: "destructive",
        })
      }
    },
    [analyzeInput, toast, hasApiKey],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <AppLogo size="xl" />
          </div>

          <div className="flex justify-center mb-4">
            <ApiKeyManager onApiKeyChange={setHasApiKey} />
          </div>

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

          {!hasApiKey && (
            <div className="max-w-md mx-auto p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-200 text-sm">
                🔑 Set your Groq API key above to start analyzing your thoughts and generating dynamic glyphs.
              </p>
            </div>
          )}
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Input Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InputPanel onSubmit={handleInputSubmit} isLoading={isLoading} error={error} disabled={!hasApiKey} />
            </CardContent>
          </Card>

          {/* Glyph Visualization */}
          <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Dynamic Glyph
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GlyphVisualization analysis={analysis} isProcessing={isLoading} />
            </CardContent>
          </Card>
        </div>

        {/* Meaning Signature */}
        {analysis && <MeaningSignature analysis={analysis} />}
      </div>
    </div>
  )
}
