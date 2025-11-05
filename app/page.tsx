"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Target, BookOpen, Briefcase, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Skill Analysis",
      description: "Advanced NLP analysis of your resume and skills to identify strengths and opportunities",
    },
    {
      icon: Target,
      title: "Personalized Career Paths",
      description: "Get tailored career suggestions based on your unique profile and market demands",
    },
    {
      icon: BookOpen,
      title: "Smart Upskilling",
      description: "Curated learning resources from top platforms to bridge your skill gaps",
    },
    {
      icon: Briefcase,
      title: "Job Match Intelligence",
      description: "Find jobs with AI-calculated match percentages based on your qualifications",
    },
    {
      icon: FileText,
      title: "Resume Optimization",
      description: "Get actionable feedback to make your resume stand out to employers",
    },
    {
      icon: MessageSquare,
      title: "Mock Interview Bot",
      description: "Practice with our AI interviewer for technical and behavioral questions",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">CareerAI</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Career Navigation
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Navigate Your Career with
            <span className="text-blue-600 dark:text-blue-400"> Artificial Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Align your skills with market demands, discover personalized career paths, and accelerate your professional
            growth with our comprehensive AI platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need for Career Success</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive platform combines AI intelligence with practical tools to guide your career journey from
              analysis to achievement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-700">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed dark:text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8">
            Join thousands of students and graduates who have successfully navigated their career paths with CareerAI.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CareerAI</span>
          </div>
          <p className="text-gray-400 dark:text-gray-500">Empowering careers through artificial intelligence</p>
        </div>
      </footer>
    </div>
  )
}
