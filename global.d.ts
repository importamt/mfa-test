// 전역 타입 선언 - 모든 앱이 동일한 React 타입 사용
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="@tanstack/react-query" />

// MFA Framework 타입
interface MfaFramework {
  React: typeof import('react');
  ReactDOM: typeof import('react-dom');
  createRoot: typeof import('react-dom/client').createRoot;
  RoutingProvider: any;
  MfaGlobalProvider: any;
  MfaQueryProvider: any;
  QueryClient: typeof import('@tanstack/react-query').QueryClient;
  QueryClientProvider: typeof import('@tanstack/react-query').QueryClientProvider;
  useQuery: typeof import('@tanstack/react-query').useQuery;
  useMutation: typeof import('@tanstack/react-query').useMutation;
  create: typeof import('zustand').create;
}

// 빌드 시 전역 변수로 사용될 때를 위한 타입
declare global {
  interface Window {
    React: typeof import('react');
    ReactDOM: typeof import('react-dom');
    ReactDOMClient: {
      createRoot: typeof import('react-dom/client').createRoot;
    };
    MfaFramework: MfaFramework;
    
    // MFA 설정 - types/mfa.ts의 MFAConfig 타입 사용
    MFA_CONFIG: import('./host/src/types/mfa').MFAConfig;
    
    // MFA Host
    MicroFrontendHost: any;
    
    // Legacy globals for compatibility
    ReactQuery: any;
    Zustand: any;
    
    // MFA Metrics
    MFA_METRICS: import('./host/src/types/mfa').MFAMetrics;
    __NEXT_MFA_HYBRID__: boolean;
    __MFA_SYSTEM__: any;
  }
}

export {}