import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TVING MFA Platform',
  description: 'Next.js + Micro Frontend Architecture with Import Maps',
  keywords: ['micro frontend', 'MFA', 'React', 'Next.js', 'TVING'],
  authors: [{ name: 'MFA Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Import Map은 MfaRemoteLoader에서 동적으로 주입 */}
      </head>
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}