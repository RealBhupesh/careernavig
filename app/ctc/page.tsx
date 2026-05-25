"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles, TrendingUp, DollarSign, Wallet, ShieldAlert, Award, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CtcPage() {
  const [ctcAmount, setCtcAmount] = useState("1200000")
  const [basicPercent, setBasicPercent] = useState([40])
  const [hraPercent, setHraPercent] = useState([20])
  const [loading, setLoading] = useState(false)
  const [calcData, setCalcData] = useState<any>(null)

  const handleCalculate = async () => {
    if (!ctcAmount || isNaN(Number(ctcAmount))) return
    setLoading(true)

    try {
      const response = await fetch("/api/ctc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ctcAmount: Number(ctcAmount),
          basicPercent: basicPercent[0],
          hraPercent: hraPercent[0],
        }),
      })

      if (!response.ok) throw new Error("Calculation failure.")
      const data = await response.json()
      setCalcData(data)
    } catch (err) {
      console.error(err)
      alert("Encountered an issue running tax optimizer algorithms.")
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30 relative overflow-hidden">
      {/* Glow decorators */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] gradient-glow-purple rounded-full pointer-events-none opacity-20"></div>

      {/* Header */}
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Command Center
              </Button>
            </Link>
            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold tracking-tight text-white">CTC Optimizer</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
            SALARY TAX & BENEFIT NEGOTIATOR
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">CTC Breakdown & Tax Optimizer</h1>
          <p className="text-zinc-400">Parse standard Indian CTC offer sheets, decode complex variable deductions, and audit optimal tax regimes.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Controls Card */}
          <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Total Gross Annual CTC (₹)</label>
              <Input
                type="number"
                placeholder="E.g. 1200000"
                value={ctcAmount}
                onChange={(e) => setCtcAmount(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600 font-mono text-lg font-bold"
              />
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider block">
                Selected: {formatCurrency(Number(ctcAmount) || 0)} per annum
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Basic Salary Allocation</label>
                <span className="text-xs font-mono font-bold text-purple-400">{basicPercent[0]}%</span>
              </div>
              <Slider
                defaultValue={[40]}
                max={60}
                min={30}
                step={5}
                value={basicPercent}
                onValueChange={setBasicPercent}
                className="[&_.relative]:bg-purple-600"
              />
              <span className="text-[10px] text-zinc-500 block leading-tight">Usually capped between 40-50% under standard employee contracts in India.</span>
            </div>

            <div className="space-y-4 font-sans">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">HRA Allocation</label>
                <span className="text-xs font-mono font-bold text-purple-400">{hraPercent[0]}%</span>
              </div>
              <Slider
                defaultValue={[20]}
                max={50}
                min={10}
                step={5}
                value={hraPercent}
                onValueChange={setHraPercent}
              />
              <span className="text-[10px] text-zinc-500 block leading-tight">House Rent Allowance usually equates to 40% (non-metro) or 50% (metro) of basic.</span>
            </div>

            <Button 
              onClick={handleCalculate} 
              disabled={loading || !ctcAmount} 
              className="apple-btn-active w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-5 text-sm font-bold shadow-lg shadow-purple-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Auditing Package...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze Salary & Optimize Tax
                </>
              )}
            </Button>
          </Card>

          {/* Calculations Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {calcData ? (
              <div className="space-y-8">
                {/* Comparison regimes cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* New Regime Card */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full px-2.5 py-0.5">
                          New Tax Regime
                        </Badge>
                        <span className="text-xs text-zinc-500 font-mono">FY 2024-25</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-zinc-400 text-xs uppercase font-bold block">In-Hand Cash/mo</span>
                        <h2 className="text-3xl font-extrabold text-white font-mono tracking-tight">
                          {formatCurrency(calcData.monthlyInHand?.newRegime)}
                        </h2>
                      </div>
                      <div className="pt-2 border-t border-white/5 space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400">
                          <span>Annual Tax Liability:</span>
                          <span className="font-mono text-rose-400 font-bold">{formatCurrency(calcData.taxes?.newRegimeTax)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Old Regime Card */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge className="bg-zinc-500/10 border border-white/10 text-zinc-400 rounded-full px-2.5 py-0.5">
                          Old Tax Regime
                        </Badge>
                        <span className="text-xs text-zinc-500 font-mono">With 80C Ded.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-zinc-400 text-xs uppercase font-bold block">In-Hand Cash/mo</span>
                        <h2 className="text-3xl font-extrabold text-white font-mono tracking-tight">
                          {formatCurrency(calcData.monthlyInHand?.oldRegime)}
                        </h2>
                      </div>
                      <div className="pt-2 border-t border-white/5 space-y-1">
                        <div className="flex justify-between text-xs text-zinc-400">
                          <span>Annual Tax Liability:</span>
                          <span className="font-mono text-rose-400 font-bold">{formatCurrency(calcData.taxes?.oldRegimeTax)}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Slabs breakdown details */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      Detailed Annual Component Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 space-y-3 font-mono text-xs">
                    <div className="flex justify-between py-2 border-b border-white/5 text-zinc-400">
                      <span>Basic Salary (Base salary component):</span>
                      <span className="text-white font-bold">{formatCurrency(calcData.breakdown?.basic)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5 text-zinc-400">
                      <span>House Rent Allowance (HRA):</span>
                      <span className="text-white font-bold">{formatCurrency(calcData.breakdown?.hra)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5 text-zinc-400">
                      <span>Provident Fund Contribution (EPF):</span>
                      <span className="text-white font-bold">{formatCurrency(calcData.breakdown?.pf)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5 text-zinc-400">
                      <span>Gratuity (Retiral benefits):</span>
                      <span className="text-white font-bold">{formatCurrency(calcData.breakdown?.gratuity)}</span>
                    </div>
                    <div className="flex justify-between py-2 text-zinc-400">
                      <span>Special Allowance (Taxable residuary):</span>
                      <span className="text-white font-bold">{formatCurrency(calcData.breakdown?.specialAllowance)}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Optimization Advice */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      Groq Salary Negotiation & Restructuring Audit
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 space-y-3">
                    {calcData.optimizations?.map((opt: string, i: number) => (
                      <p key={i} className="text-zinc-400 text-xs leading-relaxed bg-zinc-950 p-3 rounded-xl border border-white/5 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{opt}</span>
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl min-h-[350px] flex items-center justify-center text-center">
                <CardContent className="p-10 space-y-4 max-w-md">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 animate-float">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Tax Optimizer Engine Standby</h3>
                  <p className="text-zinc-400 text-sm">Configure your annual package and allocation sliders to map monthly take-home salary and parse restructured allowances dynamically.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
