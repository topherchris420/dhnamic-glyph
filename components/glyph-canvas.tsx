"use client"

import { useEffect, useRef } from "react"

interface GlyphCanvasProps {
  analysis: {
    emotional_valence: number
    cognitive_complexity: number
    energy_level: number
    glyph_parameters: {
      shape_complexity: number
      color_hue: number
      animation_speed: number
      resonance_frequency: number
    }
  } | null
  isProcessing: boolean
}

export function GlyphCanvas({ analysis, isProcessing }: GlyphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      timeRef.current += 0.02
      drawGlyph(ctx, canvas.width, canvas.height, timeRef.current)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [analysis, isProcessing])

  const drawGlyph = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const baseRadius = Math.min(width, height) * 0.3

    if (isProcessing) {
      // Processing animation
      drawProcessingGlyph(ctx, centerX, centerY, baseRadius, time)
      return
    }

    if (!analysis) {
      // Default neutral glyph
      drawDefaultGlyph(ctx, centerX, centerY, baseRadius)
      return
    }

    // Extract parameters
    const { emotional_valence, cognitive_complexity, energy_level, glyph_parameters } = analysis
    const { shape_complexity, color_hue, animation_speed, resonance_frequency } = glyph_parameters

    // Color based on emotional valence
    const hue = color_hue * 360
    const saturation = Math.abs(emotional_valence) * 100
    const lightness = 50 + energy_level * 30

    ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`
    ctx.lineWidth = 2 + energy_level * 3

    // Dynamic radius based on energy
    const dynamicRadius = baseRadius * (1 + Math.sin(time * animation_speed * 5) * energy_level * 0.3)

    // Shape complexity determines number of points/vertices
    const vertices = Math.floor(3 + shape_complexity * 12)

    // Draw main glyph shape
    ctx.beginPath()
    for (let i = 0; i <= vertices; i++) {
      const angle = (i / vertices) * Math.PI * 2
      const radiusVariation =
        1 + Math.sin(angle * resonance_frequency + time * animation_speed * 3) * cognitive_complexity * 0.4
      const x = centerX + Math.cos(angle) * dynamicRadius * radiusVariation
      const y = centerY + Math.sin(angle) * dynamicRadius * radiusVariation

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Inner resonance patterns
    if (cognitive_complexity > 0.5) {
      drawInnerPatterns(ctx, centerX, centerY, dynamicRadius * 0.6, cognitive_complexity, time, animation_speed)
    }

    // Energy particles
    if (energy_level > 0.3) {
      drawEnergyParticles(ctx, centerX, centerY, dynamicRadius * 1.2, energy_level, time, animation_speed, hue)
    }
  }

  const drawProcessingGlyph = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, time: number) => {
    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 3

    // Spinning processing indicator
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + time * 3
      const innerRadius = radius * 0.5
      const outerRadius = radius * (0.8 + Math.sin(time * 5 + i) * 0.2)

      ctx.beginPath()
      ctx.moveTo(x + Math.cos(angle) * innerRadius, y + Math.sin(angle) * innerRadius)
      ctx.lineTo(x + Math.cos(angle) * outerRadius, y + Math.sin(angle) * outerRadius)
      ctx.stroke()
    }
  }

  const drawDefaultGlyph = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    ctx.strokeStyle = "#64748b"
    ctx.fillStyle = "rgba(100, 116, 139, 0.2)"
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }

  const drawInnerPatterns = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    complexity: number,
    time: number,
    speed: number,
  ) => {
    ctx.strokeStyle = `rgba(255, 255, 255, ${complexity * 0.5})`
    ctx.lineWidth = 1

    const patterns = Math.floor(complexity * 6)
    for (let i = 0; i < patterns; i++) {
      const angle = (i / patterns) * Math.PI * 2 + time * speed
      const patternRadius = radius * (0.3 + (i / patterns) * 0.4)

      ctx.beginPath()
      ctx.arc(
        x + Math.cos(angle) * patternRadius * 0.5,
        y + Math.sin(angle) * patternRadius * 0.5,
        patternRadius * 0.3,
        0,
        Math.PI * 2,
      )
      ctx.stroke()
    }
  }

  const drawEnergyParticles = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    energy: number,
    time: number,
    speed: number,
    hue: number,
  ) => {
    const particles = Math.floor(energy * 20)

    for (let i = 0; i < particles; i++) {
      const angle = (i / particles) * Math.PI * 2 + time * speed * 2
      const distance = radius + Math.sin(time * speed * 3 + i) * 20
      const particleX = x + Math.cos(angle) * distance
      const particleY = y + Math.sin(angle) * distance
      const size = 1 + Math.sin(time * speed * 4 + i) * 2

      ctx.fillStyle = `hsla(${hue}, 80%, 70%, ${energy * 0.8})`
      ctx.beginPath()
      ctx.arc(particleX, particleY, size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-auto bg-slate-900/50 rounded-lg border border-purple-500/20"
      />
      <div className="absolute bottom-2 right-2 text-xs text-slate-400">Real-time Glyph Rendering</div>
    </div>
  )
}
