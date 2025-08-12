import { useNotificationStore, useRoutingStore, useState } from '@mfa/framework';

export function HeroSection() {
  const { addNotification } = useNotificationStore();
  const { navigate } = useRoutingStore();
  
  const handleWatchNow = () => {
    addNotification({
      type: 'info',
      title: '더 털 이용권',
      message: '월 7,900원부터 시작하는 특별 혜택을 확인하세요!'
    });
    navigate('/main');
  };

  const [count, setCount] = useState(0);
  
  return (
    <section className="flex relative justify-center items-center min-h-screen">
      {/* Background with gradient */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-red-900 via-black to-blue-900"></div>
        {/* Multiple overlay layers for better text visibility */}
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60"></div>
        <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-4 text-center text-white">
        {/* Content Container with additional background protection */}
        <div className="px-8 py-12 rounded-3xl shadow-2xl backdrop-blur-sm bg-black/30">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-4 text-white bg-red-500 rounded-full shadow-lg">
            <span className="text-sm">무료 웰컴 혜택 종료 임박!</span>
          </div>
          
          {/* Partnership Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-6 text-white bg-blue-600 rounded-full shadow-lg">
            <span className="text-sm">하나의 구독으로 더한 혜택 ✅</span>
          </div>
          
          {/* Main Content */}
          <div className="mb-8">
            <div className="flex justify-center items-center mb-6 space-x-4">
              <span className="text-2xl font-bold text-red-500 drop-shadow-lg">TVING</span>
              <span className="text-xl text-white drop-shadow-lg">×</span>
              <span className="text-2xl font-bold text-blue-500 drop-shadow-lg">Wavve</span>
            </div>
            
            <h1 className="mb-4 text-4xl font-bold drop-shadow-xl md:text-6xl">
              디지털2 이용권 출시: {count}
            </h1>
            
            <p className="mb-8 text-xl text-gray-100 drop-shadow-lg md:text-2xl">
              월 7,900원부터
              <button onClick={() => setCount(count + 1)}>+</button>
            </p>
            
            <button 
              onClick={handleWatchNow}
              className="px-8 py-3 text-lg font-medium text-white bg-red-500 rounded-lg shadow-xl transition-colors hover:bg-red-600 hover:shadow-2xl"
            >
              지금 보러가기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}