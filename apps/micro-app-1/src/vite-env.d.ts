/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 더 많은 환경 변수...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}