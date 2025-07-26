"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Brain,
  Eye,
  Sparkles,
  Heart,
  Zap,
  Target,
  Palette,
  Settings,
} from "lucide-react"

interface TutorialStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  content: React.ReactNode
  tips: string[]
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to Resonance Glyph Decoder",
    description: "Learn how to transform your thoughts into dynamic visual symbols",
    icon: <Sparkles className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">What is a Glyph?</h3>
          <p className="text-purple-200">
            A glyph is a living symbol that represents the essence of your thoughts, emotions, and archetypal patterns.
            Each glyph is unique and evolves based on the complexity and emotional depth of your input.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <Brain className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="font-medium text-white">AI Analysis</h4>
            <p className="text-sm text-slate-300">LLaMA processes your input for meaning</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <Eye className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="font-medium text-white">Visual Creation</h4>
            <p className="text-sm text-slate-300">Transforms analysis into dynamic symbols</p>
          </div>
        </div>
      </div>
    ),
    tips: [
      "Each glyph is completely unique to your input",
      "The more detailed your input, the richer the glyph",
      "Glyphs evolve in real-time as you interact",
    ],
  },
  {
    id: 2,
    title: "Input Modes",
    description: "Explore the three ways to feed your consciousness into the decoder",
    icon: <Target className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <div className="grid gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-purple-500">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Text Analysis
            </h4>
            <p className="text-slate-300 text-sm mt-1">
              Type your thoughts, dreams, poetry, or any written content. The AI analyzes semantic patterns, emotional
              undertones, and archetypal themes.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-pink-500">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Voice Patterns
            </h4>
            <p className="text-slate-300 text-sm mt-1">
              Speak naturally and let the system analyze your vocal patterns, emotional inflections, and speech rhythms
              to create resonant glyphs.
            </p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Symbol Upload
            </h4>
            <p className="text-slate-300 text-sm mt-1">
              Upload images, drawings, or documents. The system extracts symbolic meaning and archetypal patterns from
              visual content.
            </p>
          </div>
        </div>
      </div>
    ),
    tips: [
      "Try different input types for varied results",
      "Combine multiple inputs for richer analysis",
      "Voice input captures emotional nuances text might miss",
    ],
  },
  {
    id: 3,
    title: "Understanding Your Glyph",
    description: "Learn to interpret the visual language of your consciousness",
    icon: <Eye className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Glyph Elements</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
                <span className="text-sm text-white">Color = Emotion</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-400 rounded"></div>
                <span className="text-sm text-white">Shape = Complexity</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white">Animation = Energy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-400 rounded-full opacity-50"></div>
                <span className="text-sm text-white">Patterns = Archetype</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <h4 className="font-medium text-blue-300 mb-2">Reading the Meaning Signature</h4>
          <p className="text-blue-200 text-sm">
            Below your glyph, you'll find detailed metrics including emotional valence (-1 to +1), cognitive complexity
            (0-1), energy levels, and archetypal classifications.
          </p>
        </div>
      </div>
    ),
    tips: [
      "Warmer colors indicate positive emotions",
      "More complex shapes reflect deeper thoughts",
      "Faster animations show higher energy states",
    ],
  },
  {
    id: 4,
    title: "Archetypal Resonance",
    description: "Discover the universal patterns within your consciousness",
    icon: <Heart className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">The 12 Archetypes</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "Hero", color: "bg-red-500" },
              { name: "Sage", color: "bg-blue-500" },
              { name: "Creator", color: "bg-purple-500" },
              { name: "Innocent", color: "bg-green-500" },
              { name: "Explorer", color: "bg-orange-500" },
              { name: "Rebel", color: "bg-gray-500" },
              { name: "Lover", color: "bg-pink-500" },
              { name: "Jester", color: "bg-yellow-500" },
              { name: "Caregiver", color: "bg-teal-500" },
              { name: "Ruler", color: "bg-indigo-500" },
              { name: "Magician", color: "bg-violet-500" },
              { name: "Everyman", color: "bg-amber-500" },
            ].map((archetype) => (
              <div key={archetype.name} className="text-center">
                <div className={`w-8 h-8 ${archetype.color} rounded-full mx-auto mb-1`}></div>
                <span className="text-xs text-slate-300">{archetype.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <p className="text-slate-300 text-sm">
            Your input is analyzed against these universal patterns identified by Carl Jung and Joseph Campbell. The
            dominant archetype influences your glyph's core structure and symbolic elements.
          </p>
        </div>
      </div>
    ),
    tips: [
      "Most inputs contain multiple archetypal elements",
      "Your dominant archetype may change with different inputs",
      "Archetypal patterns are universal across cultures",
    ],
  },
  {
    id: 5,
    title: "Customization & Settings",
    description: "Personalize your glyph experience",
    icon: <Settings className="w-6 h-6" />,
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <Palette className="w-6 h-6 text-purple-400 mb-2" />
            <h4 className="font-medium text-white">Visual Themes</h4>
            <p className="text-sm text-slate-300">Choose from cosmic, organic, geometric, or minimal styles</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <Zap className="w-6 h-6 text-yellow-400 mb-2" />
            <h4 className="font-medium text-white">Intensity Control</h4>
            <p className="text-sm text-slate-300">Adjust animation speed and visual complexity</p>
          </div>
        </div>
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <h4 className="font-medium text-green-300 mb-2">Pro Tip</h4>
          <p className="text-green-200 text-sm">
            Experiment with different settings to find your preferred visual style. Settings are saved locally and
            persist across sessions.
          </p>
        </div>
      </div>
    ),
    tips: [
      "Settings are saved automatically in your browser",
      "Different themes work better for different input types",
      "Lower intensity helps focus on subtle patterns",
    ],
  },
]

export function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = ((currentStep + 1) / tutorialSteps.length) * 100

  const currentTutorialStep = tutorialSteps[currentStep]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">{currentTutorialStep.icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-white">{currentTutorialStep.title}</h2>
              <p className="text-slate-400 text-sm">{currentTutorialStep.description}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
            {currentStep + 1} of {tutorialSteps.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Tutorial Content */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentTutorialStep.content}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="bg-blue-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-300 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {currentTutorialStep.tips.map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-blue-200 text-sm"
              >
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                {tip}
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="bg-transparent border-slate-600 text-slate-300"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-purple-500" : "bg-slate-600"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextStep}
          disabled={currentStep === tutorialSteps.length - 1}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Auto-play Toggle */}
      <div className="text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="text-slate-400 hover:text-white"
        >
          <Play className="w-4 h-4 mr-2" />
          {isPlaying ? "Pause" : "Auto-play"} Tutorial
        </Button>
      </div>
    </div>
  )
}
