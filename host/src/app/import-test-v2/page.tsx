'use client'

import { useEffect, useState } from '@mfa/framework'

export default function ImportTestV2Page() {
  const [testResults, setTestResults] = useState<any>({})

  useEffect(() => {
    async function runTests() {
      const results: any = {}
      
      // 서브패스 import는 import map에서 지원되지 않으므로 main export만 테스트

      try {
        // Test: Main framework
        const framework = await import('@mfa/framework')
        results.framework = {
          success: true,
          exports: Object.keys(framework),
          hasReact: !!framework.React,
          hasUseState: !!framework.useState,
          hasQueryClient: !!framework.QueryClient,
          hasCreate: !!framework.create
        }
      } catch (e: any) {
        results.framework = { success: false, error: e.message }
      }

      setTestResults(results)
    }

    runTests()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Import Map V2 테스트</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Import Map:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {typeof window !== 'undefined' && JSON.stringify((window.MFA_CONFIG as any)?.importMap, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Import 테스트 결과:</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(testResults, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">사용 예시:</h2>
        <pre className="bg-green-50 p-4 rounded text-sm">
{`// React hooks
import { useState, useEffect } from '@mfa/framework'

// React Query  
import { useQuery, QueryClient } from '@mfa/framework'

// Zustand
import { create } from '@mfa/framework'

// 여러 개 한번에
import { React, MfaGlobalProvider, createRoot } from '@mfa/framework'`}
        </pre>
      </div>
    </div>
  )
}