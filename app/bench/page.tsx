"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles, Shield, AlertOctagon, Terminal, Flame, BookOpen, Loader2 } from "lucide-react"
import Link from "next/link"

export default function BenchPage() {
  const [currentStack, setCurrentStack] = useState("")
  const [benchDuration, setBenchDuration] = useState("")
  const [targetStack, setTargetStack] = useState("")
  const [dailyHours, setDailyHours] = useState("3")
  const [loading, setLoading] = useState(false)
  const [benchData, setBenchData] = useState<any>(null)

  const handleGeneratePlan = async () => {
    if (!currentStack.trim() || !targetStack.trim()) return
    setLoading(true)

    try {
      const response = await fetch("/api/bench", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentStack,
          benchDuration,
          targetStack,
          dailyStudyHours: Number(dailyHours),
        }),
      })

      if (!response.ok) throw new Error("Plan generation failed.")
      const data = await response.json()
      setBenchData(data)
    } catch (err) {
      console.error(err)
      alert("Encountered an issue running transition simulator.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30 relative overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] gradient-glow-purple rounded-full pointer-events-none opacity-20"></div>

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
              <Terminal className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold tracking-tight text-white">Bench Escape Pod</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
            IT SERVICE RE-SKILLING & ESCAPE TERMINAL
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">The Service-Firm Bench Escape Pod</h1>
          <p className="text-zinc-400">Silent stealth-sprints designed to transition service-company engineers (WITCH) stuck on a bench into high-tier product firms.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Controls Card */}
          <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Current Legacy Stack</label>
              <Input
                placeholder="E.g. PL/SQL, Manual QA, Support"
                value={currentStack}
                onChange={(e) => setCurrentStack(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Months on Bench</label>
                <Input
                  placeholder="E.g. 4 months"
                  value={benchDuration}
                  onChange={(e) => setBenchDuration(e.target.value)}
                  className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Daily Study Hrs</label>
                <Input
                  type="number"
                  placeholder="E.g. 3"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(e.target.value)}
                  className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Target Product Stack</label>
              <Input
                placeholder="E.g. Go Backend, AI Engineer"
                value={targetStack}
                onChange={(e) => setTargetStack(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>

            <Button 
              onClick={handleGeneratePlan} 
              disabled={loading || !currentStack.trim() || !targetStack.trim()} 
              className="apple-btn-active w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-5 text-sm font-bold shadow-lg shadow-purple-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Calibrating Escape velocity...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Initiate Stealth Escape Plan
                </>
              )}
            </Button>
          </Card>

          {/* Results Details */}
          <div className="lg:col-span-2 space-y-8">
            {benchData ? (
              <div className="space-y-8">
                {/* Score panel */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <Badge className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-full px-2.5 py-0.5">
                        Escape readiness index
                      </Badge>
                      <h3 className="font-extrabold text-white text-lg">Stealth Status: High Risk / High Potential</h3>
                      <p className="text-xs text-zinc-400 max-w-md">Your transition velocity indicator measures study hours, target delta, and bench allocation security.</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-5xl font-extrabold text-purple-400 font-mono tracking-tight">{benchData.escapeVelocityIndex}%</span>
                      <Progress value={benchData.escapeVelocityIndex} className="w-28 h-2 mt-2 bg-white/5 [&>div]:bg-purple-600" />
                    </div>
                  </div>
                </Card>

                {/* Study plan panel */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <Flame className="w-4 h-4 text-purple-400 animate-pulse" />
                      Stealth Daily Sprints & Cover Ops
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 space-y-4">
                    {benchData.stealthStudyPlan?.map((plan: any, i: number) => (
                      <div key={i} className="p-4 rounded-2xl bg-zinc-950 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2 py-0.5 rounded-md">{plan.timeSlot}</span>
                          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">DAILY MODULE</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">{plan.topic}</h4>
                        <div className="mt-2.5 p-2.5 bg-white/5 rounded-xl border border-white/5 text-[11px] text-zinc-400 flex items-start gap-2">
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span><strong className="text-rose-400">Stealth cover tip:</strong> {plan.stealthTip}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Rebranding original vs revised */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      Resume & BGV Rebranding Engine
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 space-y-4">
                    {benchData.resumeRebranding?.map((rebr: any, i: number) => (
                      <div key={i} className="grid md:grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-2xl border border-white/5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Raw draft (What happened):</span>
                          <p className="text-xs text-zinc-500 leading-relaxed italic">"{rebr.original}"</p>
                        </div>
                        <div className="space-y-1 border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-4">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Rebranded bullet (ATS-ready):
                          </span>
                          <p className="text-xs text-zinc-300 leading-relaxed font-medium">"{rebr.revised}"</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Operations Guidelines */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-purple-400" /> BGV Background Verification Check
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-2 text-xs text-zinc-400 leading-relaxed">
                      {benchData.bgvGuidance}
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                    <CardHeader className="p-0 pb-2">
                      <CardTitle className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertOctagon className="w-4 h-4 text-purple-400" /> Notice Period Buyout Tactics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-2 text-xs text-zinc-400 leading-relaxed">
                      {benchData.noticePeriodTactics}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl min-h-[350px] flex items-center justify-center text-center">
                <CardContent className="p-10 space-y-4 max-w-md">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 animate-float">
                    <Terminal className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Stealth Pod Operational</h3>
                  <p className="text-zinc-400 text-sm">Provide your current support/WITCH profile coordinates, target technology framework, and daily study budget to map escape velocity strategies.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
