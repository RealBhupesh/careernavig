import { createOpenAI } from "@ai-sdk/openai"

// Define a unified provider for Groq using the OpenAI-compatible endpoint
export const groqProvider = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY || "",
})

// Reasoning and Analysis model (Llama 3.3 70B Versatile)
export const groqReasoningModel = groqProvider("llama-3.3-70b-versatile")

// Fast Conversational model (Llama 3.1 8B Instant)
export const groqFastModel = groqProvider("llama-3.1-8b-instant")
