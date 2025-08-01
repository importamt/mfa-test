import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MFAProvider from '@/components/MFAProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Enterprise MFA Platform',
  description: 'Next.js + Micro Frontend Architecture',
  keywords: ['micro frontend', 'MFA', 'React', 'Next.js', 'enterprise'],
  authors: [{ name: 'Enterprise Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Enterprise MFA Platform',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Enterprise MFA Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@enterprise_mfa'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // fetch remotes ... 

  // 

  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <MFAProvider>
          {children}
        </MFAProvider>
      </body>
    </html>
  )
}
