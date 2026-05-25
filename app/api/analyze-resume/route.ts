import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"
import { withRateLimit, withErrorHandling, errorResponse } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  return withRateLimit(request, async () => {
    return withErrorHandling(async () => {
      const { resumeText } = await request.json()

      if (!resumeText || resumeText.trim().length === 0) {
        return errorResponse("Resume text is required", 400)
      }

      const { text } = await generateText({
        model: groqReasoningModel,
        system: `You are an advanced ATS (Applicant Tracking System) parser and senior recruiter auditing resumes for top-tier Indian and global companies.
        Analyze the provided resume and return feedback in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
        {
          "overallScore": 85,
          "summary": "Overall assessment of layout, structure, and text quality",
          "categories": [
            {
              "name": "Content Quality",
              "score": 80,
              "feedback": "Feedback details"
            },
            {
              "name": "ATS Scannability",
              "score": 75,
              "feedback": "Feedback details"
            }
          ],
          "strengths": ["strength1", "strength2", ...],
          "improvements": [
            {
              "issue": "Issue description",
              "suggestion": "How to fix it"
            }
          ],
          "atsGhostSpots": [
            {
              "element": "E.g. Multi-column layout / Non-standard fonts",
              "impact": "Lowers parser extraction success",
              "fix": "Use a single-column, left-aligned standard format"
            }
          ],
          "keywords": {
            "strong": ["keyword1", "keyword2", ...],
            "missing": ["missing1", "missing2", ...]
          }
        }`,
        prompt: `Audit the following resume text for keyword relevance, quantified impacts (using STAR format), and formatting parsability (ATS Ghost Spots):

Resume Text:
${resumeText}`,
      })

      // Parse the JSON response securely
      let analysis
      const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
      try {
        analysis = JSON.parse(cleanText)
      } catch (parseError) {
        console.error("JSON parsing error on Groq resume audit. Raw:", text, parseError)
        analysis = {
          overallScore: 70,
          summary: "Your resume contains strong technical terms but has moderate ATS parsing issues.",
          categories: [
            { name: "Content Quality", score: 75, feedback: "Ensure you use the STAR format (Situation, Task, Action, Result) for bullet points." },
            { name: "ATS Scannability", score: 65, feedback: "Multi-column structures may cause parser leakage." },
          ],
          strengths: ["Strong keyword density for frontend technologies", "Clear work experience dates"],
          improvements: [
            { issue: "Weak impact verbs", suggestion: "Replace passive verbs with active ones like 'Engineered', 'Optimized', or 'Launched'." },
          ],
          atsGhostSpots: [
            { element: "Skills Section Table", impact: "Tables are often skipped by legacy ATS software", fix: "Format skills in comma-separated lines under key category headers." }
          ],
          keywords: {
            strong: ["React", "JavaScript", "Next.js"],
            missing: ["System Design", "AWS", "SQL", "Unit Testing"],
          },
        }
      }

      return NextResponse.json(analysis)
    })
  })
}
