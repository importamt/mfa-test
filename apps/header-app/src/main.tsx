import { createMfaApp } from '@mfa/framework'
import App from './App'

// MFA 앱 생성 - mount/unmount/HMR 모두 처리
const { mount, unmount } = createMfaApp('header-app', App)

export { mount, unmount }