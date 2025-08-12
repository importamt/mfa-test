import { React, useRouting, enableHMR } from '@mfa/framework'
const { useState } = React

function HeaderApp(): JSX.Element {
    const [user, setUser] = useState<string>('Admin')
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const { currentPath, navigate } = useRouting()

    return (
        <header className="bg-gradient-to-br from-blue-500 to-purple-600 text-white px-8 py-4 shadow-lg sticky top-0 z-[1000]">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <h1 className="m-0 text-2xl">
                        🚀 MFA Platform (React)
                    </h1>
                    
                    <nav className="flex gap-4">
                        <button 
                            onClick={() => navigate('/main')}
                            className={`
                                text-white no-underline px-4 py-2 rounded text-sm transition-colors duration-200 
                                border-none cursor-pointer
                                ${currentPath === '/main' 
                                    ? 'bg-white/30' 
                                    : 'bg-transparent hover:bg-white/20'
                                }
                            `}
                        >
                            메인
                        </button>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className={`
                                text-white no-underline px-4 py-2 rounded text-sm transition-colors duration-200 
                                border-none cursor-pointer
                                ${currentPath === '/dashboard' 
                                    ? 'bg-white/30' 
                                    : 'bg-transparent hover:bg-white/20'
                                }
                            `}
                        >
                            대시보드
                        </button>
                        <button 
                            onClick={() => navigate('/profile')}
                            className={`
                                text-white no-underline px-4 py-2 rounded text-sm transition-colors duration-200 
                                border-none cursor-pointer
                                ${currentPath === '/profile' 
                                    ? 'bg-white/30' 
                                    : 'bg-transparent hover:bg-white/20'
                                }
                            `}
                        >
                            프로필
                        </button>
                    </nav>
                </div>
                
                <nav className="flex gap-4 items-center">
                    <span className="px-4 py-2 bg-white/20 rounded text-sm">
                        👤 {user}
                    </span>
                    
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="px-4 py-2 bg-white/20 border-none text-white rounded cursor-pointer text-sm hover:bg-white/30 transition-colors"
                        >
                            설정 ⚙️
                        </button>
                        
                        {isMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 bg-white text-tving-gray-600 rounded shadow-lg min-w-[150px] overflow-hidden">
                                <button className="w-full px-4 py-3 border-none bg-transparent text-left cursor-pointer text-sm hover:bg-tving-gray-100 transition-colors">
                                    프로필 설정
                                </button>
                                <button className="w-full px-4 py-3 border-none bg-transparent text-left cursor-pointer text-sm hover:bg-tving-gray-100 transition-colors">
                                    테마 변경
                                </button>
                                <button 
                                    onClick={() => setUser(user === 'Admin' ? 'Guest' : 'Admin')}
                                    className="w-full px-4 py-3 border-none bg-transparent text-left cursor-pointer text-sm hover:bg-tving-gray-100 transition-colors"
                                >
                                    사용자 전환
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default HeaderApp

// HMR 활성화 - 한 줄로 처리
enableHMR(import.meta, 'header-app', HeaderApp)