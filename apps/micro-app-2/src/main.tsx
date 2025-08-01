import { createMfaApp } from '@mfa/shared'
import App from './App'

// MFA 앱 생성 - mount/unmount/HMR 모두 처리
const { mount, unmount } = createMfaApp('micro-app-2', App)

export { mount, unmount }