"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles, Send, Copy, Mail, MessageSquare, Linkedin, Loader2, Check } from "lucide-react"
import Link from "next/link"

export default function WarmReachPage() {
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [recruiterProfile, setRecruiterProfile] = useState("")
  const [userBackground, setUserBackground] = useState("")
  const [loading, setLoading] = useState(false)
  const [reachData, setReachData] = useState<any>(null)
  
  // Track copy state
  const [copiedType, setCopiedType] = useState<string | null>(null)

  const handleGeneratePitch = async () => {
    if (!company.trim() || !role.trim()) return
    setLoading(true)

    try {
      const response = await fetch("/api/warmreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, role, recruiterProfile, userBackground }),
      })

      if (!response.ok) throw new Error("Pitch compilation failed.")
      const data = await response.json()
      setReachData(data)
    } catch (err) {
      console.error(err)
      alert("Encountered an issue drafting your personalized pitches.")
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
      {/* Background glow decorator */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] gradient-glow-blue rounded-full pointer-events-none opacity-20"></div>

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
              <Send className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold tracking-tight text-white">WarmReach</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
            NETWORKING & REFERRAL ACCELERATOR
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">ColdReach.ai Outreach Generator</h1>
          <p className="text-zinc-400">Generate high-conversion, value-first pitches for recruiters and engineering leads at top domestic firms.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Form Card */}
          <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Target Company</label>
              <Input
                placeholder="E.g. CRED, Razorpay"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Target Job Role</label>
              <Input
                placeholder="E.g. Frontend Engineer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Recruiter Profile Highlights</label>
              <Input
                placeholder="E.g. loves open-source, posts on DB scale"
                value={recruiterProfile}
                onChange={(e) => setRecruiterProfile(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
            <div className="space-y-2 font-sans">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">Your Relevant Skills / Background</label>
              <Textarea
                placeholder="E.g. React developer with 1 year experience, built open source UI library"
                value={userBackground}
                onChange={(e) => setUserBackground(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600 min-h-[100px] text-xs leading-relaxed"
              />
            </div>

            <Button 
              onClick={handleGeneratePitch} 
              disabled={loading || !company.trim() || !role.trim()} 
              className="apple-btn-active w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-5 text-sm font-bold shadow-lg shadow-purple-500/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Drafting Outreaches...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Value-First Pitches
                </>
              )}
            </Button>
          </Card>

          {/* Results Grid */}
          <div className="lg:col-span-2 space-y-8">
            {reachData ? (
              <div className="space-y-8">
                {/* 1. LinkedIn Note */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 font-mono font-extrabold text-5xl text-white/5 pointer-events-none uppercase">
                    LINKEDIN
                  </div>
                  <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-purple-400" />
                      LinkedIn Note (Max 300 Chars)
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(reachData.linkedinNote, "linkedin")}
                      className="text-zinc-400 hover:text-white rounded-full px-3"
                    >
                      {copiedType === "linkedin" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-zinc-300 text-xs leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-white/5">
                      {reachData.linkedinNote}
                    </p>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-wider mt-2 block text-right">
                      Length: {reachData.linkedinNote?.length} / 300 characters
                    </span>
                  </CardContent>
                </Card>

                {/* 2. Cold Email */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 font-mono font-extrabold text-5xl text-white/5 pointer-events-none uppercase">
                    EMAIL
                  </div>
                  <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-400" />
                      Formal Cold Email
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(`${reachData.coldEmail?.subject}\n\n${reachData.coldEmail?.body}`, "email")}
                      className="text-zinc-400 hover:text-white rounded-full px-3"
                    >
                      {copiedType === "email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0 space-y-3">
                    <div className="p-3 bg-zinc-950 border border-white/5 rounded-xl font-mono text-xs">
                      <span className="text-zinc-500 font-bold">Subject:</span> <span className="text-white font-bold">{reachData.coldEmail?.subject}</span>
                    </div>
                    <p className="text-zinc-300 text-xs leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-white/5 whitespace-pre-line">
                      {reachData.coldEmail?.body}
                    </p>
                  </CardContent>
                </Card>

                {/* 3. Informal DM */}
                <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 font-mono font-extrabold text-5xl text-white/5 pointer-events-none uppercase">
                    TWITTER/SLACK
                  </div>
                  <CardHeader className="p-0 pb-3 flex flex-row justify-between items-center">
                    <CardTitle className="text-base text-white font-extrabold flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                      Casual Chat DM (Twitter/Discord/Slack)
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyToClipboard(reachData.informalDM, "dm")}
                      className="text-zinc-400 hover:text-white rounded-full px-3"
                    >
                      {copiedType === "dm" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-zinc-300 text-xs leading-relaxed bg-zinc-950 p-4 rounded-2xl border border-white/5">
                      {reachData.informalDM}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl min-h-[350px] flex items-center justify-center text-center">
                <CardContent className="p-10 space-y-4 max-w-md">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 animate-float">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">ColdReach Pitch System Available</h3>
                  <p className="text-zinc-400 text-sm">Provide target coordinates (Company, Role, Recruiter Highlights, and your Skills) to generate high-context networking pitches that hook managers instantly.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
