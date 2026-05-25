import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { role, skills } = await request.json()

    const { text } = await generateText({
      model: groqReasoningModel,
      system: `You are an elite software architect. You generate practical, high-impact project templates and GitHub repository blueprints for developers in India looking to break out of Tier-3 backgrounds or standard service companies.
      
      Generate a complete repository outline in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "title": "Project Title",
        "description": "Premium description",
        "techStack": ["Next.js", "TypeScript", "Tailwind CSS"],
        "folderTree": [
          { "path": "app/page.tsx", "purpose": "Landing Canvas" }
        ],
        "issues": [
          { "id": "ISS-001", "title": "Setup Boilerplate", "details": "Install lucide-react, configure theme providers..." }
        ],
        "systemArchitecture": "Detailed explanation of data flow and system design"
      }`,
      prompt: `Generate a premium, full-stack project blueprint to show off skills for landing a "${role || "Full-Stack Developer"}" position, given current skills: "${skills || "Javascript, Basic HTML"}"`,
    })

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    const parsedData = JSON.parse(cleanText)
    return NextResponse.json(parsedData)
  } catch (error) {
    console.error("GitForge API error:", error)
    return NextResponse.json({
      title: "Full-Stack SaaS Platform",
      description: "A high-performance modern web application demonstrating clean architecture.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      folderTree: [
        { path: "app/page.tsx", purpose: "Core user dashboard" },
        { path: "lib/db.ts", purpose: "Prisma client configuration" },
        { path: "components/ui", purpose: "Re-usable design system tokens" }
      ],
      issues: [
        { id: "ISS-001", title: "Initialize Next.js & Tailwind", details: "Bootstrap project structure with Outfit and Inter font families." },
        { id: "ISS-002", title: "Configure Prisma & PostgreSQL Slabs", details: "Establish standard relational schemas with tables and indexes." }
      ],
      systemArchitecture: "Classic Next.js App Router client communicating with a secure serverless database layer."
    })
  }
}
