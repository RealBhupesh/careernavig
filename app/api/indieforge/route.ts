import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { concept, techStack = "Next.js + Postgres" } = await request.json()

    const { text } = await generateText({
      model: groqReasoningModel,
      system: `You are an elite micro-SaaS builder, tech-influencer, and developer advocate. You create clean, beautiful blueprints for launching self-funded products (Indie Hacking) in India. You provide actual database schemas, payment integration paths (Razorpay/Stripe), and Build-in-Public social copies.
      
      Generate the SaaS launch plan in EXACT JSON format. Do not output any markdown wrapper (like \`\`\`json) - only output raw JSON:
      {
        "productTitle": "Micro-SaaS Name",
        "databaseSchema": "Prisma schema model blocks",
        "razorpaySnippet": "A clean Javascript checkout integration hook",
        "buildInPublicPosts": [
          "Twitter Post #1 detailing the core problem and local market validation."
        ],
        "launchTimeline": [
          { "day": "Day 1-2", "task": "Configure auth and database entities" }
        ]
      }`,
      prompt: `Formulate a complete bootstrap launching blueprint. Concept: "${concept || "A automated invoice tracker for freelance designers in India"}". Selected Stack: "${techStack}".`,
    })

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
    const parsedData = JSON.parse(cleanText)
    return NextResponse.json(parsedData)
  } catch (error) {
    console.error("IndieForge API error:", error)
    return NextResponse.json({
      productTitle: "InvoiceRapid",
      databaseSchema: `model Invoice {\n  id        String   @id @default(uuid())\n  amount    Decimal\n  status    String   // PENDING, PAID\n  userId    String\n  createdAt DateTime @default(now())\n}`,
      razorpaySnippet: `const openRazorpay = async (amount) => {\n  const options = {\n    key: process.env.RAZORPAY_KEY_ID,\n    amount: amount * 100,\n    currency: "INR",\n    name: "InvoiceRapid",\n    handler: function(response) {\n      alert("Payment ID: " + response.razorpay_payment_id);\n    }\n  };\n  const rzp = new window.Razorpay(options);\n  rzp.open();\n};`,
      buildInPublicPosts: [
        "🚀 Tired of manual WhatsApp follow-ups for unpaid invoices? Building InvoiceRapid to automate billing with Razorpay integrations. 100% self-funded. Feedback welcome!",
        "💡 Standard corporate billing software is bloated. Coding a Next.js invoice generator today that lets freelancers trigger Razorpay payment links in 2 taps. Simple, lightweight, local."
      ],
      launchTimeline: [
        { day: "Day 1-3", task: "Bootstrap Next.js UI, setup HSL dark styling, and construct base Prisma models." },
        { day: "Day 4-5", task: "Integrate Razorpay webhook nodes, set up secure auth, and deploy on Vercel." }
      ]
    })
  }
}
