"use client"

import type React from "react"
import { Suspense, useState, useRef } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { motion, AnimatePresence } from "framer-motion"
import { ErrorFallback } from "@/components/common/error-fallback"
import { LoadingSpinner } from "@/components/common/loading-spinner"
import { Toaster } from "@/components/ui/toaster"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mic, Upload, Type, Zap, Brain, Heart, Info, Sparkles, Eye, Settings, Key } from "lucide-react"
import { GlyphCanvas } from "@/components/glyph-canvas"
import { MeaningSignature } from "@/components/meaning-signature"
import { ProcessingIndicator } from "@/components/processing-indicator"
import { InteractiveTutorial } from "@/components/interactive-tutorial"
import { GlyphCustomizer } from "@/components/glyph-customizer"
import { AnalyticsPanel } from "@/components/analytics-panel"
import { ApiKeyManager } from "@/components/api-key-manager"
import { AppLogo } from "@/components/app-logo"

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
  const [showTutorial, setShowTutorial] = useState(false)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [showApiKeyManager, setShowApiKeyManager] = useState(false)
  const [glyphSettings, setGlyphSettings] = useState({
    theme: "cosmic",
    intensity: 1.0,
    colorMode: "emotional",
  })
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
      processInput(`Uploaded file: ${file.name} (${file.type})`, "symbol")
    }
  }

  const startVoiceRecording = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      processInput("Voice input: [Simulated emotional speech pattern detected]", "voice")
    }, 3000)
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <div className="max-w-7xl mx-auto p-6 space-y-8 relative z-10">
              {/* Enhanced Welcome Section */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 overflow-hidden rounded-3xl">
                  <img
                    src="/images/spectrogram-pattern.webp"
                    alt="Spectrogram pattern background"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Content Container */}
                <div className="relative bg-gradient-to-r from-slate-900/80 via-purple-900/60 to-slate-900/80 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 md:p-12">
                  <div className="text-center space-y-6">
                    {/* Logo and Title */}
                    <div className="flex flex-col items-center gap-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="relative"
                      >
                        <AppLogo size="xl" />
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
                      </motion.div>

                      <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                            Welcome to
                          </span>
                        </h1>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Resonance Glyph Decoder
                          </span>
                        </h2>
                      </div>
                    </div>

                    {/* Enhanced Description */}
                    <div className="max-w-4xl mx-auto space-y-4">
                      <p className="text-xl md:text-2xl text-purple-100 font-light leading-relaxed">
                        Transform your thoughts into{" "}
                        <span className="font-semibold text-pink-300">dynamic visual symbols</span> using{" "}
                        <span className="font-semibold text-blue-300">AI-powered archetypal analysis</span>
                      </p>

                      <p className="text-lg text-purple-200/80 leading-relaxed max-w-3xl mx-auto">
                        Decode the hidden patterns in your words, voice, and symbols. Watch as your consciousness takes
                        shape through living glyphs that pulse with meaning and resonate with your inner truth.
                      </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="flex justify-center gap-3 flex-wrap mt-8">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="secondary"
                          className="bg-purple-800/50 text-purple-100 border-purple-500/30 px-4 py-2 text-sm font-medium"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          LLaMA via Groq
                        </Badge>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="secondary"
                          className="bg-blue-800/50 text-blue-100 border-blue-500/30 px-4 py-2 text-sm font-medium"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Real-time Analysis
                        </Badge>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          variant="secondary"
                          className="bg-pink-800/50 text-pink-100 border-pink-500/30 px-4 py-2 text-sm font-medium"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Emotional Mapping
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                      <Dialog open={showApiKeyManager} onOpenChange={setShowApiKeyManager}>
                        <DialogTrigger asChild>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <Key className="w-5 h-5 mr-2" />
                            Setup API Key
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>API Key Management</DialogTitle>
                            <DialogDescription>
                              Securely configure your Groq API key for LLaMA inference
                            </DialogDescription>
                          </DialogHeader>
                          <ApiKeyManager />
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className="bg-slate-800/50 border-purple-500/30 text-purple-200 hover:bg-purple-800/30 font-semibold px-8 py-3 rounded-xl backdrop-blur-sm"
                          >
                            <Info className="w-5 h-5 mr-2" />
                            How it Works
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Interactive Tutorial</DialogTitle>
                            <DialogDescription>Learn how to use the Resonance Glyph Decoder</DialogDescription>
                          </DialogHeader>
                          <InteractiveTutorial />
                        </DialogContent>
                      </Dialog>

                      <Dialog open={showCustomizer} onOpenChange={setShowCustomizer}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className="bg-slate-800/50 border-purple-500/30 text-purple-200 hover:bg-purple-800/30 font-semibold px-8 py-3 rounded-xl backdrop-blur-sm"
                          >
                            <Settings className="w-5 h-5 mr-2" />
                            Customize
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Glyph Customization</DialogTitle>
                            <DialogDescription>Adjust visual settings and analysis parameters</DialogDescription>
                          </DialogHeader>
                          <GlyphCustomizer settings={glyphSettings} onSettingsChange={setGlyphSettings} />
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Spectrogram Visual Element */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="mt-12 relative"
                    >
                      <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
                        <div className="relative bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 overflow-hidden">
                          <img
                            src="/images/spectrogram-pattern.webp"
                            alt="Spectrogram visualization showing pattern analysis"
                            className="w-full h-32 object-cover object-center rounded-lg opacity-80"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-6 right-6">
                            <p className="text-sm text-purple-300 font-medium">
                              Pattern Recognition • Frequency Analysis • Symbolic Resonance
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Input Panel */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Type className="w-5 h-5" />
                        Input Modes
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Choose your preferred input method for analysis</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
                          <TabsTrigger value="text" className="data-[state=active]:bg-purple-600">
                            <Type className="w-4 h-4 mr-1" />
                            Text
                          </TabsTrigger>
                          <TabsTrigger value="voice" className="data-[state=active]:bg-purple-600">
                            <Mic className="w-4 h-4 mr-1" />
                            Voice
                          </TabsTrigger>
                          <TabsTrigger value="symbol" className="data-[state=active]:bg-purple-600">
                            <Upload className="w-4 h-4 mr-1" />
                            Symbol
                          </TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                          <TabsContent value="text" className="space-y-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Textarea
                                placeholder="Enter your thoughts, dreams, or any text to decode..."
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                className="min-h-32 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                              />
                              <Button
                                onClick={handleTextSubmit}
                                disabled={!textInput.trim() || isProcessing}
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                              >
                                {isProcessing ? (
                                  <>
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                      className="w-4 h-4 mr-2"
                                    >
                                      <Sparkles className="w-4 h-4" />
                                    </motion.div>
                                    Decoding...
                                  </>
                                ) : (
                                  "Decode Text Resonance"
                                )}
                              </Button>
                            </motion.div>
                          </TabsContent>

                          <TabsContent value="voice" className="space-y-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="text-center space-y-4"
                            >
                              <p className="text-slate-300">Capture voice patterns and emotional undertones</p>
                              <Button
                                onClick={startVoiceRecording}
                                disabled={isRecording || isProcessing}
                                className={`w-full transition-all duration-300 ${
                                  isRecording
                                    ? "bg-red-600 hover:bg-red-700 animate-pulse"
                                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                }`}
                              >
                                <Mic className="w-4 h-4 mr-2" />
                                {isRecording ? "Recording..." : "Start Voice Analysis"}
                              </Button>
                            </motion.div>
                          </TabsContent>

                          <TabsContent value="symbol" className="space-y-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                              className="text-center space-y-4"
                            >
                              <p className="text-slate-300">
                                Upload symbols, diagrams, or images for archetypal analysis
                              </p>
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
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Symbol/File
                              </Button>
                            </motion.div>
                          </TabsContent>
                        </AnimatePresence>
                      </Tabs>

                      {isProcessing && <ProcessingIndicator />}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Glyph Visualization */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="lg:col-span-1"
                >
                  <Card className="bg-slate-800/50 border-purple-500/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Dynamic Glyph
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-slate-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Your thoughts visualized as living symbols</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <GlyphCanvas analysis={analysis} isProcessing={isProcessing} settings={glyphSettings} />
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Analytics Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="lg:col-span-1"
                >
                  <AnalyticsPanel analysis={analysis} />
                </motion.div>
              </div>

              {/* Meaning Signature */}
              <AnimatePresence>
                {analysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <MeaningSignature analysis={analysis} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Suspense>
          <Toaster />
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  )
}

export default HomePage
