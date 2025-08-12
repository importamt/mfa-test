import { enableHMR } from '@mfa/framework';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OriginalSection } from './components/OriginalSection';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      <OriginalSection />
    </div>
  );
}

export default App;

// HMR 활성화
if (import.meta.hot) {
  enableHMR(import.meta, 'onboarding', App);
}