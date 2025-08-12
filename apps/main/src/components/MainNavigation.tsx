import { useRoutingStore, useNotificationStore } from '@mfa/framework';
import { Search, User } from 'lucide-react';

export function MainNavigation() {
  const { navigate } = useRoutingStore();
  const { addNotification } = useNotificationStore();
  
  const navigationItems = [
    '드라마', '예능', '영화', '스포츠', '애니', '뉴스', '라이브'
  ];

  const handleNavClick = (item: string) => {
    addNotification({
      type: 'info',
      title: item,
      message: `${item} 카테고리로 이동합니다`
    });
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div 
            className="text-red-500 font-bold text-2xl cursor-pointer"
            onClick={handleLogoClick}
          >
            TVING
          </div>
          <div className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item}
                className="text-white hover:text-red-400 transition-colors text-sm"
                onClick={() => handleNavClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        
        {/* Right side - Search and Profile */}
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300 transition-colors">
            <Search size={20} />
          </button>
          <button 
            className="text-white hover:text-gray-300 transition-colors"
            onClick={handleProfileClick}
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}