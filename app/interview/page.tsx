"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageSquare, Send, Loader2, Play, RotateCcw, Sparkles, Bot, Mic, MonitorPlay } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function InterviewPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [messages, setMessages] = useState<any[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [interviewComplete, setInterviewComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const roles = [
    "Software Developer (Product Startup)",
    "Systems Engineer (IT Services/WITCH)",
    "Data Analyst / BI Specialist",
    "Machine Learning & Fine-Tuning Engineer",
    "Product Manager",
    "DevOps & Kubernetes Administrator",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startInterview = async () => {
    if (!selectedRole) return

    setInterviewStarted(true)
    setIsLoading(true)

    try {
      const response = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      })

      if (!response.ok) throw new Error("Recruiting agent failed to launch.")
      const data = await response.json()

      setMessages([
        {
          type: "bot",
          content: data.question,
          timestamp: new Date(),
        },
      ])
    } catch (error) {
      console.error(error)
      alert("Encountered a problem initializing the mock interviewer session. Please try again.")
      setInterviewStarted(false)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async () => {
    if (!currentAnswer.trim()) return

    const userMessage = {
      type: "user",
      content: currentAnswer,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const savedAnswer = currentAnswer
    setCurrentAnswer("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/interview/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: selectedRole,
          answer: savedAnswer,
          questionNumber: currentQuestion + 1,
          conversationHistory: messages,
        }),
      })

      if (!response.ok) throw new Error("Hiring agent encountered an evaluation latency issue.")
      const data = await response.json()

      const botMessage = {
        type: "bot",
        content: data.response || "Interesting point.",
        feedback: data.feedback,
        nextQuestion: data.nextQuestion,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      if (data.isComplete) {
        setInterviewComplete(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
      }
    } catch (error) {
      console.error(error)
      alert("Hiring agent failed to capture the response. Please resubmit.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetInterview = () => {
    setInterviewStarted(false)
    setMessages([])
    setCurrentAnswer("")
    setCurrentQuestion(0)
    setInterviewComplete(false)
    setSelectedRole("")
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
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold tracking-tight text-white">ShadowInterview.sh</span>
            </div>
          </div>
          {interviewStarted && (
            <Button variant="outline" onClick={resetInterview} className="border-white/10 hover:bg-white/5 rounded-full text-xs">
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset Session
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {!interviewStarted ? (
          // Setup Screen
          <div className="space-y-10">
            <div className="text-center">
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
                INTERACTIVE VOICE & TEXT CANVAS
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">ShadowInterview.sh Simulator</h1>
              <p className="text-zinc-400 max-w-lg mx-auto">Immersive, full-screen audio-inspired mock meeting rounds designed to evaluate DSA, scale architecture, and behavioral parameters.</p>
            </div>

            <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden max-w-2xl mx-auto shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white">Configure Interview Parameters</CardTitle>
                <CardDescription className="text-zinc-500">Choose a highly specific target engineering role in India</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-zinc-300 rounded-xl py-6 focus:ring-purple-600">
                    <SelectValue placeholder="Choose target practice role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl">
                    {roles.map((role) => (
                      <SelectItem key={role} value={role} className="hover:bg-white/5 focus:bg-white/5">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-3">
                  <h4 className="font-bold text-sm text-purple-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Agentic Evaluation Framework:
                  </h4>
                  <ul className="text-xs text-zinc-400 space-y-2">
                    <li className="flex items-center gap-2">• <span className="text-zinc-300">5 Contextual Sprints:</span> Mix of deep technical and behavioral STAR parameters.</li>
                    <li className="flex items-center gap-2">• <span className="text-zinc-300">Blazing Groq Engine:</span> Instant feedback evaluation generated dynamically.</li>
                    <li className="flex items-center gap-2">• <span className="text-zinc-300">STAR Metrics:</span> Analyzes response quantitative impact and communication skill.</li>
                  </ul>
                </div>

                <Button onClick={startInterview} disabled={!selectedRole || isLoading} className="apple-btn-active w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-6 text-lg font-bold">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Warming Up Agent Engine...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 mr-2" />
                      Begin Interview Session
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Immersive Interview Canvas Screen
          <div className="space-y-6">
            {/* Session Indicator Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <div>
                  <h2 className="font-bold text-white text-base">{selectedRole} Session</h2>
                  <p className="text-xs text-zinc-500">Question {currentQuestion + 1} of 5</p>
                </div>
              </div>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-2.5 py-0.5 rounded-full">
                {interviewComplete ? "Evaluation Summary" : "Session Live"}
              </Badge>
            </div>

            {/* Immersive Meeting Dialogue Box */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl h-[500px] flex flex-col relative">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((message, i) => (
                    <div key={i} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-start gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${message.type === "user" ? "bg-purple-600 border-purple-500" : "bg-white/5 border-white/10"}`}>
                          {message.type === "user" ? <Mic className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-purple-400" />}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${message.type === "user" ? "bg-purple-600 text-white rounded-tr-none" : "bg-white/5 border border-white/5 text-zinc-300 rounded-tl-none shadow-md"}`}>
                          <p className="whitespace-pre-wrap font-medium">{message.content}</p>

                          {/* Inline Critique Display */}
                          {message.feedback && (
                            <div className="mt-4 pt-3 border-t border-white/5 text-xs text-emerald-300/90 space-y-1">
                              <span className="font-bold uppercase tracking-wider text-[10px] text-purple-400 block mb-1">Recruiter Evaluation:</span>
                              <p className="leading-relaxed bg-white/5 p-2 rounded-lg border border-white/5">{message.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3 max-w-[85%]">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Immersive Audio/Input Control Zone */}
              {!interviewComplete && (
                <div className="p-4 border-t border-white/5 bg-zinc-950/80">
                  <div className="flex items-end gap-3 bg-white/5 border border-white/10 rounded-2xl p-2.5">
                    <Textarea
                      placeholder="Type your structured answer here... (Highlight metrics/results)"
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-zinc-300 resize-none min-h-[50px] max-h-[120px] py-1 px-2 scrollbar-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.ctrlKey) {
                          submitAnswer()
                        }
                      }}
                    />
                    <Button 
                      onClick={submitAnswer} 
                      disabled={!currentAnswer.trim() || isLoading} 
                      className="apple-btn-active rounded-full bg-purple-600 hover:bg-purple-500 text-white shrink-0 p-3 w-10 h-10 flex items-center justify-center shadow-lg shadow-purple-500/20"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex justify-between items-center mt-2 px-1">
                    <span className="text-[10px] text-zinc-500">Press <kbd className="bg-zinc-900 border border-white/10 px-1.5 py-0.5 rounded text-[8px] font-mono">Ctrl+Enter</kbd> to submit response</span>
                    <button className="text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1">
                      <Mic className="w-3 h-3" />
                      Voice Input mode
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Final feedback overlay */}
            {interviewComplete && (
              <Card className="bg-zinc-900/40 backdrop-blur-md border border-purple-500/20 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
                <CardHeader className="pb-3 text-center sm:text-left">
                  <CardTitle className="text-2xl text-purple-400 flex items-center justify-center sm:justify-start gap-2">
                    <Sparkles className="w-6 h-6" />
                    Evaluation Concluded!
                  </CardTitle>
                  <CardDescription className="text-zinc-500">Outstanding job practicing. Review the feedback and roadmap recommendations below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <h4 className="font-bold text-sm text-white">Suggested Improvement Sprint:</h4>
                    <p className="text-xs text-zinc-400">Bridge your missing system design keywords, align with the STAR format structure, and proceed to the upskilling modules.</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Button onClick={resetInterview} className="w-full bg-purple-600 hover:bg-purple-500 rounded-full py-5 font-bold">
                      Begin Another Session
                    </Button>
                    <Link href="/roadmap" className="w-full">
                      <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-full py-5 text-sm font-semibold">
                        Launch SkillForge Roadmap
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
