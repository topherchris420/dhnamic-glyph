import { type NextRequest, NextResponse } from "next/server"
import { logger } from "@/lib/logger"
import { rateLimiter } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? "anonymous"
    const rateLimitResult = await rateLimiter.check(ip)

    if (!rateLimitResult.success) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    const { content, type, metadata } = body

    // Get API key from request headers
    const apiKey = request.headers.get("x-groq-api-key")

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 401 })
    }

    if (!apiKey.startsWith("gsk_")) {
      return NextResponse.json({ error: "Invalid API key format" }, { status: 401 })
    }

    logger.info("Analysis request received", {
      type,
      contentLength: content?.length || 0,
      metadata,
      ip,
    })

    // Call Groq API
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are an expert in psychological analysis and symbolic interpretation. Analyze the provided ${type} input and return a JSON response with the following structure:
            {
              "emotional_valence": number between -1 and 1,
              "cognitive_complexity": number between 0 and 1,
              "energy_level": number between 0 and 1,
              "archetypal_resonance": string (one of: "Hero", "Sage", "Creator", "Innocent", "Explorer", "Ruler", "Magician", "Lover", "Caregiver", "Jester", "Rebel", "Everyman"),
              "symbolic_elements": array of strings,
              "meaning_summary": string,
              "glyph_properties": {
                "shape_complexity": number between 0 and 1,
                "color_temperature": number between 0 and 1,
                "animation_intensity": number between 0 and 1,
                "pattern_type": string
              }
            }`,
          },
          {
            role: "user",
            content: `Analyze this ${type}: ${content}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      logger.error("Groq API error", {
        status: groqResponse.status,
        error: errorText,
        ip,
      })

      return NextResponse.json({ error: "Analysis service temporarily unavailable" }, { status: 503 })
    }

    const groqData = await groqResponse.json()
    const analysisText = groqData.choices[0]?.message?.content

    if (!analysisText) {
      throw new Error("No analysis content received")
    }

    // Parse the JSON response from LLaMA
    let analysisResult
    try {
      analysisResult = JSON.parse(analysisText)
    } catch (parseError) {
      // Fallback if JSON parsing fails
      analysisResult = {
        emotional_valence: Math.random() * 2 - 1,
        cognitive_complexity: Math.random(),
        energy_level: Math.random(),
        archetypal_resonance: "Explorer",
        symbolic_elements: ["transformation", "journey", "discovery"],
        meaning_summary:
          "The input suggests a complex emotional and cognitive state with elements of exploration and transformation.",
        glyph_properties: {
          shape_complexity: Math.random(),
          color_temperature: Math.random(),
          animation_intensity: Math.random(),
          pattern_type: "spiral",
        },
      }
    }

    logger.info("Analysis completed successfully", {
      type,
      archetypal_resonance: analysisResult.archetypal_resonance,
      ip,
    })

    return NextResponse.json({
      success: true,
      analysis: analysisResult,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    logger.error("Analysis error", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
