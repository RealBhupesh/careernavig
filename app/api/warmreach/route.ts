import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { company, role, recruiterProfile, userBackground } = await request.json()

    const { text } = await generateText({
      model: groqReasoningModel,
      system: `You are an expert recruiter and networking coach in the Indian tech industry. You know exactly what recruiters at high-growth Indian startups (like CRED, Groww, Razorpay) and global firms look for. You avoid sycophancy, excessive flattery, and generic copy. Your outreach is hyper-targeted, concise, and focused on mutual engineering value.
      
      Generate outreach scripts in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "linkedinNote": "Maximum 300 character connection invite note",
        "coldEmail": {
          "subject": "Compelling subject line",
          "body": "Detailed cold email pitch body (with placeholders like [Name], [Project])"
        },
        "informalDM": "A highly conversational DM for Twitter/Slack/Discord"
      }`,
      prompt: `Write 3 outreach scripts targeting a team lead/recruiter at "${company || "Razorpay"}" for a "${role || "Frontend Developer"}" position. Candidate background: "${userBackground || "React, TypeScript developer with 1 year experience"}". Recruiter keywords: "${recruiterProfile || "Active speaker, open-source enthusiast"}".`,
    })

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    const parsedData = JSON.parse(cleanText)
    return NextResponse.json(parsedData)
  } catch (error) {
    console.error("WarmReach API error:", error)
    return NextResponse.json({
      linkedinNote: "Hi there! Came across your posts on tech-scaling at Razorpay. As a React/TS developer working on optimized payment flows, I'd love to connect and keep track of engineering openings in your org. Cheers!",
      coldEmail: {
        subject: "Frontend Engineer / Open-source contributor looking to add value at Razorpay",
        body: "Hi [Name],\n\nI recently read your engineering blog post on optimizing checkout interfaces and wanted to reach out. I've built a high-performance web dashboard that handles complex transaction states, resulting in a 40% reduction in load latency.\n\nSince Razorpay is scaling its core merchant panels, I believe my skills in React and TypeScript would be highly relevant. I'd love to share my portfolio or schedule a quick 10-minute chat if you have openings on the team.\n\nBest regards,\n[Your Name]"
      },
      informalDM: "Hey! Loved your recent session on open-source contributions. I'm a React dev and recently rebuilt an checkout flow. Are you guys currently expanding your frontend pods at Razorpay?"
    })
  }
}
