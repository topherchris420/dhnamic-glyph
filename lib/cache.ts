interface CacheItem<T> {
  data: T
  expiresAt: number
}

class Cache {
  private storage = new Map<string, CacheItem<any>>()
  private cleanupInterval: NodeJS.Timeout

  constructor() {
    // Clean up expired items every 5 minutes
    this.cleanupInterval = setInterval(
      () => {
        this.cleanup()
      },
      5 * 60 * 1000,
    )
  }

  async get<T>(key: string): Promise<T | null> {
    const item = this.storage.get(key)

    if (!item) {
      return null
    }

    if (Date.now() > item.expiresAt) {
      this.storage.delete(key)
      return null
    }

    return item.data
  }

  async set<T>(key: string, data: T, ttlSeconds: number): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000
    this.storage.set(key, { data, expiresAt })
  }

  async delete(key: string): Promise<void> {
    this.storage.delete(key)
  }

  async clear(): Promise<void> {
    this.storage.clear()
  }

  private cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []

    for (const [key, item] of this.storage.entries()) {
      if (now > item.expiresAt) {
        keysToDelete.push(key)
      }
    }

    keysToDelete.forEach((key) => this.storage.delete(key))
  }

  destroy(): void {
    clearInterval(this.cleanupInterval)
    this.storage.clear()
  }
}

export const cache = new Cache()
