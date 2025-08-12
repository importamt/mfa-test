import { ChevronLeft, ChevronRight } from 'lucide-react';

export function HeroBanner() {
  const banners = [
    {
      id: 1,
      title: '타이틀 공개됩니다. 타이틀 공개',
      subtitle: '이번 주 금요일 밤 11시 30분 첫 방송',
      color: 'bg-orange-500'
    },
    {
      id: 2,
      title: '타이틀 공개됩니다. 타이틀 공개',
      subtitle: '매주 일요일 밤 10시 50분 첫 방송',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: '타이틀 공개됩니다. 타이틀 공개',
      subtitle: '이번 주 금요일 밤 11시 30분 첫 방송',
      color: 'bg-gray-700'
    },
    {
      id: 4,
      title: '타이틀 공개됩니다. 타이틀 공개',
      subtitle: '매주 일요일 밤 10시 50분 첫 방송',
      color: 'bg-purple-600'
    }
  ];

  return (
    <section className="bg-black mt-16 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors">
            <ChevronLeft size={40} />
          </button>
          
          <div className="flex space-x-4 px-12 overflow-x-auto scrollbar-hide">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`flex-shrink-0 w-80 h-48 ${banner.color} rounded-lg p-6 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                <div className="relative z-10 h-full flex flex-col justify-end text-white">
                  <h3 className="font-bold text-lg mb-2">{banner.title}</h3>
                  <p className="text-sm opacity-90">{banner.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors">
            <ChevronRight size={40} />
          </button>
        </div>
      </div>
    </section>
  );
}