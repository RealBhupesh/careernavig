"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, Loader2, CheckCircle, AlertCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/page-header"

export default function ResumePage() {
  const [resumeText, setResumeText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      return
    }

    setIsAnalyzing(true)

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      })

      if (!response.ok) {
        throw new Error(`Failed to analyze resume: ${response.statusText}`)
      }

      const result = await response.json()

      if (result.error) {
        throw new Error(result.error)
      }

      setAnalysis(result)
    } catch (error) {
      console.error("Resume analysis failed:", error)
      alert(`Resume analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400"
    if (score >= 60) return "text-orange-600 dark:text-orange-400"
    return "text-red-600 dark:text-red-400"
  }

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle
    if (score >= 60) return AlertCircle
    return XCircle
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Resume Optimizer"
        icon={FileText}
        iconColor="text-orange-600 dark:text-orange-400"
        iconBgColor="bg-orange-100 dark:bg-orange-900"
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resume Optimization</h1>
          <p className="text-gray-600 dark:text-gray-400">Get AI-powered feedback to make your resume stand out to employers</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Upload Your Resume</CardTitle>
                <CardDescription className="dark:text-gray-400">Paste your resume text or upload a file for comprehensive analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-orange-500 dark:hover:border-orange-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Drag and drop your resume or</p>
                  <Button variant="outline" size="sm">
                    Browse Files
                  </Button>
                </div>
                <div className="relative">
                  <Textarea
                    placeholder="Or paste your resume content here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[400px] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleAnalyze} disabled={isAnalyzing || !resumeText} className="w-full" size="lg">
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 mr-2" />
                  Analyze My Resume
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            {analysis ? (
              <div className="space-y-6">
                {/* Overall Score */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 dark:text-white">
                      <span>Overall Resume Score</span>
                      {(() => {
                        const ScoreIcon = getScoreIcon(analysis.overallScore)
                        return <ScoreIcon className={`w-5 h-5 ${getScoreColor(analysis.overallScore)}`} />
                      })()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-1">
                        <Progress value={analysis.overallScore} className="h-3" />
                      </div>
                      <span className={`text-2xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                        {analysis.overallScore}/100
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{analysis.summary}</p>
                  </CardContent>
                </Card>

                {/* Detailed Scores */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysis.categories?.map((category: any, index: number) => {
                      const ScoreIcon = getScoreIcon(category.score)
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <ScoreIcon className={`w-4 h-4 ${getScoreColor(category.score)}`} />
                              <span className="font-medium dark:text-white">{category.name}</span>
                            </div>
                            <span className={`font-semibold ${getScoreColor(category.score)}`}>
                              {category.score}/100
                            </span>
                          </div>
                          <Progress value={category.score} className="h-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">{category.feedback}</p>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Strengths */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-green-600 dark:text-green-400">Strengths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {analysis.strengths?.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm dark:text-gray-300">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Improvements */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-orange-600 dark:text-orange-400">Areas for Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysis.improvements?.map((improvement: any, index: number) => (
                        <li key={index} className="space-y-1">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium dark:text-white">{improvement.issue}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{improvement.suggestion}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Keywords */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Strong Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords?.strong?.map((keyword: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-600 dark:text-orange-400 mb-2">Missing Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysis.keywords?.missing?.map((keyword: string, index: number) => (
                            <Badge key={index} variant="outline" className="border-orange-300 dark:border-orange-600 text-orange-600 dark:text-orange-400">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Items */}
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start">Download Optimized Resume Template</Button>
                      <Link href="/jobs">
                        <Button variant="outline" className="w-full justify-start">
                          Find Matching Jobs
                        </Button>
                      </Link>
                      <Link href="/interview">
                        <Button variant="outline" className="w-full justify-start">
                          Practice Interview Questions
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ready for Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-400">Upload or paste your resume to get detailed optimization feedback</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
