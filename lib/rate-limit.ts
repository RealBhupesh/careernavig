// Simple in-memory rate limiter for API routes
// For production, use Redis or a dedicated rate limiting service

type RateLimitStore = {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitConfig {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max number of unique tokens per interval
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RateLimitError'
  }
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = {
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10, // 10 requests per minute
  }
): Promise<void> {
  const now = Date.now()
  const tokenData = store[identifier]

  if (!tokenData || now > tokenData.resetTime) {
    // Create new token or reset expired token
    store[identifier] = {
      count: 1,
      resetTime: now + config.interval,
    }
    return
  }

  if (tokenData.count >= config.uniqueTokenPerInterval) {
    const timeUntilReset = Math.ceil((tokenData.resetTime - now) / 1000)
    throw new RateLimitError(
      `Rate limit exceeded. Please try again in ${timeUntilReset} seconds.`
    )
  }

  tokenData.count++
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (now > store[key].resetTime) {
      delete store[key]
    }
  })
}, 60 * 1000) // Cleanup every minute
