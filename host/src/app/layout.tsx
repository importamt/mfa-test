import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MFAProvider from '@/components/MFAProvider'
import { fetchMFAConfig } from '@/lib/mfa-config-fetcher'
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 서버 사이드에서 MFA 설정 가져오기
  const mfaConfig = await fetchMFAConfig()

  return (
    <html lang="ko">
      <head>
        {/* Import Map을 서버에서 렌더링 */}
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: mfaConfig.importMap
            }, null, 2)
          }}
        />
        {/* MFA 설정을 window 객체에 주입 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.MFA_CONFIG = {
                importMap: ${JSON.stringify(mfaConfig.importMap)},
                routingTable: ${JSON.stringify(mfaConfig.routingTable)},
                persistentApps: ${JSON.stringify(mfaConfig.persistentApps)},
                environment: '${process.env.NODE_ENV}',
                version: '1.0.0',
                currentRoute: '/',
                ssrData: {}
              };
              console.log('📋 MFA_CONFIG loaded:', window.MFA_CONFIG);
            `
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <MFAProvider>
          {children}
        </MFAProvider>
      </body>
    </html>
  )
}
