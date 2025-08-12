import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-10">
      <h1 className="text-5xl font-bold text-tving-red tracking-tight">
        TVING MFA Platform
      </h1>
      
      <p className="text-xl text-gray-400 mb-5">
        어디로 이동하시겠습니까?
      </p>
      
      <div className="flex gap-5 flex-wrap justify-center">
        <Link 
          href="/onboarding"
          className="px-10 py-5 bg-tving-red text-white rounded-lg no-underline text-lg font-bold transition-transform hover:scale-105"
        >
          온보딩으로 이동
        </Link>
        
        <Link 
          href="/login"
          className="px-10 py-5 bg-transparent text-white border-2 border-tving-red rounded-lg no-underline text-lg font-bold transition-all hover:bg-tving-red hover:scale-105"
        >
          로그인으로 이동
        </Link>
        
        <Link 
          href="/main"
          className="px-10 py-5 bg-transparent text-white border-2 border-tving-red rounded-lg no-underline text-lg font-bold transition-all hover:bg-tving-red hover:scale-105"
        >
          메인으로 이동
        </Link>
      </div>
    </div>
  )
}