"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Palette, Zap, Eye, RotateCcw } from "lucide-react"

interface GlyphSettings {
  theme: string
  intensity: number
  colorMode: string
  animationSpeed: number
  particleCount: number
  showInnerPatterns: boolean
  glowEffect: boolean
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
    particleCount: 20,
    showInnerPatterns: true,
    glowEffect: true,
  })

  const updateSetting = (key: keyof GlyphSettings, value: any) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    onSettingsChange(newSettings)
  }

  const resetToDefaults = () => {
    const defaults = {
      theme: "cosmic",
      intensity: 1.0,
      colorMode: "emotional",
      animationSpeed: 1.0,
      particleCount: 20,
      showInnerPatterns: true,
      glowEffect: true,
    }
    setLocalSettings(defaults)
    onSettingsChange(defaults)
  }

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <Card className="bg-slate-800/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Visual Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Theme Style</Label>
            <Select value={localSettings.theme} onValueChange={(value) => updateSetting("theme", value)}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cosmic">Cosmic</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="geometric">Geometric</SelectItem>
                <SelectItem value="ethereal">Ethereal</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Color Mode</Label>
            <Select value={localSettings.colorMode} onValueChange={(value) => updateSetting("colorMode", value)}>
              <SelectTrigger className="bg-slate-700/50 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="emotional">Emotional Mapping</SelectItem>
                <SelectItem value="archetypal">Archetypal Colors</SelectItem>
                <SelectItem value="energy">Energy Based</SelectItem>
                <SelectItem value="monochrome">Monochrome</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Animation Settings */}
      <Card className="bg-slate-800/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Animation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Intensity: {localSettings.intensity.toFixed(1)}</Label>
            <Slider
              value={[localSettings.intensity]}
              onValueChange={([value]) => updateSetting("intensity", value)}
              min={0.1}
              max={2.0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Animation Speed: {localSettings.animationSpeed.toFixed(1)}x</Label>
            <Slider
              value={[localSettings.animationSpeed]}
              onValueChange={([value]) => updateSetting("animationSpeed", value)}
              min={0.1}
              max={3.0}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300">Particle Count: {localSettings.particleCount}</Label>
            <Slider
              value={[localSettings.particleCount]}
              onValueChange={([value]) => updateSetting("particleCount", value)}
              min={0}
              max={50}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Visual Effects */}
      <Card className="bg-slate-800/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Visual Effects
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-slate-300">Inner Patterns</Label>
            <Switch
              checked={localSettings.showInnerPatterns}
              onCheckedChange={(checked) => updateSetting("showInnerPatterns", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-slate-300">Glow Effect</Label>
            <Switch
              checked={localSettings.glowEffect}
              onCheckedChange={(checked) => updateSetting("glowEffect", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Reset Button */}
      <Button
        onClick={resetToDefaults}
        variant="outline"
        className="w-full bg-slate-800/50 border-purple-500/30 text-purple-200 hover:bg-purple-800/30"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset to Defaults
      </Button>
    </div>
  )
}
