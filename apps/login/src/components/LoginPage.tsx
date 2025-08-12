import { useRoutingStore, useNotificationStore, useGlobalStore } from '@mfa/framework';

export function LoginPage() {
  const { navigate } = useRoutingStore();
  const { addNotification } = useNotificationStore();
  const { setUser } = useGlobalStore();
  
  const loginOptions = [
    {
      id: 'tving',
      name: 'TVING ID로 시작하기',
      icon: 'V',
      bgColor: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-white',
      iconBg: 'bg-red-600',
      badge: '추천하기'
    },
    {
      id: 'naver',
      name: '네이버로 시작하기',
      icon: 'N',
      bgColor: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white',
      iconBg: 'bg-green-500'
    },
    {
      id: 'kakao',
      name: '카카오로 시작하기',
      icon: '카',
      bgColor: 'bg-yellow-400 hover:bg-yellow-500',
      textColor: 'text-gray-900',
      iconBg: 'bg-yellow-400'
    },
    {
      id: 'cjone',
      name: 'CJ ONE으로 시작하기',
      icon: 'O',
      bgColor: 'bg-purple-600 hover:bg-purple-700',
      textColor: 'text-white',
      iconBg: 'bg-purple-600'
    },
    {
      id: 'apple',
      name: 'Apple로 계속하기',
      icon: '',
      bgColor: 'bg-gray-900 hover:bg-black',
      textColor: 'text-white',
      iconBg: 'bg-gray-900'
    },
    {
      id: 'facebook',
      name: '페이스북으로 시작하기',
      icon: 'f',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      iconBg: 'bg-blue-600'
    },
    {
      id: 'twitter',
      name: 'X(구 트위터)로 시작하기',
      icon: 'X',
      bgColor: 'bg-gray-800 hover:bg-gray-900',
      textColor: 'text-white',
      iconBg: 'bg-gray-800'
    }
  ];

  const handleLogin = (option: typeof loginOptions[0]) => {
    setUser({
      id: option.id,
      name: `${option.name} User`,
      email: `user@${option.id}.com`
    });
    
    addNotification({
      type: 'success',
      title: '로그인 성공',
      message: `${option.name}(으)로 로그인했습니다`
    });
    
    navigate('/main');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleFindId = () => {
    addNotification({
      type: 'info',
      title: '아이디 찾기',
      message: '아이디 찾기 기능은 준비 중입니다'
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 
            className="text-red-500 font-bold text-3xl cursor-pointer"
            onClick={handleLogoClick}
          >
            TVING
          </h1>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-10">
          <h2 className="text-white text-xl mb-2">반가워요!</h2>
          <p className="text-gray-400">계정을 선택해주세요.</p>
        </div>

        {/* Login Options */}
        <div className="space-y-3 mb-8">
          {loginOptions.map((option) => (
            <button
              key={option.id}
              className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-lg transition-colors relative ${option.bgColor}`}
              onClick={() => handleLogin(option)}
            >
              {/* Icon */}
              <div className={`w-6 h-6 rounded flex items-center justify-center ${option.iconBg} flex-shrink-0`}>
                {option.id === 'apple' ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12.017 2.037c1.69-.098 3.218.996 2.871 2.828-.288 1.516-1.558 2.684-2.871 2.609-1.605-.074-3.168-1.219-2.871-2.828.247-1.34 1.287-2.511 2.871-2.609zm4.998 17.75c-1.031 1.215-2.298 1.149-3.412.555-1.166-.612-2.237-.627-3.462 0-1.541.789-2.359.681-3.265-.555-3.766-5.144-1.006-12.854 4.423-13.067 1.287.051 2.186.664 2.937.664.968 0 2.474-.844 4.18-.719 1.287.063 3.505.516 4.729 3.11-4.423 2.578-3.742 9.297.87 9.012z"/>
                  </svg>
                ) : (
                  <span className={`${option.textColor} font-bold text-sm`}>{option.icon}</span>
                )}
              </div>
              
              {/* Text */}
              <span className={`${option.textColor} font-medium flex-1`}>
                {option.name}
              </span>
              
              {/* Badge for TVING option */}
              {option.badge && (
                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {option.badge}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            아이디를 잊으신 경우{' '}
            <button 
              className="text-gray-400 underline hover:text-gray-300 transition-colors"
              onClick={handleFindId}
            >
              아이디 찾기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}