import { useRoutingStore, useNotificationStore } from '@mfa/framework';

export function Header() {
  const { navigate } = useRoutingStore();
  const { addNotification } = useNotificationStore();
  
  const handleNavClick = (item: string) => {
    addNotification({
      type: 'info',
      title: item,
      message: `${item} 섹션으로 이동합니다`
    });
  };
  
  const handleLogoClick = () => {
    navigate('/');
  };
  
  const handleSignup = () => {
    navigate('/login');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  
  const handleSubscription = () => {
    addNotification({
      type: 'info',
      title: '이용권',
      message: '이용권 구매 페이지는 준비 중입니다'
    });
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div 
            className="text-red-500 font-bold text-xl cursor-pointer"
            onClick={handleLogoClick}
          >
            TVING
          </div>
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => handleNavClick('실시간')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              실시간
            </button>
            <button 
              onClick={() => handleNavClick('TV프로그램')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              TV프로그램
            </button>
            <button 
              onClick={() => handleNavClick('영화')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              영화
            </button>
            <button 
              onClick={() => handleNavClick('파라마운트+')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              파라마운트+
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleSignup}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            무료 가입
          </button>
          <button 
            onClick={handleLogin}
            className="text-white hover:text-gray-300 transition-colors"
          >
            로그인
          </button>
          <button 
            onClick={handleSubscription}
            className="text-white hover:text-gray-300 transition-colors"
          >
            이용권
          </button>
        </div>
      </div>
    </header>
  );
}