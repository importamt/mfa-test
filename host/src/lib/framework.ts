// Framework imports - 서버와 클라이언트 분기
let React: any;
let ReactDOM: any;
let createRoot: any;

if (typeof window !== 'undefined') {
  // 클라이언트: Import Map 사용
  React = (window as any).React;
  ReactDOM = (window as any).ReactDOM;
  createRoot = (window as any).ReactDOMClient?.createRoot;
} else {
  // 서버: workspace 패키지 사용
  const framework = await import('@mfa/framework');
  React = framework.React;
  ReactDOM = framework.ReactDOM;
  createRoot = framework.createRoot;
}

// Re-export everything
export { React, ReactDOM, createRoot };
export type { ReactNode, ReactElement, FC } from '@mfa/framework';