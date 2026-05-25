"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles, Terminal, Copy, Check, Calendar, Code, Share2, Loader2 } from "lucide-react"
import Link from "next/link"

export default function IndieForgePage() {
  const [concept, setConcept] = useState("")
  const [techStack, setTechStack] = useState("Next.js + Tailwind + Prisma")
  const [loading, setLoading] = useState(false)
  const [saasData, setSaasData] = useState<any>(null)
  
  const [copiedType, setCopiedType] = useState<string | null>(null)

  const handleGenerateBlueprint = async () => {
    if (!concept.trim()) return
    setLoading(true)

    try {
      const response = await fetch("/api/indieforge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, techStack }),
      })

      if (!response.ok) throw new Error("SaaS Blueprint generation failed.")
      const data = await response.json()
      setSaasData(data)
    } catch (err) {
      console.error(err)
      alert("Encountered an issue running IndieForge blueprint simulator.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => setCopiedType(null), 2000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30 relative overflow-hidden">
      {/* Glow decorators */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] gradient-glow-blue rounded-full pointer-events-none opacity-20"></div>

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
              <span className="text-xl font-bold tracking-tight text-white">IndieForge</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
            MICRO-SAAS BOOTSTRAPPING ENGINE
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">IndieForge Micro-SaaS Creator</h1>
          <p className="text-zinc-400">Bootstrap self-funded SaaS applications. Generate database schemas, Razorpay routes, and Build-In-Public social calendar drafts.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Controls Card */}
          <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Product Concept</label>
              <Input
                placeholder="E.g. Invoice tracker for local freelancers"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
            <div className="space-y-2 font-sans">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Preferred Tech Stack</label>
              <Input
                placeholder="E.g. Next.js + Postgres + Prisma"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600 font-mono text-xs"
              />
            </div>

            <Button 
              onClick={handleGenerateBlueprint} 
              disabled={loading || !concept.trim()} 
              className="apple-btn-active w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-5 text-sm font-bold shadow-lg shadow-purple-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Forging SaaS Blueprint...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Indie Bootstrap Kit
                </>
              )}
            </Button>
          </Card>

          {/* Results Grid */}
          <div className="lg:col-span-2 space-y-8">
            {saasData ? (
              <div className="space-y-8">
                {/* Product Title */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                  <Badge variant="outline" className="border-purple-500/20 text-purple-400 bg-purple-500/5 rounded-full px-2.5 py-0.5 mb-2 font-mono text-[10px]">
                    SAAS ID
                  </Badge>
                  <h3 className="text-2xl text-white font-extrabold">{saasData.productTitle} Launch Kit</h3>
                </Card>

                {/* Databases and Slices Code Snippets */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Prisma Schema */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center pb-3">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1.5">
                          <Code className="w-4 h-4 text-purple-400" /> Database Schema (Prisma)
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(saasData.databaseSchema, "schema")}
                          className="text-zinc-400 hover:text-white rounded-full px-2"
                        >
                          {copiedType === "schema" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </Button>
                      </div>
                      <pre className="text-zinc-300 text-[10px] font-mono leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-white/5 overflow-x-auto whitespace-pre-wrap">
                        {saasData.databaseSchema}
                      </pre>
                    </div>
                  </Card>

                  {/* Razorpay Integration */}
                  <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center pb-3">
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block flex items-center gap-1.5">
                          <Code className="w-4 h-4 text-emerald-400" /> Razorpay Integration Hook
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(saasData.razorpaySnippet, "razorpay")}
                          className="text-zinc-400 hover:text-white rounded-full px-2"
                        >
                          {copiedType === "razorpay" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </Button>
                      </div>
                      <pre className="text-zinc-300 text-[10px] font-mono leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-white/5 overflow-x-auto whitespace-pre-wrap">
                        {saasData.razorpaySnippet}
                      </pre>
                    </div>
                  </Card>
                </div>

                {/* Day by Day Bootstrapping timeline */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      Day-by-Day Bootstrap Sprints
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 space-y-3">
                    {saasData.launchTimeline?.map((item: any, i: number) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-2xl bg-zinc-950 border border-white/5">
                        <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/5 border border-purple-500/10 px-2 py-0.5 rounded-md shrink-0">{item.day}</span>
                        <p className="text-xs text-zinc-400 leading-normal">{item.task}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Build in Public Twitter launches */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                  <CardHeader className="p-0 pb-4">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-purple-400" />
                      Build-In-Public Twitter Launch Drafts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 space-y-4">
                    {saasData.buildInPublicPosts?.map((post: string, i: number) => (
                      <div key={i} className="p-4 rounded-2xl bg-zinc-950 border border-white/5 relative hover:border-white/10 transition-colors">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => copyToClipboard(post, `post-${i}`)}
                          className="absolute top-2 right-2 text-zinc-400 hover:text-white rounded-full px-2"
                        >
                          {copiedType === `post-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </Button>
                        <p className="text-zinc-300 text-xs leading-relaxed pr-8 whitespace-pre-wrap">
                          {post}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl min-h-[350px] flex items-center justify-center text-center">
                <CardContent className="p-10 space-y-4 max-w-md">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 animate-float">
                    <Terminal className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">IndieForge Launcher Standby</h3>
                  <p className="text-zinc-400 text-sm">Provide your product concept and preferred database/code infrastructure stack to automatically compile operational bootstrap blueprints, payment adapters, and social post copies.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
