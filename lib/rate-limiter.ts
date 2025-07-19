interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private limits = new Map<string, RateLimitEntry>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired entries every minute
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 60 * 1000)
  }

  async checkLimit(key: string, maxRequests: number, windowMs = 60000): Promise<void> {
    const now = Date.now()
    const entry = this.limits.get(key)

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.limits.set(key, {
        count: 1,
        resetTime: now + windowMs,
      })
      return
    }

    if (entry.count >= maxRequests) {
      const resetIn = Math.ceil((entry.resetTime - now) / 1000)
      throw new Error(`Rate limit exceeded. Try again in ${resetIn} seconds.`)
    }

    entry.count++
  }

  private cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach((key) => this.limits.delete(key))
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.limits.clear()
  }
}

export const rateLimiter = new RateLimiter()
