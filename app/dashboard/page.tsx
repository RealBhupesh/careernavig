"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, BookOpen, Briefcase, FileText, MessageSquare, TrendingUp, Users, Award } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const quickStats = [
    { label: "Profile Completion", value: 75, icon: Users },
    { label: "Skill Match Rate", value: 82, icon: TrendingUp },
    { label: "Certifications", value: 3, icon: Award },
  ]

  const recentActivity = [
    { action: "Completed skill analysis", time: "2 hours ago", type: "analysis" },
    { action: "Applied to Software Developer role", time: "1 day ago", type: "application" },
    { action: "Completed React course", time: "3 days ago", type: "learning" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">CareerAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Badge variant="secondary">Free Plan</Badge>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, Alex!</h1>
          <p className="text-gray-600 dark:text-gray-400">{"Let's continue building your career path"}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {typeof stat.value === "number" && stat.label.includes("Rate") ? `${stat.value}%` : stat.value}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                {typeof stat.value === "number" && stat.value <= 100 && (
                  <Progress value={stat.value} className="mt-2" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Features */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Career Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/profile">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2">
                      <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="dark:text-white">Skill Analysis</CardTitle>
                    <CardDescription className="dark:text-gray-400">Analyze your resume and skills with AI-powered insights</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/careers">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-2">
                      <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="dark:text-white">Career Paths</CardTitle>
                    <CardDescription className="dark:text-gray-400">Discover personalized career recommendations</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/jobs">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-2">
                      <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="dark:text-white">Job Matching</CardTitle>
                    <CardDescription className="dark:text-gray-400">Find jobs with AI-calculated match percentages</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/resume">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-2">
                      <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <CardTitle className="dark:text-white">Resume Optimizer</CardTitle>
                    <CardDescription className="dark:text-gray-400">Get AI-powered feedback to improve your resume</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/interview">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-2">
                      <MessageSquare className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <CardTitle className="dark:text-white">Mock Interview</CardTitle>
                    <CardDescription className="dark:text-gray-400">Practice interviews with our AI chatbot</CardDescription>
                  </CardHeader>
                </Card>
              </Link>

              <Link href="/resources">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition-transform">
                  <CardHeader>
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-2">
                      <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <CardTitle className="dark:text-white">Learning Resources</CardTitle>
                    <CardDescription className="dark:text-gray-400">Personalized upskilling recommendations</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/profile">
                    <Button variant="outline" className="w-full justify-start">
                      Complete skill assessment
                    </Button>
                  </Link>
                  <Link href="/resume">
                    <Button variant="outline" className="w-full justify-start">
                      Update resume
                    </Button>
                  </Link>
                  <Link href="/interview">
                    <Button variant="outline" className="w-full justify-start">
                      Practice interview
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
