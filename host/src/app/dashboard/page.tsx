'use client'

import { useEffect, useState } from '@mfa/framework'

export default function DashboardPage() {
  const [mfaReady, setMfaReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // MFA 시스템 로드 확인
    const checkMFA = async () => {
      try {
        // Framework 로드 대기
        let attempts = 0
        while (!window.MfaFramework && attempts < 20) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }

        if (window.MfaFramework) {
          console.log('✅ MFA Framework 로드 완료:', window.MfaFramework)
          setMfaReady(true)
          
          // micro-app-2 로드
          const MicroFrontendHost = window.MicroFrontendHost
          if (MicroFrontendHost) {
            const host = new MicroFrontendHost()
            await host.loadApp('@mfa/micro-app-2')
            await host.mountApp('@mfa/micro-app-2', 'mfa-container')
          }
        } else {
          setError('MFA Framework 로드 실패')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류')
      }
    }

    checkMFA()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!mfaReady && !error && (
        <div className="text-gray-600">MFA 시스템 로딩 중...</div>
      )}
      
      {mfaReady && (
        <div>
          <p className="text-green-600 mb-4">✅ MFA 시스템 준비 완료</p>
          <div id="mfa-container" className="border-2 border-dashed border-gray-300 p-4 min-h-[200px]">
            {/* 여기에 micro-app-2가 마운트됩니다 */}
          </div>
        </div>
      )}
    </div>
  )
}