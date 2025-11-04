import { type NextRequest, NextResponse } from 'next/server'
import { rateLimit, RateLimitError } from './rate-limit'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function successResponse<T>(data: T, message?: string): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
  } as ApiResponse<T>)
}

export function errorResponse(error: string, status: number = 400): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error,
    } as ApiResponse,
    { status }
  )
}

export async function withRateLimit(
  request: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    // Use IP address or a header as identifier
    const identifier = request.ip || request.headers.get('x-forwarded-for') || 'anonymous'

    // Rate limit: 20 requests per minute
    await rateLimit(identifier, {
      interval: 60 * 1000,
      uniqueTokenPerInterval: 20,
    })

    return await handler()
  } catch (error) {
    if (error instanceof RateLimitError) {
      return errorResponse(error.message, 429)
    }
    throw error
  }
}

export async function withErrorHandling(
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await handler()
  } catch (error) {
    console.error('API Error:', error)

    if (error instanceof RateLimitError) {
      return errorResponse(error.message, 429)
    }

    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    return errorResponse(message, 500)
  }
}
