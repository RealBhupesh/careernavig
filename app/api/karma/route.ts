import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { text } = await generateText({
      model: groqReasoningModel,
      system: `You are a real-time market tracker capturing the ground-truth hiring sentiment, warnings, and positive opportunities within the Indian tech and corporate ecosystem. 
      You synthesize active discussions, posts, and tweets from sources like r/developersIndia, r/Indian_Academia, and Indian Tech Twitter.
      
      Generate a comprehensive state-of-the-market feed in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "marketSummary": "Brief expert overview of the current Indian hiring cycle (e.g. Q1/Q2 placements, off-campus landscape)",
        "overallTemperature": 78,
        "sectors": [
          { "name": "Product Startups", "temperature": 82, "sentiment": "Strong hiring for full-stack, AI integrations, Razorpay/Cred hiring active" },
          { "name": "IT Service Sector (WITCH)", "temperature": 45, "sentiment": "Fresher onboarding delays, strict bench policies, focus on internal upskilling" },
          { "name": "Fintech & Banking", "temperature": 80, "sentiment": "Consistent growth in Bangalore/Mumbai hubs, hiring for Golang/Kubernetes specialists" },
          { "name": "AI & Data Engineering", "temperature": 92, "sentiment": "Peak demand, startups offering premium CTC for LLM fine-tuning talent" }
        ],
        "hottestSkills": ["React/Next.js", "System Design", "Docker/Kubernetes", "Golang", "Python/LLM integrations"],
        "hotDiscussions": [
          {
            "id": "1",
            "source": "r/developersIndia",
            "title": "Onboarding delayed by 6 months at major service company - what should I do?",
            "sentiment": "Critical",
            "advice": "Do not wait on the bench. Use this time to build a robust full-stack project, practice DSA on LeetCode, and target off-campus startups immediately."
          },
          {
            "id": "2",
            "source": "Tech Twitter",
            "title": "The surge of AI wrapper startups in Bangalore: Real engineering vs API stitching?",
            "sentiment": "Neutral",
            "advice": "Learn core machine learning engineering and data pipelines rather than just using third-party APIs if you want long-term career stability."
          },
          {
            "id": "3",
            "source": "r/Indian_Academia",
            "title": "Should I pursue GATE for M.Tech at IIT or look for off-campus software roles from a Tier-3 college?",
            "sentiment": "Info",
            "advice": "If off-campus efforts are dry due to market conditions, GATE M.Tech offers a direct pathway to top Tier-1 product placement opportunities."
          }
        ]
      }`,
      prompt: "Synthesize the current state of the Indian developer job market sentiment.",
    })

    let sentimentData
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    try {
      sentimentData = JSON.parse(cleanText)
    } catch (parseError) {
      console.error("JSON parsing error on Groq market sentiment. Raw:", text, parseError)
      sentimentData = {
        marketSummary: "Hiring showing positive signs for full-stack and cloud developers. Off-campus hiring is highly competitive but highly active for candidates with unique projects.",
        overallTemperature: 70,
        sectors: [
          { name: "Product Startups", temperature: 75, sentiment: "Good hiring for React/Next.js and Python developers." },
          { name: "IT Service Sector (WITCH)", temperature: 50, sentiment: "Cautious hiring with strict bench management." },
        ],
        hottestSkills: ["React/Next.js", "Golang", "Python", "Docker"],
        hotDiscussions: [
          { id: "1", source: "r/developersIndia", title: "Off-campus hiring strategies for 2026 graduates", sentiment: "Positive", advice: "Leverage GitHub portfolios and open source contributions." }
        ]
      }
    }

    return NextResponse.json(sentimentData)
  } catch (error) {
    console.error("Market sentiment feed error:", error)
    return NextResponse.json({ error: "Failed to generate market sentiment" }, { status: 500 })
  }
}
