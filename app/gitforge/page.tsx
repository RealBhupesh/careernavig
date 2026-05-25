"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Sparkles, Folder, File, CheckSquare, Layers, Cpu, Loader2 } from "lucide-react"
import Link from "next/link"

export default function GitForgePage() {
  const [role, setRole] = useState("")
  const [skills, setSkills] = useState("")
  const [loading, setLoading] = useState(false)
  const [projectData, setProjectData] = useState<any>(null)

  const handleGenerateProject = async () => {
    if (!role.trim()) return
    setLoading(true)

    try {
      const response = await fetch("/api/gitforge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, skills }),
      })

      if (!response.ok) throw new Error("Failed to compile project template.")
      const data = await response.json()
      setProjectData(data)
    } catch (err) {
      console.error(err)
      alert("Encountered an issue compiling your custom project outline. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30 relative overflow-hidden">
      {/* Background glow decorator */}
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
              <Cpu className="w-5 h-5 text-purple-400" />
              <span className="text-xl font-bold tracking-tight text-white">GitForge</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
        <div className="mb-10 text-center sm:text-left">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/5 px-3 py-1 mb-3 rounded-full">
            RESUME-TO-GITHUB BOILERPLATE BUILDER
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">GitForge Project Scaffolder</h1>
          <p className="text-zinc-400">Scaffold modern, customized repositories tailored to outshine Tier-1 grads in off-campus interviews.</p>
        </div>

        {/* Inputs */}
        <Card className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 mb-10 shadow-xl max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Aspiration Role</label>
              <Input
                placeholder="E.g. Full-Stack Developer, AI Lead"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Current Skills</label>
              <Input
                placeholder="E.g. JavaScript, CSS, HTML5"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="bg-white/5 border-white/10 text-white rounded-xl focus:ring-purple-600"
              />
            </div>
          </div>
          <Button 
            onClick={handleGenerateProject} 
            disabled={loading || !role.trim()} 
            className="apple-btn-active w-full bg-purple-600 hover:bg-purple-500 text-white rounded-full py-5 text-sm font-bold mt-6 shadow-lg shadow-purple-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Scaffolding Custom Repo...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Forge Project & Repository Blueprint
              </>
            )}
          </Button>
        </Card>

        {projectData ? (
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Core Project Info */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                <CardHeader className="p-0 pb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {projectData.techStack?.map((tech: string, i: number) => (
                      <Badge key={i} className="bg-white/5 border border-white/10 text-purple-400 rounded-full font-mono text-[11px]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl text-white font-extrabold">{projectData.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pt-2 space-y-4">
                  <p className="text-zinc-400 leading-relaxed text-sm">{projectData.description}</p>
                  
                  <div className="pt-4 border-t border-white/5">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-purple-400" />
                      System Architecture Flow:
                    </span>
                    <p className="text-zinc-300 text-xs bg-zinc-950 p-4 rounded-2xl border border-white/5 leading-relaxed">
                      {projectData.systemArchitecture}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Build In Public Issues */}
              <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                <CardHeader className="p-0 pb-4">
                  <CardTitle className="text-lg text-white font-extrabold flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                    Build-In-Public Issue Board
                  </CardTitle>
                  <CardDescription className="text-zinc-500 text-xs">Complete these issues on GitHub to showcase active developer building.</CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                  {projectData.issues?.map((issue: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-950 border border-white/5 hover:border-emerald-500/20 transition-all">
                      <input 
                        type="checkbox" 
                        className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-purple-600 focus:ring-purple-600" 
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-md">{issue.id}</span>
                          <h4 className="text-sm font-bold text-white">{issue.title}</h4>
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">{issue.details}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Folder Explorer Sidebar */}
            <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-lg text-white font-extrabold flex items-center gap-2">
                  <Folder className="w-5 h-5 text-purple-400" />
                  Repository Folder Tree
                </CardTitle>
                <CardDescription className="text-zinc-500 text-xs">Verify your local scaffold hierarchy.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-400 p-2 rounded-xl bg-white/5 border border-white/5">
                  <Folder className="w-4 h-4 text-purple-400 fill-purple-400/20" />
                  <span>/ (Root Workspace)</span>
                </div>
                <div className="pl-4 space-y-2 border-l border-white/10 ml-4">
                  {projectData.folderTree?.map((node: any, i: number) => (
                    <div key={i} className="flex flex-col gap-1 hover:bg-white/5 p-2 rounded-xl transition-colors">
                      <div className="flex items-center gap-2 text-zinc-300">
                        {node.path.includes(".") ? (
                          <File className="w-3.5 h-3.5 text-blue-400" />
                        ) : (
                          <Folder className="w-3.5 h-3.5 text-purple-400 fill-purple-400/20" />
                        )}
                        <span className="font-semibold text-white">{node.path}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 pl-5 leading-normal">{node.purpose}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="bg-zinc-900/40 border border-white/5 rounded-3xl min-h-[350px] flex items-center justify-center text-center">
            <CardContent className="p-10 space-y-4 max-w-md">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-purple-400 animate-float">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Scaffolder Engine Available</h3>
              <p className="text-zinc-400 text-sm">Provide your target career aspiration role and baseline skills to generate modular full-stack GitHub repo blueprints with automated issue tracking checklists.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
