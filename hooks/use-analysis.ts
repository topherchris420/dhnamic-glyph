"use client"

import { useState, useCallback } from "react"
import { analysisService } from "@/services/analysis-service"
import { logger } from "@/lib/logger"
import type { InputData, AnalysisResult } from "@/types/analysis"

export function useAnalysis() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeInput = useCallback(async (inputData: InputData): Promise<AnalysisResult> => {
    setIsLoading(true)
    setError(null)

    try {
      logger.info("Starting analysis", { inputType: inputData.type, contentLength: inputData.content.length })

      const result = await analysisService.analyze(inputData)

      logger.info("Analysis completed successfully", {
        analysisId: result.id,
        processingTime: result.processingTime,
      })

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Analysis failed"
      setError(errorMessage)

      logger.error("Analysis failed", {
        error: errorMessage,
        inputType: inputData.type,
        stack: err instanceof Error ? err.stack : undefined,
      })

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
