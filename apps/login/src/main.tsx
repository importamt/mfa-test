import { createMfaApp } from '@mfa/framework'
import App from './App'
import './index.css'

// MFA 앱 생성 - mount/unmount/HMR 모두 처리
const { mount, unmount } = createMfaApp('login', App)

export { mount, unmount }