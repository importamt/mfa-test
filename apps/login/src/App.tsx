import { enableHMR } from '@mfa/framework';
import { LoginPage } from './components/LoginPage';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <LoginPage />
    </div>
  );
}

export default App;

// HMR 활성화
if (import.meta.hot) {
  enableHMR(import.meta, 'login', App);
}