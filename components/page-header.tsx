"use client"

import { Brain } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

interface PageHeaderProps {
  title: string
  icon: React.ElementType
  iconColor: string
  iconBgColor: string
}

export function PageHeader({ title, icon: Icon, iconColor, iconBgColor }: PageHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="dark:text-gray-300 dark:hover:bg-gray-700">
              ← Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className={`w-6 h-6 ${iconBgColor} rounded-lg flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white hidden sm:inline">CareerAI</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
