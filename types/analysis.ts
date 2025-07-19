export interface InputData {
  content: string | AudioData
  type: "text" | "voice" | "symbol"
  metadata?: Record<string, any>
}

export interface AudioData {
  blob: Blob
  duration: number
  url: string
}

export interface AnalysisResult {
  id: string
  emotional_valence: number
  cognitive_complexity: number
  energy_level: number
  archetypal_resonance: string
  symbolic_elements: string[]
  meaning_signature: string
  glyph_parameters: GlyphParameters
  processingTime: number
  timestamp: string
}

export interface GlyphParameters {
  shape_complexity: number
  color_hue: number
  animation_speed: number
  resonance_frequency: number
}
