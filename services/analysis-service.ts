import { apiClient } from "@/lib/api-client"
import { cache } from "@/lib/cache"
import { rateLimiter } from "@/lib/rate-limiter"
import { logger } from "@/lib/logger"
import type { InputData, AnalysisResult } from "@/types/analysis"

class AnalysisService {
  private readonly CACHE_TTL = 300 // 5 minutes
  private readonly RATE_LIMIT = 10 // requests per minute

  async analyze(inputData: InputData): Promise<AnalysisResult> {
    // Rate limiting
    await rateLimiter.checkLimit(`analysis:${inputData.type}`, this.RATE_LIMIT)

    // Generate cache key
    const cacheKey = this.generateCacheKey(inputData)

    // Check cache first
    const cached = await cache.get<AnalysisResult>(cacheKey)
    if (cached) {
      logger.info("Analysis result served from cache", { cacheKey })
      return cached
    }

    const startTime = Date.now()

    try {
      // Call analysis API
      const result = await apiClient.post<AnalysisResult>("/api/analyze", {
        input: inputData.content,
        type: inputData.type,
        metadata: inputData.metadata,
      })

      const processingTime = Date.now() - startTime
      const enrichedResult = {
        ...result,
        id: this.generateAnalysisId(),
        processingTime,
        timestamp: new Date().toISOString(),
      }

      // Cache the result
      await cache.set(cacheKey, enrichedResult, this.CACHE_TTL)

      return enrichedResult
    } catch (error) {
      logger.error("Analysis API call failed", {
        error,
        inputType: inputData.type,
        processingTime: Date.now() - startTime,
      })
      throw error
    }
  }

  private generateCacheKey(inputData: InputData): string {
    const content = typeof inputData.content === "string" ? inputData.content : JSON.stringify(inputData.content)

    // Create hash of content for cache key
    return `analysis:${inputData.type}:${this.hashString(content)}`
  }

  private generateAnalysisId(): string {
    return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }
}

export const analysisService = new AnalysisService()
