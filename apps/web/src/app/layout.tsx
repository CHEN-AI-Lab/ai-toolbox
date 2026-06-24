import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Toolbox',
  description: 'Your All-in-One AI Assistant',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
