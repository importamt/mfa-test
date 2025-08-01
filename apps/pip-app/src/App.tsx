import React from 'react'
import { enableHMR } from '@mfa/shared'

interface Position {
    x: number
    y: number
}

function PipApp(): JSX.Element {
    const [isVisible, setIsVisible] = React.useState<boolean>(false)
    const [position, setPosition] = React.useState<Position>({ x: 20, y: 20 })
    const [isDragging, setIsDragging] = React.useState<boolean>(false)
    const [dragStart, setDragStart] = React.useState<Position>({ x: 0, y: 0 })

    const handleMouseDown = (e: React.MouseEvent): void => {
        setIsDragging(true)
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }

    const handleMouseMove = (e: MouseEvent): void => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }
    }

    const handleMouseUp = (): void => {
        setIsDragging(false)
    }

    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, dragStart])

    return (
        <div style={{
            position: 'fixed',
            bottom: `${position.y}px`,
            right: `${position.x}px`,
            zIndex: 1000,
            userSelect: 'none'
        }}>
            <button
                onClick={() => setIsVisible(!isVisible)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isVisible ? '#51cf66' : '#ff6b6b',
                    border: 'none',
                    color: 'white',
                    fontSize: '24px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {isVisible ? '📱' : '📹'}
            </button>

            {isVisible && (
                <div
                    onMouseDown={handleMouseDown}
                    style={{
                        position: 'absolute',
                        bottom: '70px',
                        right: '0',
                        width: '280px',
                        height: '200px',
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '15px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        border: '1px solid #e0e0e0',
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px',
                        paddingBottom: '10px',
                        borderBottom: '1px solid #f0f0f0'
                    }}>
                        <h4 style={{
                            margin: 0,
                            fontSize: '16px',
                            color: '#333'
                        }}>
                            📺 PIP Video (React)
                        </h4>
                        <button
                            onClick={() => setIsVisible(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '18px',
                                cursor: 'pointer',
                                color: '#999'
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <div style={{
                        width: '100%',
                        height: '120px',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '14px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div>
                            <div style={{ fontSize: '24px', marginBottom: '8px' }}>▶️</div>
                            <div>Video Content</div>
                            <div style={{ fontSize: '12px', opacity: 0.8 }}>
                                React PIP Player
                            </div>
                        </div>
                        
                        {/* 가짜 진행 바 */}
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            left: '15px',
                            right: '15px',
                            height: '4px',
                            background: 'rgba(255,255,255,0.3)',
                            borderRadius: '2px'
                        }}>
                            <div style={{
                                width: '60%',
                                height: '100%',
                                background: 'white',
                                borderRadius: '2px'
                            }}></div>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '10px',
                        fontSize: '12px',
                        color: '#666',
                        textAlign: 'center'
                    }}>
                        드래그하여 이동 가능
                    </div>
                </div>
            )}
        </div>
    )
}

export default PipApp

// HMR 활성화 - 한 줄로 처리
enableHMR(import.meta, 'pip-app', PipApp)