import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anushka Shirsath App',
  description: 'made by me ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
