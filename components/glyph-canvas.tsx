"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface GlyphCanvasProps {
  analysis: any
  isProcessing: boolean
  settings?: any
}

export function GlyphCanvas({ analysis, isProcessing, settings }: GlyphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = () => {
      timeRef.current += 0.016 // ~60fps

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / (2 * window.devicePixelRatio)
      const centerY = canvas.height / (2 * window.devicePixelRatio)

      if (isProcessing) {
        drawProcessingAnimation(ctx, centerX, centerY, timeRef.current)
      } else if (analysis) {
        drawGlyph(ctx, centerX, centerY, analysis, timeRef.current, settings)
      } else {
        drawIdleState(ctx, centerX, centerY, timeRef.current)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [analysis, isProcessing, settings])

  const drawProcessingAnimation = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
    const radius = 40
    const segments = 8

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2 + time * 2
      const segmentX = x + Math.cos(angle) * radius
      const segmentY = y + Math.sin(angle) * radius
      const opacity = (Math.sin(time * 3 + i) + 1) / 2

      ctx.beginPath()
      ctx.arc(segmentX, segmentY, 4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(139, 92, 246, ${opacity})`
      ctx.fill()
    }

    // Central pulse
    const pulseRadius = 20 + Math.sin(time * 4) * 10
    ctx.beginPath()
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(139, 92, 246, 0.5)`
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const drawGlyph = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    analysis: any,
    time: number,
    settings: any,
  ) => {
    const { emotional_valence, cognitive_complexity, energy_level, glyph_parameters } = analysis

    // Color based on emotional valence
    const hue = emotional_valence > 0 ? 280 + emotional_valence * 80 : 0 + Math.abs(emotional_valence) * 60
    const saturation = 70 + energy_level * 30
    const lightness = 50 + cognitive_complexity * 30

    // Base shape complexity
    const sides = Math.max(3, Math.floor(3 + cognitive_complexity * 9))
    const baseRadius = 30 + cognitive_complexity * 40
    const animationSpeed = (settings?.intensity || 1) * energy_level

    // Draw main glyph shape
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(time * animationSpeed)

    // Outer ring
    ctx.beginPath()
    for (let i = 0; i <= sides; i++) {
      const angle = (i / sides) * Math.PI * 2
      const radius = baseRadius + Math.sin(time * 3 + i) * (energy_level * 10)
      const pointX = Math.cos(angle) * radius
      const pointY = Math.sin(angle) * radius

      if (i === 0) {
        ctx.moveTo(pointX, pointY)
      } else {
        ctx.lineTo(pointX, pointY)
      }
    }
    ctx.closePath()
    ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    ctx.lineWidth = 2 + energy_level * 2
    ctx.stroke()

    // Inner patterns based on archetypal resonance
    const innerRadius = baseRadius * 0.6
    ctx.beginPath()
    for (let i = 0; i < sides * 2; i++) {
      const angle = (i / (sides * 2)) * Math.PI * 2
      const radius = innerRadius * (0.5 + Math.sin(time * 2 + i * 0.5) * 0.3)
      const pointX = Math.cos(angle) * radius
      const pointY = Math.sin(angle) * radius

      if (i === 0) {
        ctx.moveTo(pointX, pointY)
      } else {
        ctx.lineTo(pointX, pointY)
      }
    }
    ctx.closePath()
    ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`
    ctx.fill()

    // Energy particles
    if (settings?.particleCount > 0) {
      const particleCount = Math.floor((settings.particleCount || 50) * energy_level)
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + time
        const distance = baseRadius + Math.sin(time * 2 + i) * 20
        const particleX = Math.cos(angle) * distance
        const particleY = Math.sin(angle) * distance
        const size = 1 + Math.sin(time * 4 + i) * 2

        ctx.beginPath()
        ctx.arc(particleX, particleY, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue + 30}, ${saturation}%, ${lightness + 20}%, 0.6)`
        ctx.fill()
      }
    }

    ctx.restore()

    // Glow effect
    if (settings?.glowEffect) {
      ctx.save()
      ctx.globalCompositeOperation = "screen"
      ctx.shadowColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
      ctx.shadowBlur = 20
      ctx.beginPath()
      ctx.arc(x, y, baseRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.1)`
      ctx.lineWidth = 4
      ctx.stroke()
      ctx.restore()
    }
  }

  const drawIdleState = (ctx: CanvasRenderingContext2D, x: number, y: number, time: number) => {
    // Subtle breathing animation
    const radius = 30 + Math.sin(time * 0.5) * 5
    const opacity = 0.3 + Math.sin(time * 0.8) * 0.2

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
    ctx.lineWidth = 1
    ctx.stroke()

    // Center dot
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(139, 92, 246, ${opacity + 0.3})`
    ctx.fill()
  }

  return (
    <div className="relative w-full h-64 bg-slate-900/30 rounded-lg border border-slate-700/50 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />

      {!analysis && !isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
            </div>
            <p className="text-slate-400 text-sm">Your glyph will appear here</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
