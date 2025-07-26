"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Palette, Zap, Eye, Sparkles, RotateCcw, Save, Download } from "lucide-react"

interface GlyphSettings {
  theme: string
  intensity: number
  colorMode: string
  animationSpeed: number
  particleCount: number
  glowEffect: boolean
  symmetry: boolean
  complexity: number
}

interface GlyphCustomizerProps {
  settings: any
  onSettingsChange: (settings: any) => void
}

export function GlyphCustomizer({ settings, onSettingsChange }: GlyphCustomizerProps) {
  const [localSettings, setLocalSettings] = useState<GlyphSettings>({
    theme: settings.theme || "cosmic",
    intensity: settings.intensity || 1.0,
    colorMode: settings.colorMode || "emotional",
    animationSpeed: 1.0,
    particleCount: 50,
    glowEffect: true,
    symmetry: false,
    complexity: 0.7,
  })

  const themes = [
    { value: "cosmic", label: "Cosmic", description: "Deep space aesthetics with nebula effects" },
    { value: "organic", label: "Organic", description: "Natural forms and flowing patterns" },
    { value: "geometric", label: "Geometric", description: "Sharp angles and mathematical precision" },
    { value: "minimal", label: "Minimal", description: "Clean lines and subtle animations" },
    { value: "neon", label: "Neon", description: "Vibrant cyberpunk-inspired visuals" },
  ]

  const colorModes = [
    { value: "emotional", label: "Emotional", description: "Colors based on emotional valence" },
    { value: "archetypal", label: "Archetypal", description: "Colors representing archetypal patterns" },
    { value: "energy", label: "Energy", description: "Colors reflecting energy levels" },
    { value: "custom", label: "Custom", description: "User-defined color palette" },
  ]

  const updateSetting = (key: keyof GlyphSettings, value: any) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const resetToDefaults = () => {
    const defaults: GlyphSettings = {
      theme: "cosmic",
      intensity: 1.0,
      colorMode: "emotional",
      animationSpeed: 1.0,
      particleCount: 50,
      glowEffect: true,
      symmetry: false,
      complexity: 0.7,
    }
    setLocalSettings(defaults)
    onSettingsChange(defaults)
  }

  const savePreset = () => {
    localStorage.setItem("glyph_preset", JSON.stringify(localSettings))
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(localSettings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "glyph-settings.json"
    link.click()
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Theme Selection */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Palette className="w-5 h-5" />
            Visual Theme
          </CardTitle>
          <CardDescription>Choose the overall aesthetic style for your glyphs</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={localSettings.theme} onValueChange={(value) => updateSetting("theme", value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {themes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value} className="text-white">
                  <div>
                    <div className="font-medium">{theme.label}</div>
                    <div className="text-xs text-slate-400">{theme.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Color Mode */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Eye className="w-5 h-5" />
            Color Mode
          </CardTitle>
          <CardDescription>How colors are determined for your glyphs</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={localSettings.colorMode} onValueChange={(value) => updateSetting("colorMode", value)}>
            <SelectTrigger className="bg-slate-800 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {colorModes.map((mode) => (
                <SelectItem key={mode.value} value={mode.value} className="text-white">
                  <div>
                    <div className="font-medium">{mode.label}</div>
                    <div className="text-xs text-slate-400">{mode.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Animation Controls */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Zap className="w-5 h-5" />
            Animation Settings
          </CardTitle>
          <CardDescription>Control the movement and energy of your glyphs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white">Intensity</Label>
              <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
                {Math.round(localSettings.intensity * 100)}%
              </Badge>
            </div>
            <Slider
              value={[localSettings.intensity]}
              onValueChange={([value]) => updateSetting("intensity", value)}
              max={2}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white">Animation Speed</Label>
              <Badge variant="secondary" className="bg-blue-800/50 text-blue-200">
                {localSettings.animationSpeed}x
              </Badge>
            </div>
            <Slider
              value={[localSettings.animationSpeed]}
              onValueChange={([value]) => updateSetting("animationSpeed", value)}
              max={3}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white">Particle Count</Label>
              <Badge variant="secondary" className="bg-green-800/50 text-green-200">
                {localSettings.particleCount}
              </Badge>
            </div>
            <Slider
              value={[localSettings.particleCount]}
              onValueChange={([value]) => updateSetting("particleCount", value)}
              max={200}
              min={0}
              step={10}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white">Complexity</Label>
              <Badge variant="secondary" className="bg-orange-800/50 text-orange-200">
                {Math.round(localSettings.complexity * 100)}%
              </Badge>
            </div>
            <Slider
              value={[localSettings.complexity]}
              onValueChange={([value]) => updateSetting("complexity", value)}
              max={1}
              min={0.1}
              step={0.1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Visual Effects */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5" />
            Visual Effects
          </CardTitle>
          <CardDescription>Toggle special visual enhancements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Glow Effect</Label>
              <p className="text-xs text-slate-400">Adds ethereal glow around glyphs</p>
            </div>
            <Switch
              checked={localSettings.glowEffect}
              onCheckedChange={(checked) => updateSetting("glowEffect", checked)}
            />
          </div>

          <Separator className="bg-slate-700" />

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Symmetry Mode</Label>
              <p className="text-xs text-slate-400">Forces symmetrical glyph patterns</p>
            </div>
            <Switch
              checked={localSettings.symmetry}
              onCheckedChange={(checked) => updateSetting("symmetry", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={resetToDefaults} variant="outline" className="flex-1 bg-transparent border-slate-600">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <Button onClick={savePreset} variant="outline" className="flex-1 bg-transparent border-slate-600">
          <Save className="w-4 h-4 mr-2" />
          Save Preset
        </Button>
        <Button onClick={exportSettings} className="flex-1 bg-purple-600 hover:bg-purple-700">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Preview */}
      <Card className="bg-slate-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white text-sm">Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-slate-800 rounded-lg flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2 / localSettings.animationSpeed,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ${
                localSettings.glowEffect ? "shadow-lg shadow-purple-500/50" : ""
              }`}
              style={{
                opacity: localSettings.intensity,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
