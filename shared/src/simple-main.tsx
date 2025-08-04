// 심플한 MFA Framework - 모든 것을 한 파일에
import * as React from 'react'
import * as ReactDOM from 'react-dom'  
import { createRoot } from 'react-dom/client'
import * as ReactQuery from '@tanstack/react-query'
import * as Zustand from 'zustand'

// 전역 노출 (브라우저용)
if (typeof window !== 'undefined') {
  const win = window as any
  
  // 기본 framework 객체
  win.MfaFramework = {
    React,
    ReactDOM,
    ReactQuery,
    Zustand,
    createRoot
  }
  
  // 서브패스 지원을 위한 가상 모듈
  win.__mfaModules = {
    '@mfa/framework': win.MfaFramework,
    '@mfa/framework/react': React,
    '@mfa/framework/react-dom': ReactDOM,
    '@mfa/framework/react-query': ReactQuery,
    '@mfa/framework/zustand': Zustand
  }
}

// ES Module exports
export { React, ReactDOM, createRoot }
export * from '@tanstack/react-query'
export * from 'zustand'

// Custom providers and utilities
export * from './providers/GlobalProvider'
export * from './providers/QueryProvider'
export * from './stores/globalStore'
export * from './utils/create-mfa-app'