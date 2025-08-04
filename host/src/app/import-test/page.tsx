'use client'

import { useEffect, useState } from '@mfa/framework'

export default function ImportTestPage() {
  const [importStatus, setImportStatus] = useState<any>({})

  useEffect(() => {
    async function testImports() {
      try {
        // Import Map을 통한 동적 import 테스트
        const framework = await import('@mfa/framework')
        console.log('✅ Framework imported:', framework)
        
        setImportStatus({
          frameworkLoaded: true,
          hasReact: !!framework.React,
          hasReactDOM: !!framework.ReactDOM,
          hasCreateRoot: !!framework.createRoot,
          hasReactQuery: !!framework.QueryClient,
          hasZustand: !!framework.create,
          reactVersion: framework.React?.version
        })
      } catch (error) {
        console.error('❌ Import failed:', error)
        setImportStatus({ error: (error as Error).message })
      }
    }

    testImports()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Import Map 테스트</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Import Map 내용:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {typeof window !== 'undefined' && JSON.stringify((window.MFA_CONFIG as any)?.importMap, null, 2)}
        </pre>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">동적 Import 결과:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {JSON.stringify(importStatus, null, 2)}
        </pre>
      </div>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">전역 객체 상태:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm">
          {typeof window !== 'undefined' && JSON.stringify({
            windowReact: !!window.React,
            windowReactDOM: !!window.ReactDOM,
            windowMfaFramework: !!window.MfaFramework,
            reactVersion: window.React?.version
          }, null, 2)}
        </pre>
      </div>
    </div>
  )
}