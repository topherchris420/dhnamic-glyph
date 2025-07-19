"use client"

import type React from "react"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "@/components/common/error-fallback"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { Toaster } from "@/components/ui/toaster"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mic, Upload, Type, Zap, Brain, Heart } from "lucide-react"
import { GlyphCanvas } from "@/components/glyph-canvas"
import { MeaningSignature } from "@/components/meaning-signature"
import { ProcessingIndicator } from "@/components/processing-indicator"
import { useState, useRef } from "react"

interface AnalysisResult {
  emotional_valence: number // -1 to 1
  cognitive_complexity: number // 0 to 1
  energy_level: number // 0 to 1
  archetypal_resonance: string
  symbolic_elements: string[]
  meaning_signature: string
  glyph_parameters: {
    shape_complexity: number
    color_hue: number
    animation_speed: number
    resonance_frequency: number
  }
}

function HomePage() {
  const [activeTab, setActiveTab] = useState("text")
  const [textInput, setTextInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processInput = async (input: string, type: "text" | "voice" | "symbol") => {
    setIsProcessing(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input, type }),
      })

      const result = await response.json()
      setAnalysis(result)
    } catch (error) {
      console.error("Analysis failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      processInput(textInput, "text")
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // For demo purposes, we'll process the filename as symbolic input
      processInput(`Uploaded file: ${file.name} (${file.type})`, "symbol")
    }
  }

  const startVoiceRecording = () => {
    setIsRecording(true)
    // Simulate voice recording for demo
    setTimeout(() => {
      setIsRecording(false)
      processInput("Voice input: [Simulated emotional speech pattern detected]", "voice")
    }, 3000)
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-white mb-2">Resonance Glyph Decoder</h1>
              <p className="text-purple-200 text-lg">Your thoughts, symbolized. Your resonance, revealed.</p>
              <div className="flex justify-center gap-2 mt-4">
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
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Panel */}
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Type className="w-5 h-5" />
                    Input Modes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3 bg-slate-700">
                      <TabsTrigger value="text" className="data-[state=active]:bg-purple-600">
                        Text
                      </TabsTrigger>
                      <TabsTrigger value="voice" className="data-[state=active]:bg-purple-600">
                        Voice
                      </TabsTrigger>
                      <TabsTrigger value="symbol" className="data-[state=active]:bg-purple-600">
                        Symbol
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="text" className="space-y-4">
                      <Textarea
                        placeholder="Enter your thoughts, dreams, or any text to decode..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="min-h-32 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      />
                      <Button
                        onClick={handleTextSubmit}
                        disabled={!textInput.trim() || isProcessing}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        Decode Text Resonance
                      </Button>
                    </TabsContent>

                    <TabsContent value="voice" className="space-y-4">
                      <div className="text-center space-y-4">
                        <p className="text-slate-300">Capture voice patterns and emotional undertones</p>
                        <Button
                          onClick={startVoiceRecording}
                          disabled={isRecording || isProcessing}
                          className={`w-full ${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          {isRecording ? "Recording..." : "Start Voice Analysis"}
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="symbol" className="space-y-4">
                      <div className="text-center space-y-4">
                        <p className="text-slate-300">Upload symbols, diagrams, or images for archetypal analysis</p>
                        <Input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*,.txt,.pdf"
                          className="hidden"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isProcessing}
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Symbol/File
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {isProcessing && <ProcessingIndicator />}
                </CardContent>
              </Card>

              {/* Glyph Visualization */}
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white">Dynamic Glyph</CardTitle>
                </CardHeader>
                <CardContent>
                  <GlyphCanvas analysis={analysis} isProcessing={isProcessing} />
                </CardContent>
              </Card>
            </div>

            {/* Meaning Signature */}
            {analysis && <MeaningSignature analysis={analysis} />}
          </div>
        </Suspense>
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}

export default HomePage
