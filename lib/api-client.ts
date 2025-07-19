import { logger } from "./logger"

interface RequestConfig {
  timeout?: number
  retries?: number
  retryDelay?: number
}

class ApiClient {
  private readonly baseURL: string
  private readonly defaultTimeout = 30000 // 30 seconds
  private readonly defaultRetries = 3
  private readonly defaultRetryDelay = 1000 // 1 second

  constructor(baseURL = "") {
    this.baseURL = baseURL
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", url, undefined, config)
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("POST", url, data, config)
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>("PUT", url, data, config)
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", url, undefined, config)
  }

  private async request<T>(method: string, url: string, data?: any, config?: RequestConfig): Promise<T> {
    const {
      timeout = this.defaultTimeout,
      retries = this.defaultRetries,
      retryDelay = this.defaultRetryDelay,
    } = config || {}

    const fullUrl = `${this.baseURL}${url}`
    let lastError: Error

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(fullUrl, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...this.getAuthHeaders(),
          },
          body: data ? JSON.stringify(data) : undefined,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const result = await response.json()

        if (attempt > 0) {
          logger.info("Request succeeded after retry", {
            url: fullUrl,
            method,
            attempt,
          })
        }

        return result
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))

        if (attempt < retries) {
          logger.warn("Request failed, retrying", {
            url: fullUrl,
            method,
            attempt,
            error: lastError.message,
          })

          await this.delay(retryDelay * Math.pow(2, attempt)) // Exponential backoff
        }
      }
    }

    logger.error("Request failed after all retries", {
      url: fullUrl,
      method,
      retries,
      error: lastError.message,
    })

    throw lastError
  }

  private getAuthHeaders(): Record<string, string> {
    // Add authentication headers if needed
    return {}
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

export const apiClient = new ApiClient()
