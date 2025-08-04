'use client'

import { useEffect, useState } from '@mfa/framework'

export default function TestPage() {
  const [status, setStatus] = useState<Record<string, any>>({})

  useEffect(() => {
    // 프레임워크 로드 상태 확인
    const checkStatus = () => {
      setStatus({
        framework: !!window.MfaFramework,
        react: !!window.React,
        reactVersion: window.React?.version,
        reactQuery: !!window.ReactQuery,
        zustand: !!window.Zustand,
        microFrontendHost: !!window.MicroFrontendHost,
        importMap: !!document.querySelector('script[type="importmap"]'),
        config: !!window.MFA_CONFIG
      })
    }

    // 초기 체크
    checkStatus()

    // 1초 후 다시 체크 (지연 로드 확인)
    const timer = setTimeout(checkStatus, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">MFA 시스템 상태 체크</h1>
      
      <div className="space-y-2">
        {Object.entries(status).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={value ? 'text-green-600' : 'text-red-600'}>
              {value ? '✅' : '❌'}
            </span>
            <span className="font-mono">{key}:</span>
            <span className="text-gray-600">
              {typeof value === 'boolean' ? (value ? 'Loaded' : 'Not loaded') : value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Import Map 내용:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {typeof window !== 'undefined' && JSON.stringify((window.MFA_CONFIG as any)?.importMap || {}, null, 2)}
        </pre>
      </div>
    </div>
  )
}