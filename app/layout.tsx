import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'CareerAI - Navigate Your Career with AI',
  description: 'AI-powered career navigation platform. Get personalized career paths, skill analysis, resume optimization, mock interviews, and job matching.',
  keywords: ['career guidance', 'AI career advisor', 'resume optimizer', 'job matching', 'skill analysis', 'mock interview'],
  authors: [{ name: 'CareerAI Team' }],
  openGraph: {
    title: 'CareerAI - Navigate Your Career with AI',
    description: 'AI-powered career navigation platform for students and graduates',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerAI - Navigate Your Career with AI',
    description: 'AI-powered career navigation platform for students and graduates',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
