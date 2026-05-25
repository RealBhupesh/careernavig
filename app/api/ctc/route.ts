import { generateText } from "ai"
import { groqReasoningModel } from "@/lib/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { ctcAmount, basicPercent = 40, hraPercent = 20 } = await request.json()
    const numericCtc = Number(ctcAmount) || 1200000

    // Relational math according to standard Indian CTC breakdowns
    const basePf = 21600 // Standard fixed PF at 1800/mo or 12% of basic
    const basic = (numericCtc * basicPercent) / 100
    const hra = (numericCtc * hraPercent) / 100
    const gratuity = basic * 0.0481 // ~4.81% of basic
    const pfContribution = Math.min(basic * 0.12, 21600) // Caps standard PF
    const specialAllowance = numericCtc - (basic + hra + pfContribution + gratuity)
    
    // Tax Engine: New vs Old Regime
    // New Regime standard deduction = 75000 (standard for recent budget revisions)
    const newRegimeStandardDeduction = 75000
    const taxableNew = Math.max(numericCtc - newRegimeStandardDeduction, 0)
    
    let taxNew = 0
    if (taxableNew <= 700000) {
      taxNew = 0 // Rebate under Sec 87A
    } else {
      // Slab-wise calculation (FY 2024-25)
      // 0-3L: 0%
      // 3-6L: 5% (15k)
      // 6-9L: 10% (30k)
      // 9-12L: 15% (45k)
      // 12-15L: 20% (60k)
      // >15L: 30%
      if (taxableNew > 1500000) {
        taxNew += (taxableNew - 1500000) * 0.3 + 150000
      } else if (taxableNew > 1200000) {
        taxNew += (taxableNew - 1200000) * 0.2 + 90000
      } else if (taxableNew > 900000) {
        taxNew += (taxableNew - 900000) * 0.15 + 45000
      } else if (taxableNew > 600000) {
        taxNew += (taxableNew - 600000) * 0.1 + 15000
      } else if (taxableNew > 300000) {
        taxNew += (taxableNew - 300000) * 0.05
      }
    }
    taxNew = taxNew * 1.04 // Add 4% Cess

    // Old Regime calculation (simplistic standard deduction = 50000)
    const oldRegimeStandardDeduction = 50000
    const taxableOld = Math.max(numericCtc - oldRegimeStandardDeduction - 150000, 0) // Assume standard 1.5L 80C
    let taxOld = 0
    if (taxableOld > 1000000) {
      taxOld += (taxableOld - 1000000) * 0.3 + 112500
    } else if (taxableOld > 500000) {
      taxOld += (taxableOld - 500000) * 0.2 + 12500
    } else if (taxableOld > 250000) {
      taxOld += (taxableOld - 250000) * 0.05
    }
    taxOld = taxOld * 1.04

    // Calculate In-Hand Salary
    // Deduct Tax, Employee PF (12% of basic), Professional Tax (standard 2400/yr or 200/mo)
    const monthlyGross = (numericCtc - pfContribution - gratuity) / 12
    const monthlyTaxNew = taxNew / 12
    const monthlyTaxOld = taxOld / 12
    const monthlyPf = pfContribution / 12
    const monthlyPt = 200

    const monthlyInHandNew = Math.max(monthlyGross - monthlyTaxNew - monthlyPf - monthlyPt, 0)
    const monthlyInHandOld = Math.max(monthlyGross - monthlyTaxOld - monthlyPf - monthlyPt, 0)

    // Call Groq for optimization insights
    const { text } = await generateText({
      model: groqReasoningModel,
      system: `You are an elite Indian Corporate Tax and Salary Negotiation Coach. You audit CTC structures and provide highly specific, actionable advice on how to structure a package to maximize in-hand pay and minimize taxes.`,
      prompt: `Analyze a CTC package of ₹${numericCtc} per annum. Basic: ₹${basic}, HRA: ₹${hra}, Special Allowance: ₹${specialAllowance}. Suggest 3-4 structural optimizations (e.g. food coupons, telephone allowance, LTA, NPS under 80CCD(2)) to reduce tax liabilities. Output advice in 3 clear bullet points.`,
    })

    return NextResponse.json({
      breakdown: {
        basic,
        hra,
        pf: pfContribution,
        gratuity,
        specialAllowance,
        totalCtc: numericCtc
      },
      taxes: {
        newRegimeTax: Math.round(taxNew),
        oldRegimeTax: Math.round(taxOld)
      },
      monthlyInHand: {
        newRegime: Math.round(monthlyInHandNew),
        oldRegime: Math.round(monthlyInHandOld)
      },
      optimizations: text.split("\n").filter(line => line.trim().length > 0)
    })
  } catch (error) {
    console.error("CTC Calculator API error:", error)
    return NextResponse.json({ error: "Failed to calculate CTC slabs" }, { status: 500 })
  }
}
