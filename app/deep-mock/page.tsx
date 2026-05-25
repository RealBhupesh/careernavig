"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles, Volume2, ShieldAlert, Zap, Clock, Send, RefreshCw, Loader2 } from "lucide-react"
import Link from "next/link"

export default function DeepMockPage() {
  const [topic, setTopic] = useState("Distributed Systems & Latency Slabs")
  const [messages, setMessages] = useState<{ role: "bot" | "user"; content: string }[]>([
    {
      role: "bot",
      content: "I am Ironclad Tech Lead. Vague textbook definitions don't work in my team. If you tell me you'll 'use Redis to make it fast', explain consistency, cache-invalidation under high-concurrency write-spikes, and split-brain resolution. Let's begin. Topic: Distributed Systems. How do you guarantee write linearizability in an active-active database partition split?",
    },
  ])
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)
  const [questionCount, setQuestionCount] = useState(1)
  const [critique, setCritique] = useState<any>(null)
  
  // High pressure ticking clock
  const [timer, setTimer] = useState(45)
  const [activeTimer, setActiveTimer] = useState(true)

  // Synthetic Audio Beep to raise the stakes
  const playStakesTone = (freq = 220, duration = 0.15) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      
      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
      
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration)
      
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      
      osc.start()
      osc.stop(audioCtx.currentTime + duration)
    } catch (e) {
      console.warn("AudioContext block", e)
    }
  }

  useEffect(() => {
    let interval: any
    if (activeTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 10) playStakesTone(440, 0.05) // Rapid ticks for final 10 seconds
          return prev - 1
        })
      }, 1000)
    } else if (timer === 0) {
      setActiveTimer(false)
    }
    return () => clearInterval(interval)
  }, [timer, activeTimer])

  const handleRespond = async () => {
    if (!answer.trim() || loading) return
    setLoading(true)
    setActiveTimer(false)

    // Play high stakes landing audio cue
    playStakesTone(550, 0.2)

    const currentAnswer = answer
    setMessages((prev) => [...prev, { role: "user", content: currentAnswer }])
    setAnswer("")

    try {
      const response = await fetch("/api/deep-mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          answer: currentAnswer,
          questionNumber: questionCount,
          conversationHistory: messages.map((m) => ({
            type: m.role === "bot" ? "bot" : "user",
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error("High pressure API failure.")
      const data = await response.json()
      
      setMessages((prev) => [...prev, { role: "bot", content: data.interviewerResponse }])
      setCritique(data)
      setQuestionCount((c) => c + 1)
      setTimer(45) // Reset timer
      setActiveTimer(true)
    } catch (err) {
      console.error(err)
      alert("Interviewer disconnected due to technical limits. Re-initializing...")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30 relative overflow-hidden">
      {/* Visual background glows */}
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
              <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
              <span className="text-xl font-bold tracking-tight text-white">Deep-Mock Arena</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
        <div className="mb-8 text-center sm:text-left">
          <Badge className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 py-1 mb-3 rounded-full font-mono uppercase tracking-wider">
            HIGH-PRESSURE INTERVIEW SIMULATOR
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">ShadowInterview.sh Arena</h1>
          <p className="text-zinc-400 text-sm">Face a senior, no-nonsense technical architect who interrupts rambling answers and audits engineering depth.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Interviewer Display & Arena */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
              {/* Animated Waveform */}
              <div className="absolute top-0 right-0 p-6 flex items-center gap-1 opacity-40">
                <Volume2 className="w-5 h-5 text-rose-400 animate-bounce" />
                <span className="w-1.5 h-6 bg-rose-400 rounded-full animate-[pulse_1.2s_infinite]"></span>
                <span className="w-1.5 h-4 bg-rose-400 rounded-full animate-[pulse_0.8s_infinite] delay-100"></span>
                <span className="w-1.5 h-8 bg-rose-400 rounded-full animate-[pulse_1.5s_infinite] delay-200"></span>
              </div>

              <CardHeader className="p-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center font-bold text-rose-400 font-mono">
                    IC
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold text-white">Ironclad Tech Lead</CardTitle>
                    <CardDescription className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Senior System Architect (CRED/Zerodha)</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                {/* Active Question Box */}
                <div className="p-4.5 rounded-2xl bg-zinc-950 border border-white/5 leading-relaxed text-sm text-zinc-300">
                  {messages[messages.length - 1]?.role === "bot" 
                    ? messages[messages.length - 1]?.content 
                    : "Interviewer is analyzing your response..."}
                </div>

                {/* Input Textarea */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Draft Your Core System Design Response</span>
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono font-bold bg-rose-500/5 px-2 py-0.5 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{timer}s</span>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Provide details about consensus logs, write buffers, local WALs, or vector metrics..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-rose-500 min-h-[120px] text-xs leading-relaxed"
                  />
                  
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-[10px] text-zinc-500 font-sans leading-tight">Vague hand-waving leads to instant negative points. Be precise.</span>
                    <Button
                      onClick={handleRespond}
                      disabled={loading || !answer.trim()}
                      className="apple-btn-active bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold px-6 py-4 text-xs flex items-center gap-1.5 shrink-0"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Evaluating...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Submit under Pressure
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Aggressive stress dashboard sidebar */}
          <div className="space-y-6">
            <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-rose-400" />
                  Live Stress & Critique Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-5">
                {critique ? (
                  <div className="space-y-5">
                    {/* Performance score */}
                    <div className="p-4 rounded-2xl bg-zinc-950 border border-white/5 text-center space-y-1">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Round Score</span>
                      <h2 className="text-4xl font-mono font-extrabold text-rose-400">{critique.score}%</h2>
                      <span className="text-[9px] text-zinc-600 font-sans tracking-wide block">Cutoff score: 80% to proceed to manager round</span>
                    </div>

                    {/* Brutal critique scroll */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Recruiter Audit Verdict</span>
                      <p className="text-xs text-rose-300 leading-relaxed bg-rose-500/5 p-3.5 rounded-2xl border border-rose-500/10 font-sans">
                        {critique.critique}
                      </p>
                    </div>

                    {/* Interactive stress sliders */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">Stress Indicators</span>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                          <span>Rambling Density:</span>
                          <span className="text-rose-400">{critique.stressMetrics?.ramblingPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full" style={{ width: `${critique.stressMetrics?.ramblingPercentage}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                          <span>Defensiveness:</span>
                          <span className="text-rose-400">{critique.stressMetrics?.defensiveness}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="bg-rose-500 h-full" style={{ width: `${critique.stressMetrics?.defensiveness}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                          <span>Technical Precision:</span>
                          <span className="text-emerald-400">{critique.stressMetrics?.technicalPrecision}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${critique.stressMetrics?.technicalPrecision}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-3">
                    <ShieldAlert className="w-8 h-8 text-rose-500/40 mx-auto" />
                    <p className="text-xs text-zinc-500">Submit your initial technical answer to unlock live stress metrics, round scorecard, and the brutal recruiter verdict panel.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
