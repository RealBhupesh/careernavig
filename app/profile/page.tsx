"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Brain, Loader2 } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"

export default function ProfilePage() {
  const [resumeText, setResumeText] = useState("")
  const [skills, setSkills] = useState("")
  const [interests, setInterests] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, skills, interests }),
      })

      if (!response.ok) {
        throw new Error(`Failed to analyze profile: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setAnalysis(result)
    } catch (error) {
      console.error("Analysis failed:", error)
      alert(`Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Skill Analysis"
        icon={Brain}
        iconColor="text-blue-600 dark:text-blue-400"
        iconBgColor="bg-blue-100 dark:bg-blue-900"
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Analysis</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your resume and provide information about your skills and interests for AI-powered analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Resume Upload</CardTitle>
                <CardDescription className="dark:text-gray-400">Paste your resume text or upload a file for analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Drag and drop your resume or</p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
                <div className="relative">
                  <Label htmlFor="resume-text" className="dark:text-gray-300">Or paste resume text</Label>
                  <Textarea
                    id="resume-text"
                    placeholder="Paste your resume content here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[200px] mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Skills & Interests</CardTitle>
                <CardDescription className="dark:text-gray-400">Tell us about your technical skills and career interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="skills" className="dark:text-gray-300">Technical Skills</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., JavaScript, Python, React, Data Analysis..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="interests" className="dark:text-gray-300">Career Interests</Label>
                  <Textarea
                    id="interests"
                    placeholder="Describe your career interests, preferred work environment, and goals..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleAnalyze} disabled={isAnalyzing || !resumeText} className="w-full" size="lg">
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Profile...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze My Profile
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            {analysis ? (
              <div className="space-y-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-green-600 dark:text-green-400">Analysis Complete</CardTitle>
                    <CardDescription className="dark:text-gray-400">Here are your personalized insights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 dark:text-white">Key Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.strengths?.map((strength: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 dark:text-white">Areas for Improvement</h4>
                      <div className="space-y-2">
                        {analysis.improvements?.map((improvement: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm dark:text-gray-300">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 dark:text-white">Career Match Score</h4>
                      <div className="space-y-3">
                        {analysis.careerMatches?.map((match: any, index: number) => (
                          <div key={index}>
                            <div className="flex justify-between text-sm mb-1 dark:text-gray-300">
                              <span>{match.role}</span>
                              <span className="font-medium">{match.score}%</span>
                            </div>
                            <Progress value={match.score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Link href="/careers">
                        <Button variant="outline" className="w-full justify-start">
                          Explore Career Paths
                        </Button>
                      </Link>
                      <Link href="/resources">
                        <Button variant="outline" className="w-full justify-start">
                          Find Learning Resources
                        </Button>
                      </Link>
                      <Link href="/jobs">
                        <Button variant="outline" className="w-full justify-start">
                          Browse Matching Jobs
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready for Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill in your information and click analyze to get personalized insights
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
