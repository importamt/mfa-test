import React from 'react'
import { useUserStore, useNotificationStore, enableHMR } from '@mfa/shared'

// React 컴포넌트만 export (HMR 지원)
function MicroApp1(): JSX.Element {
    const [clickCount, setClickCount] = React.useState<number>(0)
    const [currentTime, setCurrentTime] = React.useState<string>('')
    
    // Zustand stores 직접 사용
    const { user, theme, setTheme } = useUserStore()
    const { addNotification } = useNotificationStore()
    
    // SSR 데이터에서 settings 가져오기
    const settings = window.MFA_CONFIG?.ssrData?.queries?.['["settings"]'] || null

    const handleClick = (): void => {
        setClickCount(prev => prev + 1)
        setCurrentTime(new Date().toLocaleTimeString())
        
        // 글로벌 알림 발송
        addNotification({
            type: 'success',
            title: '클릭 완료!',
            message: `${clickCount + 1}번째 클릭입니다.`,
            duration: 3000
        })
    }

    const toggleTheme = (): void => {
        setTheme(theme === 'light' ? 'dark' : 'light')
        addNotification({
            type: 'info',
            title: '테마 변경',
            message: `${theme === 'light' ? '다크' : '라이트'} 모드로 변경되었습니다.`
        })
    }

    return (
        <div style={{ 
            padding: '20px', 
            border: '2px solid #4CAF50', 
            borderRadius: '8px', 
            margin: '10px',
            backgroundColor: theme === 'dark' ? '#2d3748' : '#f8f9fa',
            color: theme === 'dark' ? 'white' : 'black'
        }}>
            <h2>Micro App 1 (React + Shared)</h2>
            <p>React 기반 마이크로 프론트엔드 + Shared 라이브러리</p>
            
            {/* 사용자 정보 표시 */}
            {user && (
                <div style={{ marginBottom: '15px', fontSize: '14px', opacity: 0.8 }}>
                    안녕하세요, {user.name}님! (테마: {theme})
                </div>
            )}
            
            {/* 설정 정보 표시 */}
            {settings && (
                <div style={{ marginBottom: '15px', fontSize: '12px', opacity: 0.7 }}>
                    {settings.appName} v{settings.version}
                </div>
            )}
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <button 
                    onClick={handleClick}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    클릭해보세요! ({clickCount})
                </button>
                
                <button 
                    onClick={toggleTheme}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#FF9800',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    테마 변경222
                </button>
            </div>
            
            {currentTime && (
                <div style={{ marginTop: '10px', color: theme === 'dark' ? '#a0aec0' : '#666' }}>
                    마지막 클릭: {currentTime}
                </div>
            )}
        </div>
    )
}

export default MicroApp1

// HMR 활성화 - 한 줄로 처리
enableHMR(import.meta, 'micro-app-1', MicroApp1)