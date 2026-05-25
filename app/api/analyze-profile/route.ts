import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
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

      if (resumeText.length > 15000) {
        return errorResponse("Resume text is too long (max 15,000 characters)", 400)
      }

      const { text } = await generateText({
        model: groqReasoningModel,
        system: `You are an expert Indian career counselor, recruiter, and resume advisor. Analyze the provided resume, skills, and interests in the context of the Indian job market (including Tier-1/2/3 colleges, placements, off-campus landscape, WITCH IT firms, product companies, and competitive exams).
        
        Provide your analysis in EXACT JSON format with the following structure. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
        {
          "strengths": ["strength1", "strength2", ...],
          "improvements": ["improvement1", "improvement2", ...],
          "careerMatches": [
            {"role": "Role Name", "score": 85, "reasoning": "Contextual reason considering Tier dynamics, product/service suitability, or local skill demands"},
            ...
          ],
          "tierStrategy": "Detailed off-campus strategy specifically tailored for Tier-2/Tier-3 breakout, or optimized placement route if Tier-1",
          "summary": "Overall personalized career outlook in the current Indian tech hiring market"
        }`,
        prompt: `Analyze this Indian developer profile:

Resume: ${resumeText}
Skills: ${skills || "Not specified"}
Interests: ${interests || "Not specified"}

Formulate recommendations covering:
1. Strengths and key engineering capabilities.
2. Skill deficiencies or formatting gaps.
3. Career matches (Software Dev, Data Science, DevOps, Product, or Core engineering in Indian contexts).
4. A highly actionable strategy for landing placement/off-campus offers in India.`,
      })

      // Parse the JSON response securely
      let analysis
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
      try {
        analysis = JSON.parse(cleanText)
      } catch (parseError) {
        console.error("JSON parsing error on Groq output. Raw:", text, parseError)
        // Fallback if JSON parsing fails
        analysis = {
          strengths: ["Technical Foundation", "Aptitude", "Problem Solving"],
          improvements: ["Add high-impact product projects", "Incorporate quantitative results", "Expand DSA practice"],
          careerMatches: [
            { role: "Software Developer (Product)", score: 85, reasoning: "Strong coding interest fits product firms like Zoho or Razorpay" },
            { role: "Systems Engineer (Service)", score: 70, reasoning: "Strong baseline profile makes for an easy entry into major service integrators" },
          ],
          tierStrategy: "Focus on building an outstanding GitHub portfolio and cold emailing engineering managers directly on LinkedIn to bypass standard resume filtering.",
          summary: "Promising profile with technical competency. Bridge high-level design concepts to transition into top tier tech roles.",
        }
      }

      return NextResponse.json(analysis)
    })
  })
}
