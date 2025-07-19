"use client"

import { useState, useCallback } from "react"
import { apiClient } from "@/lib/api-client"
import { logger } from "@/lib/logger"
import type { AnalysisResult, InputData } from "@/types/analysis"

export function useAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeInput = useCallback(async (inputData: InputData): Promise<AnalysisResult> => {
    setIsLoading(true)
    setError(null)

    try {
      // Get API key from localStorage
      const apiKey = localStorage.getItem("groq_api_key")

      if (!apiKey) {
        throw new Error("API key not found. Please set your Groq API key.")
      }

      const response = await apiClient.post("/api/analyze", inputData, {
        headers: {
          "x-groq-api-key": apiKey,
        },
      })

      if (!response.success) {
        throw new Error(response.error || "Analysis failed")
      }

      logger.info("Analysis completed", {
        type: inputData.type,
        archetypal_resonance: response.analysis.archetypal_resonance,
      })

      return response.analysis
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Analysis failed"
      setError(errorMessage)
      logger.error("Analysis error", { error: errorMessage })
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    analyzeInput,
    isLoading,
    error,
  }
}
