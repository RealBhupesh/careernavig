import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { role, currentSkills } = await request.json()

    const { text } = await generateText({
      model: groqReasoningModel,
      system: `You are an elite career planner and engineering mentor. You create structured, step-by-step upskilling roadmaps (SkillForge) and a comprehensive competitive path matrix (Placements vs. GATE vs. CAT vs. UPSC vs. MS Abroad) for Indian graduates.
      
      Generate the career roadmap and decision paths in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "role": "Target role name",
        "weeks": [
          {
            "week": 1,
            "title": "Topic or focus of the week",
            "skills": ["Skill1", "Skill2"],
            "description": "Short explanation of the goals for the week",
            "resources": [
              { "name": "Resource name", "url": "URL or description" }
            ],
            "project": "Actionable micro-project to build this week"
          }
        ],
        "competitiveMatrix": {
          "placementScore": 90,
          "placementPros": ["Immediate salary", "Practical industry growth"],
          "placementCons": ["Placement market volatility", "Service-firm stagnation if not upskilled"],
          "catScore": 85,
          "catPros": ["High management salary potential", "Fast-track corporate leadership"],
          "catCons": ["Extremely high IIM tuition fees", "Highly competitive CAT exam percentile targets"],
          "gateScore": 75,
          "gatePros": ["Direct PSU job qualification", "Affordable IIT M.Tech paths"],
          "gateCons": ["Theoretical and academic intensive", "Less startup/indie hacker exposure"],
          "upscScore": 60,
          "upscPros": ["High administrative authority", "Strong societal status in India"],
          "upscCons": ["Extremely low success percentage (<0.1%)", "Lengthy multi-year prep cycles"],
          "msScore": 70,
          "msPros": ["Global startup/tech hub exposure", "High quality of life indices"],
          "msCons": ["Heavy financial debt or loan traps", "Visa sponsorship uncertainties"]
        }
      }`,
      prompt: `Generate a structured upskilling roadmap and 5-track competitive decision matrix for landing a "${role}" position, assuming current skills are: "${currentSkills || "Basic Coding, Javascript"}"`,
    })

    let roadmapData
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    try {
      roadmapData = JSON.parse(cleanText)
    } catch (parseError) {
      console.error("JSON parsing error on Groq roadmap generator. Raw:", text, parseError)
      roadmapData = {
        role: role || "Software Developer",
        weeks: [
          {
            week: 1,
            title: "Advanced Data Structures & Algorithms",
            skills: ["Arrays", "Linked Lists", "Complexity Analysis"],
            description: "Build a strong foundation for technical rounds.",
            resources: [{ name: "Kunal Kushwaha DSA Playlist", url: "YouTube" }],
            project: "Implement key search and sorting algorithms from scratch."
          }
        ],
        competitiveMatrix: {
          placementScore: 85,
          placementPros: ["Immediate industry experience"],
          placementCons: ["Competitive off-campus hiring market"],
          catScore: 80,
          catPros: ["High management salary"],
          catCons: ["High exam cutoffs"],
          gateScore: 70,
          gatePros: ["M.Tech at top IITs"],
          gateCons: ["Rigorous theoretical preparation"],
          upscScore: 50,
          upscPros: ["High administrative prestige"],
          upscCons: ["Extremely low success rates"],
          msScore: 65,
          msPros: ["Global startup opportunities"],
          msCons: ["Substantial financial loan requirements"]
        }
      }
    }

    return NextResponse.json(roadmapData)
  } catch (error) {
    console.error("Roadmap generation error:", error)
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 })
  }
}
