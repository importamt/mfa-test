import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SimpleMFAProvider from '@/components/SimpleMFAProvider'
import type { ReactNode } from '@mfa/framework'
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
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        {/* Import Map 설정 */}
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                '@mfa/framework': '/shared/mfa-framework.js',
                '@mfa/framework/react': '/shared/mfa-framework.js',
                '@mfa/framework/react-dom': '/shared/mfa-framework.js',
                '@mfa/framework/react-query': '/shared/mfa-framework.js',
                '@mfa/framework/zustand': '/shared/mfa-framework.js',
                '@mfa/micro-app-1': '/apps/micro-app-1-v1.js',
                '@mfa/micro-app-2': '/apps/micro-app-2-v1.js',
                '@mfa/header-app': '/apps/header-v1.js',
                '@mfa/pip-app': '/apps/pip-v1.js'
              }
            }, null, 2)
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <SimpleMFAProvider>
          {children}
        </SimpleMFAProvider>
      </body>
    </html>
  )
}
