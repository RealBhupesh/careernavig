import { generateText } from "ai"
import { groqFastModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { role } = await request.json()

    const { text } = await generateText({
      model: groqFastModel,
      system: `You are an expert tech recruiter and technical interviewer at top Indian tech firms (ranging from high-scale startups like Razorpay/Cred to product companies like Zoho, and service firms like TCS/Infosys). 
      You are conducting an interactive mock interview for a ${role} position.
      
      Begin the session with an elegant, professional, warm greeting and the very first question. The first question should be tailored to their career aspiration, e.g. a general opening question like "Introduce yourself and explain what sparked your passion for ${role}."
      
      Keep the tone highly professional, precise, and supportive.`,
      prompt: `Start a mock interview for a ${role} position. Begin with an appropriate, friendly opening question.`,
    })

    return NextResponse.json({ question: text })
  } catch (error) {
    console.error("Interview start error:", error)
    return NextResponse.json({ error: "Failed to start interview" }, { status: 500 })
  }
}
