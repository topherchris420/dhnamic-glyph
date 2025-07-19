"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Brain, Heart, Zap, Eye } from "lucide-react"

const tutorialSteps = [
  {
    title: "Welcome to Resonance Glyph Decoder",
    content: "Transform your thoughts into dynamic visual symbols using AI-powered archetypal analysis.",
    image: "/placeholder.svg?height=200&width=300&text=Welcome",
    highlights: ["AI-Powered", "Real-time", "Visual Symbols"],
  },
  {
    title: "Input Your Thoughts",
    content: "Choose from three input modes: text analysis, voice recognition, or symbol upload.",
    image: "/placeholder.svg?height=200&width=300&text=Input+Modes",
    highlights: ["Text", "Voice", "Symbols"],
  },
  {
    title: "AI Analysis Process",
    content: "Our LLaMA model analyzes emotional valence, cognitive complexity, and archetypal patterns.",
    image: "/placeholder.svg?height=200&width=300&text=AI+Analysis",
    highlights: ["Emotional Valence", "Cognitive Complexity", "Archetypal Patterns"],
  },
  {
    title: "Dynamic Glyph Generation",
    content: "Watch as your thoughts transform into living, breathing visual symbols that evolve in real-time.",
    image: "/placeholder.svg?height=200&width=300&text=Dynamic+Glyph",
    highlights: ["Real-time", "Morphing", "Interactive"],
  },
  {
    title: "Meaning Signature",
    content: "Discover the deeper meaning behind your glyph with detailed archetypal analysis and insights.",
    image: "/placeholder.svg?height=200&width=300&text=Meaning+Signature",
    highlights: ["Archetypal Analysis", "Insights", "Interpretation"],
  },
]

export function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % tutorialSteps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + tutorialSteps.length) % tutorialSteps.length)
  }

  const startAutoPlay = () => {
    setIsPlaying(true)
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % tutorialSteps.length
        if (next === 0) {
          setIsPlaying(false)
          clearInterval(interval)
        }
        return next
      })
    }, 3000)
  }

  const currentStepData = tutorialSteps[currentStep]

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex justify-center space-x-2">
        {tutorialSteps.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentStep ? "bg-purple-500" : "bg-slate-600"
            }`}
            onClick={() => setCurrentStep(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {currentStep + 1}
                </div>
                {currentStepData.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-slate-700/50 rounded-lg flex items-center justify-center">
                <img
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <p className="text-slate-300 leading-relaxed">{currentStepData.content}</p>

              <div className="flex flex-wrap gap-2">
                {currentStepData.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-900/50 text-purple-200">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center">
        <Button
          onClick={prevStep}
          variant="outline"
          className="bg-slate-800/50 border-purple-500/30 text-purple-200"
          disabled={isPlaying}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={startAutoPlay}
          variant="outline"
          className="bg-slate-800/50 border-purple-500/30 text-purple-200"
          disabled={isPlaying}
        >
          <Play className="w-4 h-4 mr-2" />
          {isPlaying ? "Playing..." : "Auto Play"}
        </Button>

        <Button
          onClick={nextStep}
          variant="outline"
          className="bg-slate-800/50 border-purple-500/30 text-purple-200"
          disabled={isPlaying}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Key Features Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card className="bg-slate-800/30 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-white font-medium">AI Analysis</h3>
            <p className="text-slate-400 text-sm">Advanced cognitive pattern recognition</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <h3 className="text-white font-medium">Emotional Mapping</h3>
            <p className="text-slate-400 text-sm">Detect and visualize emotional states</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-white font-medium">Real-time Processing</h3>
            <p className="text-slate-400 text-sm">Lightning-fast Groq inference</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/30 border-purple-500/20">
          <CardContent className="p-4 text-center">
            <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <h3 className="text-white font-medium">Dynamic Visualization</h3>
            <p className="text-slate-400 text-sm">Living, breathing symbol generation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
