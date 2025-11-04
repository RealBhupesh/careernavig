import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"
import { withRateLimit, withErrorHandling, errorResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  return withRateLimit(request, async () => {
    return withErrorHandling(async () => {
      const { resumeText, skills, interests } = await request.json()

      // Validate input
      if (!resumeText || resumeText.trim().length === 0) {
        return errorResponse("Resume text is required", 400)
      }

      if (resumeText.length > 10000) {
        return errorResponse("Resume text is too long (max 10,000 characters)", 400)
      }

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: `You are an expert career counselor and resume analyst. Analyze the provided resume, skills, and interests to provide comprehensive career guidance. Return your analysis in JSON format with the following structure:
        {
          "strengths": ["strength1", "strength2", ...],
          "improvements": ["improvement1", "improvement2", ...],
          "careerMatches": [
            {"role": "Role Name", "score": 85, "reasoning": "Why this matches"},
            ...
          ],
          "summary": "Overall analysis summary"
        }`,
        prompt: `Please analyze this profile:

Resume: ${resumeText}
Skills: ${skills || 'Not specified'}
Interests: ${interests || 'Not specified'}

Provide a comprehensive analysis focusing on:
1. Key strengths and technical competencies
2. Areas that need improvement or development
3. Career path matches with percentage scores (0-100)
4. Overall profile summary

Focus on roles like Software Developer, Data Analyst, Machine Learning Engineer, Product Manager, UX Designer, DevOps Engineer, etc.`,
      })

      // Parse the JSON response
      let analysis
      try {
        analysis = JSON.parse(text)
      } catch (parseError) {
        // Fallback if JSON parsing fails
        analysis = {
          strengths: ["Technical Skills", "Problem Solving", "Communication"],
          improvements: ["Expand portfolio", "Gain more experience", "Learn new technologies"],
          careerMatches: [
            { role: "Software Developer", score: 75, reasoning: "Good technical foundation" },
            { role: "Data Analyst", score: 65, reasoning: "Analytical skills present" },
          ],
          summary: "Strong technical foundation with room for growth",
        }
      }

      return NextResponse.json(analysis)
    })
  })
}
