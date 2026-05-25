import { generateText } from "ai"
import { groqFastModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { topic, answer, questionNumber, conversationHistory = [] } = await request.json()

    // Map conversation logs to LLM format
    const historyPrompt = conversationHistory
      .map((msg: any) => `${msg.type === "bot" ? "Interviewer" : "Candidate"}: ${msg.content}`)
      .join("\n")

    const { text } = await generateText({
      model: groqFastModel,
      system: `You are 'Ironclad Tech Lead' - a senior system architect and notoriously tough technical interviewer at a tier-1 Indian startup (like Groww, CRED, or Zerodha). You hate buzzwords, hand-waving, and standard text-book answers. You challenge vague descriptions, ask deep questions about data flow, consistency, and database latency. You interrupt candidates if they start rambling or repeating standard boilerplate definitions.
      
      Analyze the candidate's last answer and generate your response in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "interviewerResponse": "Your next high-pressure, challenging technical follow-up question.",
        "score": 68,
        "critique": "Brutally honest feedback on their answer. Highlight where they rambled or waved away details.",
        "stressMetrics": {
          "ramblingPercentage": 40,
          "defensiveness": 20,
          "technicalPrecision": 70
        }
      }`,
      prompt: `Interview Topic: "${topic || "Distributed Systems & System Design"}". 
      Question Number: ${questionNumber || 1}.
      Conversation History:
      ${historyPrompt}
      
      Candidate's Latest Answer: "${answer || "I will just use a cache to make it fast"}".
      
      Analyze and generate response:`,
    })

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    const parsedData = JSON.parse(cleanText)
    return NextResponse.json(parsedData)
  } catch (error) {
    console.error("Deep-Mock API error:", error)
    return NextResponse.json({
      interviewerResponse: "You mentioned using a standard Redis cache, but how do you handle cache-invalidation under sudden high-write spikes? If two concurrent requests write different values, how do you prevent stale cache anomalies without locking the entire DB?",
      score: 55,
      critique: "Generic answer. You immediately jumped to 'putting a cache' without analyzing the write-to-read ratio or cache consistency models. Recruiting managers will call you out instantly on this hand-waving.",
      stressMetrics: {
        ramblingPercentage: 50,
        defensiveness: 10,
        technicalPrecision: 40
      }
    })
  }
}
