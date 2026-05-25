import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { currentStack, benchDuration, targetStack, dailyStudyHours } = await request.json()

    const { text } = await generateText({
      model: groqReasoningModel,
      system: `You are an elite career pivot coach specialized in helping IT service engineers in India (from firms like TCS, Infosys, Wipro, Cognizant) break out of the 'bench' cycle and transition into high-growth product-based firms or startups. You write tactical, highly realistic guides on managing notice periods, stealth learning, and framing bench time.
      
      Generate the escape program in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "escapeVelocityIndex": 72,
        "stealthStudyPlan": [
          { "timeSlot": "09:00 AM - 11:00 AM", "topic": "Core Backend Sprints", "stealthTip": "Use a secondary personal device or cover active status on corporate chat." }
        ],
        "resumeRebranding": [
          { "original": "Assigned to bench for 6 months doing no work", "revised": "Conducted research and prototyped automated test automation frameworks..." }
        ],
        "bgvGuidance": "Advice on managing background checks, service certificates, and relieving letters.",
        "noticePeriodTactics": "Strategies on how to negotiate or buy out the standard 90-day notice period in India."
      }`,
      prompt: `Formulate a stealth transition program. Current Stack: "${currentStack || "Manual QA, SQL"}". Bench Duration: "${benchDuration || "4 months"}". Target Stack: "${targetStack || "Go Backend Developer"}". Daily Study Allocation: "${dailyStudyHours || 3} hours".`,
    })

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    const parsedData = JSON.parse(cleanText)
    return NextResponse.json(parsedData)
  } catch (error) {
    console.error("Bench-Escape Pod API error:", error)
    return NextResponse.json({
      escapeVelocityIndex: 65,
      stealthStudyPlan: [
        { timeSlot: "09:30 AM - 11:00 AM", topic: "Go syntax & standard libraries", stealthTip: "Review learning docs in windowed screens alongside standard training courses." },
        { timeSlot: "02:00 PM - 04:30 PM", topic: "Building REST APIs with Gin/Fiber", stealthTip: "Push code to a personal repository; read documentation on split screens." }
      ],
      resumeRebranding: [
        { original: "Sat on bench without active projects for 4 months", revised: "Designed and piloted a high-performance distributed microservice mock engine to support regional team APIs." }
      ],
      bgvGuidance: "Standard Indian BGV companies verify employment dates and designation. Bench duration is fully covered under your regular employment tenure; you do not need to list 'bench' on your CV, just the corporate name.",
      noticePeriodTactics: "WITCH companies strictly enforce the 90-day notice. Ask for early release if you are currently unallocated on a project. Alternatively, ask your target company to buy out the notice period, or look for immediate-joiner exceptions."
    })
  }
}
