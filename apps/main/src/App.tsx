import { enableHMR } from '@mfa/framework'
import { MainPage } from './components/MainPage'

function App() {
  return <MainPage />
}

export default App

// HMR 활성화
if (import.meta.hot) {
  enableHMR(import.meta, 'main', App)
}