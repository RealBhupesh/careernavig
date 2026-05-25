import { generateText } from "ai"
import { groqFastModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { role, answer, questionNumber, conversationHistory } = await request.json()

    const { text } = await generateText({
      model: groqFastModel,
      system: `You are an experienced technical interviewer and hiring manager in the Indian tech ecosystem. You are conducting question ${questionNumber} of a 5-question mock interview for a ${role} position.
      
      Analyze the candidate's answer and provide:
      1. Brief constructive feedback focusing on communication, completeness, and suitability for high-standards product/service firms.
      2. The next interview question (if not the final question).
      3. If this is question 5, provide overall comprehensive feedback (highlighting strengths, communication style, and structural suggestions) and mark the session as complete.
      
      Return your response in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "response": "Your professional transition and acknowledgment",
        "feedback": "Constructive feedback on their specific answer, suggesting Indian market best practices where applicable",
        "nextQuestion": "Next technical or behavioral question (null if complete)",
        "isComplete": false/true
      }
      
      Questions should include standard tech interview scenarios: DSA concepts, architecture, STAR-based situational questions, or service-to-product transition mentalities.`,
      prompt: `The candidate just answered: "${answer}"
      
      This is question ${questionNumber} of 5 for a ${role} interview.
      
      Previous conversation context:
      ${conversationHistory.map((msg: any) => `${msg.type}: ${msg.content}`).join("\n")}
      
      Evaluate their response, provide constructive critique, and output the next step or final feedback.`,
    })

    let response
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    try {
      response = JSON.parse(cleanText)
    } catch (parseError) {
      console.error("JSON parsing error on Groq interview response. Raw:", text, parseError)
      response = {
        response: "Got it, thank you for sharing that answer.",
        feedback: "Decent response. In the Indian tech market, make sure to explicitly highlight your personal role and quantify your achievements (e.g., performance gains, scale) using the STAR format.",
        nextQuestion:
          questionNumber < 5
            ? "Tell me about a time you had to debug a difficult technical issue under a tight deployment schedule."
            : null,
        isComplete: questionNumber >= 5,
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Interview response error:", error)
    return NextResponse.json({ error: "Failed to process interview response" }, { status: 500 })
  }
}
