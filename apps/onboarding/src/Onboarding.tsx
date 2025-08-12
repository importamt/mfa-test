import { React, useState } from '@mfa/framework'

export default function OnboardingScreen(): JSX.Element {
  const [showDetails, setShowDetails] = useState(false)
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image Effect */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-transparent via-black/80 to-black opacity-90" 
           style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%), linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-5 py-16">
        {/* Logo */}
        <div className="text-5xl font-bold text-tving-red mb-10 tracking-tight">
          TVING
        </div>
        
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-5 leading-tight">
            티빙 볼까? 웨이브 볼까?
          </h1>
          <h2 className="text-4xl text-tving-red mb-5">
            더볼 이용권 출시
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            월 7,900원부터
          </p>
          <p className="text-base text-gray-500">
            티빙 볼까? 웨이브 볼까? 고민 종결
          </p>
        </div>
        
        {/* CTA Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-12 py-4 text-lg font-bold bg-tving-red text-white border-none rounded-lg cursor-pointer mb-16 transition-transform hover:scale-105"
        >
          자세히 보기
        </button>
        
        {/* Plans */}
        <div className="w-full max-w-6xl px-5">
          <h3 className="text-2xl font-bold text-center mb-8">
            이용권 선택
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Plan 1 */}
            <div className="bg-tving-gray-800 rounded-xl p-6 border border-tving-gray-700 transition-all hover:border-tving-red hover:scale-[1.02]">
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold mb-2">더볼 기본</h4>
                <p className="text-3xl font-bold text-tving-red">월 7,900원</p>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>티빙 + 웨이브 모든 콘텐츠</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>HD 화질</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>동시 시청 1회선</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2">✗</span>
                  <span className="text-gray-500">광고 있음</span>
                </li>
              </ul>
              <button className="w-full mt-6 py-3 bg-tving-gray-700 text-white rounded-lg font-bold transition-colors hover:bg-tving-red">
                선택하기
              </button>
            </div>
            
            {/* Plan 2 - Recommended */}
            <div className="bg-gradient-to-b from-tving-red/20 to-tving-gray-800 rounded-xl p-6 border-2 border-tving-red relative transition-transform hover:scale-[1.02]">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-tving-red text-white px-4 py-1 rounded-full text-sm font-bold">
                추천
              </div>
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold mb-2">더볼 스탠다드</h4>
                <p className="text-3xl font-bold text-tving-red">월 10,900원</p>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>티빙 + 웨이브 모든 콘텐츠</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>FHD 화질</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>동시 시청 2회선</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>광고 없음</span>
                </li>
              </ul>
              <button className="w-full mt-6 py-3 bg-tving-red text-white rounded-lg font-bold transition-transform hover:scale-105">
                선택하기
              </button>
            </div>
            
            {/* Plan 3 */}
            <div className="bg-tving-gray-800 rounded-xl p-6 border border-tving-gray-700 transition-all hover:border-tving-red hover:scale-[1.02]">
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold mb-2">더볼 프리미엄</h4>
                <p className="text-3xl font-bold text-tving-red">월 13,900원</p>
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>티빙 + 웨이브 모든 콘텐츠</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>4K UHD 화질</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>동시 시청 4회선</span>
                </li>
                <li className="flex items-start">
                  <span className="text-tving-red mr-2">✓</span>
                  <span>광고 없음 + 다운로드</span>
                </li>
              </ul>
              <button className="w-full mt-6 py-3 bg-tving-gray-700 text-white rounded-lg font-bold transition-colors hover:bg-tving-red">
                선택하기
              </button>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        {showDetails && (
          <div className="w-full max-w-4xl mt-16 px-5 animate-fade-in">
            <div className="bg-tving-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">티빙 X 웨이브 더볼 혜택</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-tving-red mb-3">티빙 콘텐츠</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• tvN, JTBC, Mnet 오리지널</li>
                    <li>• 티빙 오리지널 시리즈</li>
                    <li>• 파라마운트+ 독점 콘텐츠</li>
                    <li>• HBO 오리지널 시리즈</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-tving-red mb-3">웨이브 콘텐츠</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• SBS, KBS, MBC 실시간</li>
                    <li>• 웨이브 오리지널 시리즈</li>
                    <li>• 지상파 예능 다시보기</li>
                    <li>• 해외 영화 및 드라마</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}