"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Sparkles, BookOpen, Target, Calendar, Award, Code, HelpCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RoadmapPage() {
  const [role, setRole] = useState("")
  const [currentSkills, setCurrentSkills] = useState("")
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState<any>(null)

  const handleGenerateRoadmap = async () => {
    if (!role.trim()) return
    setLoading(true)

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, currentSkills }),
      })

      if (!response.ok) throw new Error("Failed to compile roadmap.")
      const data = await response.json()
      setRoadmap(data)
    } catch (err) {
      console.error(err)
      alert("Encountered an issue compiling your upskilling roadmap. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-amber-400"
    return "text-rose-400"
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30">
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
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold tracking-tight text-white">SkillForge & Optimizer</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
            INTELLIGENT SKILL DEVELOPMENT & DECISION ENGINE
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">SkillForge Roadmap & Competitive Matrix</h1>
          <p className="text-zinc-400">Generate structured weekly learning milestones and optimize your Indian career tracks (CAT vs. GATE vs. Placement).</p>
        </div>

        {/* Input Configuration Card */}
        <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 mb-10 shadow-xl max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Target Aspiration Role</label>
              <Input
                placeholder="E.g. Full-Stack Developer, AI Researcher"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Current Competencies</label>
              <Input
                placeholder="E.g. Java, Basic HTML, SQL"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
          </div>
          <Button 
            onClick={handleGenerateRoadmap} 
            disabled={loading || !role.trim()} 
            className="apple-btn-active w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-5 text-sm font-bold mt-6 shadow-lg shadow-purple-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Synthesizing Custom Sprints...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Forge My Roadmap & Decision Matrix
              </>
            )}
          </Button>
        </Card>

        {roadmap ? (
          <div className="space-y-10">
            <Tabs defaultValue="roadmap" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-zinc-900 border border-white/5 rounded-full p-1.5 h-auto">
                  <TabsTrigger value="roadmap" className="rounded-full px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold text-sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    SkillForge Weekly Roadmap
                  </TabsTrigger>
                  <TabsTrigger value="matrix" className="rounded-full px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white font-semibold text-sm">
                    <Target className="w-4 h-4 mr-2" />
                    Competitive Path Matrix
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* TAB CONTENT 1: SkillForge weekly sprints */}
              <TabsContent value="roadmap" className="focus-visible:ring-0">
                <div className="relative border-l border-white/10 pl-6 ml-4 space-y-10 max-w-4xl mx-auto">
                  {roadmap.weeks?.map((wk: any, i: number) => (
                    <div key={i} className="relative">
                      {/* Floating Timeline dot */}
                      <span className="absolute -left-[35px] top-1 w-[18px] h-[18px] bg-purple-600 rounded-full border-4 border-zinc-950 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.4)] animate-pulse-ring"></span>
                      
                      <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 font-mono font-extrabold text-5xl text-white/5 pointer-events-none uppercase">
                          WEEK 0{wk.week || i+1}
                        </div>

                        <CardHeader className="pb-2 p-0">
                          <Badge variant="outline" className="border-purple-500/20 text-purple-400 bg-purple-500/5 rounded-full px-2.5 py-0.5 mb-2 font-mono text-[10px]">
                            SPRINT MODULE
                          </Badge>
                          <CardTitle className="text-xl text-white font-bold">{wk.title}</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="p-0 pt-3 space-y-4 text-sm text-zinc-300">
                          <p className="leading-relaxed text-zinc-400">{wk.description}</p>
                          
                          <div>
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-2">Targets & Skills:</span>
                            <div className="flex flex-wrap gap-2">
                              {wk.skills?.map((sk: string, j: number) => (
                                <Badge key={j} className="bg-white/5 border border-white/10 text-zinc-300 rounded-full px-3 py-1 font-mono text-[11px]">
                                  {sk}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 pt-2">
                            {/* Materials */}
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                Recommended Resources:
                              </span>
                              <ul className="space-y-1.5 text-xs text-zinc-400">
                                {wk.resources?.map((res: any, j: number) => (
                                  <li key={j} className="flex items-center gap-1">
                                    • <span className="text-zinc-300 font-medium">{res.name}</span> ({res.url})
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Practical task */}
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                                <Code className="w-3.5 h-3.5" />
                                Practical Sprint Build:
                              </span>
                              <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-2.5 rounded-xl border border-white/5">
                                {wk.project}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </TabsContent>              {/* TAB CONTENT 2: CAT vs GATE vs placement board */}
              <TabsContent value="matrix" className="focus-visible:ring-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Placements */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full px-2.5 py-0.5">
                          Track 1
                        </Badge>
                        <span className={`text-2xl font-extrabold font-mono ${getScoreColor(roadmap.competitiveMatrix?.placementScore)}`}>
                          {roadmap.competitiveMatrix?.placementScore}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-lg">Immediate Placements</h3>
                        <p className="text-xs text-zinc-500">Target software offers directly post-grad</p>
                      </div>

                      {/* Pros & Cons */}
                      <div className="space-y-3 pt-3">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase block mb-1.5">Pros:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.placementPros?.map((pro: string, idx: number) => (
                              <li key={idx}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase block mb-1.5">Cons:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.placementCons?.map((con: string, idx: number) => (
                              <li key={idx}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6 bg-white text-zinc-950 hover:bg-white/90 rounded-full text-xs font-semibold py-4">
                      Select Placement Strategy
                    </Button>
                  </Card>

                  {/* CAT */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full px-2.5 py-0.5">
                          Track 2
                        </Badge>
                        <span className={`text-2xl font-extrabold font-mono ${getScoreColor(roadmap.competitiveMatrix?.catScore)}`}>
                          {roadmap.competitiveMatrix?.catScore}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-lg">CAT MBA (Management)</h3>
                        <p className="text-xs text-zinc-500">Pivoting to business leadership roles</p>
                      </div>

                      {/* Pros & Cons */}
                      <div className="space-y-3 pt-3">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase block mb-1.5">Pros:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.catPros?.map((pro: string, idx: number) => (
                              <li key={idx}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase block mb-1.5">Cons:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.catCons?.map((con: string, idx: number) => (
                              <li key={idx}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6 border-white/10 hover:bg-white/5 rounded-full text-xs py-4">
                      Explore Management Path
                    </Button>
                  </Card>

                  {/* GATE */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full px-2.5 py-0.5">
                          Track 3
                        </Badge>
                        <span className={`text-2xl font-extrabold font-mono ${getScoreColor(roadmap.competitiveMatrix?.gateScore)}`}>
                          {roadmap.competitiveMatrix?.gateScore}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-lg">GATE M.Tech / PSUs</h3>
                        <p className="text-xs text-zinc-500">Pursuing higher research at top IITs</p>
                      </div>

                      {/* Pros & Cons */}
                      <div className="space-y-3 pt-3">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase block mb-1.5">Pros:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.gatePros?.map((pro: string, idx: number) => (
                              <li key={idx}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase block mb-1.5">Cons:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.gateCons?.map((con: string, idx: number) => (
                              <li key={idx}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6 border-white/10 hover:bg-white/5 rounded-full text-xs py-4">
                      Explore Higher Research Path
                    </Button>
                  </Card>

                  {/* UPSC Civil Services */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full px-2.5 py-0.5">
                          Track 4
                        </Badge>
                        <span className={`text-2xl font-extrabold font-mono ${getScoreColor(roadmap.competitiveMatrix?.upscScore)}`}>
                          {roadmap.competitiveMatrix?.upscScore}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-lg">UPSC Civil Services</h3>
                        <p className="text-xs text-zinc-500">Target administrative status & PSUs</p>
                      </div>

                      {/* Pros & Cons */}
                      <div className="space-y-3 pt-3">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase block mb-1.5">Pros:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.upscPros?.map((pro: string, idx: number) => (
                              <li key={idx}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase block mb-1.5">Cons:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.upscCons?.map((con: string, idx: number) => (
                              <li key={idx}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6 border-white/10 hover:bg-white/5 rounded-full text-xs py-4">
                      Explore Administrative Path
                    </Button>
                  </Card>

                  {/* MS Abroad */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full px-2.5 py-0.5">
                          Track 5
                        </Badge>
                        <span className={`text-2xl font-extrabold font-mono ${getScoreColor(roadmap.competitiveMatrix?.msScore)}`}>
                          {roadmap.competitiveMatrix?.msScore}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-white text-lg">MS Abroad (Global Tech)</h3>
                        <p className="text-xs text-zinc-500">Pursuing higher tech specialization globally</p>
                      </div>

                      {/* Pros & Cons */}
                      <div className="space-y-3 pt-3">
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase block mb-1.5">Pros:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.msPros?.map((pro: string, idx: number) => (
                              <li key={idx}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold tracking-wider text-rose-400 uppercase block mb-1.5">Cons:</span>
                          <ul className="text-xs text-zinc-400 space-y-1">
                            {roadmap.competitiveMatrix?.msCons?.map((con: string, idx: number) => (
                              <li key={idx}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6 border-white/10 hover:bg-white/5 rounded-full text-xs py-4">
                      Explore Global Tech Path
                    </Button>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl h-full min-h-[400px] flex items-center justify-center text-center">
            <CardContent className="p-10 space-y-4 max-w-md">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 animate-float">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Engine Unlocked</h3>
              <p className="text-zinc-400 text-sm">Input your target role and skills to compile customized upskilling roadmaps (SkillForge) and compare competitive exam tracks (GATE vs. CAT vs. Software offers).</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
