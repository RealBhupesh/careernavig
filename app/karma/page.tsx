"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, Sparkles, AlertTriangle, ShieldCheck, HelpCircle, MessageCircle, ExternalLink, Loader2 } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function KarmaPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchKarma() {
      try {
        const res = await fetch("/api/karma")
        if (!res.ok) throw new Error("Failed to load sentiment.")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchKarma()
  }, [])

  const getTemperatureColor = (temp: number) => {
    if (temp >= 80) return "text-emerald-400"
    if (temp >= 60) return "text-amber-400"
    return "text-rose-400"
  }

  const getTemperatureBg = (temp: number) => {
    if (temp >= 80) return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
    if (temp >= 60) return "bg-amber-500/10 border-amber-500/20 text-amber-400"
    return "bg-rose-500/10 border-rose-500/20 text-rose-400"
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
              <TrendingUp className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-xl font-bold tracking-tight text-white">Karma.ai</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
            REAL-TIME INDIAN CAREER SENTIMENT ORACLE
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Karma.ai Sentiment Board</h1>
          <p className="text-zinc-400 font-medium">Aggregates simulated crowd sentiments across r/developersIndia, Twitter, and news platforms to index current hiring indices.</p>
        </div>

        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-purple-500 mx-auto" />
              <p className="text-zinc-400 text-sm font-mono">RETRIEVING INDIAN MARKET ORACLE SEED...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-float">
            {/* Summary Widget */}
            <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden shadow-xl">
              <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-bold text-white">State of the Market Oracle</h2>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{data?.marketSummary}</p>
                </div>
                
                {/* Temperature Meter */}
                <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl w-36 h-36 shrink-0 shadow-inner">
                  <span className={`text-4xl font-extrabold tracking-tight ${getTemperatureColor(data?.overallTemperature)}`}>
                    {data?.overallTemperature}°
                  </span>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-2">Hiring Index</span>
                </div>
              </CardContent>
            </Card>

            {/* Sectors Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.sectors?.map((sec: any, i: number) => (
                <Card key={i} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-sm">{sec.name}</h3>
                    <Badge className={getTemperatureBg(sec.temperature)}>
                      {sec.temperature}°
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">{sec.sentiment}</p>
                </Card>
              ))}
            </div>

            {/* Trending tags / hottest skills */}
            <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg font-bold">Hottest Tech Skills in India</CardTitle>
                <CardDescription className="text-zinc-500">Currently seeing maximum off-campus and placement demand</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2.5">
                {data?.hottestSkills?.map((skill: string, i: number) => (
                  <Badge key={i} className="bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full font-mono text-xs px-3.5 py-1.5 hover:bg-purple-500/20 transition-colors">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {/* Hot Discussions Feed */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <span>Simulated Ground Discussions</span>
              </h2>

              <div className="grid gap-6">
                {data?.hotDiscussions?.map((post: any, i: number) => (
                  <Card key={i} className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden p-6 hover:bg-zinc-900/60 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 font-mono px-2 py-0.5 rounded-full text-[10px]">
                          {post.source}
                        </Badge>
                        <h3 className="font-bold text-white text-base leading-tight hover:text-purple-300 cursor-pointer flex items-center gap-1">
                          {post.title}
                          <ExternalLink className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                        </h3>
                      </div>
                      <Badge className={post.sentiment === "Critical" ? "bg-rose-500/15 border border-rose-500/35 text-rose-400 rounded-full" : "bg-zinc-800 text-zinc-300 rounded-full"}>
                        {post.sentiment}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-12 gap-4 text-sm">
                      <div className="md:col-span-12 space-y-2">
                        <h4 className="font-bold text-purple-400 flex items-center gap-1.5 text-xs tracking-wider uppercase">
                          <ShieldCheck className="w-4 h-4" />
                          Expert Advisor Response:
                        </h4>
                        <p className="text-zinc-300 bg-white/5 p-4 rounded-2xl border border-white/5 leading-relaxed">
                          {post.advice}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
