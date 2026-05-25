import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CareerAI - Apple-Grade Agentic Career Navigator for India',
  description: 'Immersive, Groq-powered Agentic Career Coach. Decodes the Indian placement system (Tier-1/2/3), analyzes resumes with ATS Ghost-Busting technology, guides service-to-product transitions, and provides real-time industry sentiment analysis.',
  keywords: [
    'career guidance India', 
    'AI career advisor', 
    'developersIndia', 
    'ATS resume optimizer', 
    'WITCH to product transition', 
    'GATE CAT prep AI', 
    'Groq AI coach', 
    'salary negotiator India'
  ],
  authors: [{ name: 'CareerAI Team' }],
  openGraph: {
    title: 'CareerAI - Agentic Career Navigation Platform',
    description: 'Ultra-fast Groq-powered career agent for Indian graduates and tech professionals.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerAI - Agentic Career Navigation',
    description: 'Immersive Groq-powered career agent for Indian graduates and tech professionals.',
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
