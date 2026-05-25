"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Target, BookOpen, Briefcase, FileText, MessageSquare, TrendingUp, Sparkles, Send, Bot, User, Loader2, ArrowRight, Terminal, Wallet, Cpu, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const [messages, setMessages] = useState<{ role: "bot" | "user"; content: string }[]>([
    {
      role: "bot",
      content: "Namaste! I am your agentic Career Coach. Upload your resume in the Resume section, check out live market sentiments on Karma.ai, or ask me anything here. How can I help you navigate your career path today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const quickStats = [
    { label: "Profile Integrity", value: 85, icon: Sparkles, color: "text-purple-400" },
    { label: "ATS Pass Estimate", value: 72, icon: Target, color: "text-blue-400" },
    { label: "Hiring Openings Index", value: 92, icon: TrendingUp, color: "text-emerald-400" },
  ]

  const careerTools = [
    {
      title: "🛡️ ATS Ghost-Buster",
      description: "Audit resume layouts for invisible parsers, formats, and missing keywords.",
      link: "/resume",
      icon: FileText,
      color: "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:border-rose-500/40",
    },
    {
      title: "🎙️ ShadowInterview.sh",
      description: "Conduct immersive mock rounds with company-specific parameters.",
      link: "/interview",
      icon: MessageSquare,
      color: "bg-pink-500/10 text-pink-400 border-pink-500/20 hover:border-pink-500/40",
    },
    {
      title: "🔥 Deep-Mock Arena",
      description: "Face a senior technical lead under stressful timing and aggressive questions.",
      link: "/deep-mock",
      icon: ShieldAlert,
      color: "bg-red-500/10 text-red-400 border-red-500/20 hover:border-red-500/40",
    },
    {
      title: "🔮 Karma.ai Sentiments",
      description: "Simulate developersIndia Reddit / Twitter live market hiring temperatures.",
      link: "/karma",
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:border-purple-500/40",
    },
    {
      title: "🛠️ SkillForge Sprints",
      description: "Access Groq-guided week-by-week upskilling timelines and materials.",
      link: "/roadmap",
      icon: BookOpen,
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:border-amber-500/40",
    },
    {
      title: "💻 GitForge Scaffold",
      description: "Generate customized full-stack GitHub repo blueprints with automated checklists.",
      link: "/gitforge",
      icon: Cpu,
      color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-500/40",
    },
    {
      title: "💵 CTC Tax Optimizer",
      description: "Deconstruct Indian CTC packages and calculate New/Old regime tax slabs.",
      link: "/ctc",
      icon: Wallet,
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40",
    },
    {
      title: "📨 WarmReach Outreach",
      description: "Generate personalized networking pitches and DMs targeting company leads.",
      link: "/warmreach",
      icon: Send,
      color: "bg-sky-500/10 text-sky-400 border-sky-500/20 hover:border-sky-500/40",
    },
    {
      title: "🚀 Bench-Escape Pod",
      description: "A silent stealth-reskilling launcher to transition WITCH service engineers.",
      link: "/bench",
      icon: Terminal,
      color: "bg-orange-500/10 text-orange-400 border-orange-500/20 hover:border-orange-500/40",
    },
    {
      title: "🦄 IndieForge SaaS",
      description: "Bootstrap self-funded Micro-SaaS. Generate DB schemas, Razorpay routes & copies.",
      link: "/indieforge",
      icon: Brain,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20 hover:border-blue-500/40",
    },
    {
      title: "💼 Placements Matcher",
      description: "Review automated scorecards showing compatibility metrics for local jobs.",
      link: "/jobs",
      icon: Briefcase,
      color: "bg-teal-500/10 text-teal-400 border-teal-500/20 hover:border-teal-500/40",
    },
    {
      title: "🎯 Path Matrix",
      description: "Optimally balance and weigh your odds: UPSC vs. GATE vs. CAT vs. Placements.",
      link: "/roadmap",
      icon: Target,
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:border-cyan-500/40",
    },
  ]

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMsg = input
    setMessages((prev) => [...prev, { role: "user", content: userMsg }])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/interview/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "General Career Advisor",
          answer: userMsg,
          questionNumber: 1,
          conversationHistory: messages.map((m) => ({
            type: m.role === "bot" ? "bot" : "user",
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("Recruiting agent failed to respond.")
      const data = await response.json()
      
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.feedback || data.response || "I hear you. Let's work on bridging that gap." },
      ])
    } catch (e) {
      console.error(e)
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Apologies, the agentic engine encountered a lag. Could you repeat that?" },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30">
      {/* Header */}
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">CareerAI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 font-mono px-3 py-1">
              AGENT CORE V1.0
            </Badge>
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full border border-white/20"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-7xl">
        {/* Welcome Grid banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-purple-950/30 border border-white/5 mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome to your Command Center</h1>
            <p className="text-zinc-400">Unlock Groq-powered career roadmaps, real-time market oracle feeds, and ATS audits.</p>
          </div>
          <Link href="/roadmap">
            <Button className="apple-btn-active bg-purple-600 hover:bg-purple-500 text-white rounded-full px-6 py-5">
              Launch SkillForge
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Quick Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
                  <div className={`p-2 bg-white/5 rounded-lg border border-white/10 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-extrabold tracking-tight text-white">{stat.value}%</span>
                </div>
                <Progress value={stat.value} className="mt-4 bg-zinc-800" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Panel Split */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Career Tools */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Advanced Agentic Tools</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {careerTools.map((tool, idx) => (
                <Link href={tool.link} key={idx}>
                  <Card className={`group relative overflow-hidden backdrop-blur-md border transition-all duration-300 transform hover:scale-[1.01] cursor-pointer rounded-2xl ${tool.color}`}>
                    <CardHeader className="pb-2">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-2">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-zinc-400 text-sm leading-relaxed">{tool.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Interactive Floating Agent Column */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl h-[580px] flex flex-col overflow-hidden shadow-2xl relative">
              <div className="p-4 border-b border-white/5 bg-zinc-900/80 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center relative shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-pulse-ring">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Agentic Career Coach</h3>
                    <span className="text-[10px] text-emerald-400 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                      Groq Llama 3.3 Active
                    </span>
                  </div>
                </div>
              </div>

              {/* Chat Space */}
              <CardContent className="flex-1 p-4 overflow-hidden relative">
                <ScrollArea className="h-[380px] pr-3">
                  <div className="space-y-4">
                    {messages.map((message, i) => (
                      <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`flex items-start gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] shrink-0 ${message.role === "user" ? "bg-purple-600 border-purple-500" : "bg-white/5 border-white/10"}`}>
                            {message.role === "user" ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-purple-400" />}
                          </div>
                          <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${message.role === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-white/5 border border-white/5 text-zinc-300 rounded-tl-none"}`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="flex items-start gap-2 max-w-[85%]">
                          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                            <Bot className="w-3 h-3 text-purple-400" />
                          </div>
                          <div className="p-3 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input space */}
              <div className="p-4 border-t border-white/5 bg-zinc-950/80">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about placements, GATE, WITCH pivot..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-white/5 border-white/10 text-white rounded-full px-4 focus:ring-purple-600"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage()
                    }}
                  />
                  <Button onClick={handleSendMessage} disabled={!input.trim() || loading} className="rounded-full bg-purple-600 hover:bg-purple-500 text-white shrink-0 p-3 w-10 h-10 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
