import { groq } from "@ai-sdk/groq"
import { generateObject } from "ai"
import { z } from "zod"
import { type NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"
import { rateLimiter } from "@/lib/rate-limiter"

const analysisSchema = z.object({
  emotional_valence: z.number().min(-1).max(1).describe("Emotional tone from -1 (negative) to 1 (positive)"),
  cognitive_complexity: z
    .number()
    .min(0)
    .max(1)
    .describe("Complexity of thought patterns from 0 (simple) to 1 (complex)"),
  energy_level: z.number().min(0).max(1).describe("Energy/intensity level from 0 (calm) to 1 (intense)"),
  archetypal_resonance: z.string().describe("Primary archetypal pattern (e.g., Hero, Sage, Creator, Explorer)"),
  symbolic_elements: z.array(z.string()).describe("Key symbolic elements detected"),
  meaning_signature: z.string().describe("A poetic interpretation of the input's deeper meaning"),
  glyph_parameters: z.object({
    shape_complexity: z.number().min(0).max(1).describe("Visual complexity of the glyph shape"),
    color_hue: z.number().min(0).max(1).describe("Primary color hue (0-1 maps to 0-360 degrees)"),
    animation_speed: z.number().min(0).max(1).describe("Speed of glyph animation"),
    resonance_frequency: z.number().min(1).max(10).describe("Frequency of resonance patterns"),
  }),
})

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    // Rate limiting
    const clientIP = request.ip || "unknown"
    await rateLimiter.checkLimit(`analyze:${clientIP}`, 10) // 10 requests per minute

    const { input, type, metadata } = await request.json()

    if (!input || !type) {
      return NextResponse.json({ error: "Missing required fields: input and type" }, { status: 400 })
    }

    logger.info("Analysis request received", {
      type,
      inputLength: typeof input === "string" ? input.length : "non-string",
      clientIP,
      metadata,
    })

    const prompt = `Analyze the following ${type} input and extract its cognitive-emotional signature for symbolic representation:

Input: "${input}"

Perform deep semantic analysis to understand:
1. Emotional undertones and valence
2. Cognitive complexity and thought patterns  
3. Energy levels and intensity
4. Archetypal resonances (Hero, Sage, Creator, Explorer, Innocent, Everyman, Lover, Jester, Caregiver, Ruler, Rebel, Magician)
5. Symbolic elements and metaphors
6. Overall meaning signature

Consider the input's hidden layers, subconscious patterns, and archetypal energies. Provide parameters that will generate a unique visual glyph representing this cognitive-emotional state.`

    const { object } = await generateObject({
      model: groq("llama-3.1-8b-instant"),
      schema: analysisSchema,
      prompt,
      temperature: 0.7,
    })

    const processingTime = Date.now() - startTime

    logger.info("Analysis completed successfully", {
      type,
      processingTime,
      clientIP,
    })

    return NextResponse.json({
      ...object,
      id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      processingTime,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const processingTime = Date.now() - startTime

    logger.error("Analysis failed", {
      error: error instanceof Error ? error.message : String(error),
      processingTime,
      stack: error instanceof Error ? error.stack : undefined,
    })

    if (error instanceof Error && error.message.includes("Rate limit")) {
      return NextResponse.json({ error: error.message }, { status: 429 })
    }

    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 })
  }
}
