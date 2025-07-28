import { React, createRoot, type Root } from '@mfa/shared'

function HeaderApp(): JSX.Element {
    const [user, setUser] = React.useState<string>('Admin')
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)

    return (
        <header style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '1rem 2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
                    🚀 MFA Platform (React)
                </h1>
                
                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{
                        padding: '0.5rem 1rem',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}>
                        👤 {user}
                    </span>
                    
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            설정 ⚙️
                        </button>
                        
                        {isMenuOpen && (
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: '100%',
                                marginTop: '5px',
                                background: 'white',
                                color: '#333',
                                borderRadius: '4px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                minWidth: '150px',
                                overflow: 'hidden'
                            }}>
                                <button style={{
                                    width: '100%',
                                    padding: '10px 15px',
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}>
                                    프로필 설정
                                </button>
                                <button style={{
                                    width: '100%',
                                    padding: '10px 15px',
                                    border: 'none',
                                    background: 'transparent',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px'
                                }}>
                                    테마 변경
                                </button>
                                <button 
                                    onClick={() => setUser(user === 'Admin' ? 'Guest' : 'Admin')}
                                    style={{
                                        width: '100%',
                                        padding: '10px 15px',
                                        border: 'none',
                                        background: 'transparent',
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
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

let root: Root | null = null

export function mount(container: HTMLElement): void {
    if (root) return
    
    root = createRoot(container)
    root.render(<HeaderApp />)
    console.log('Header App (React) 마운트 완료')
}

export function unmount(): void {
    if (root) {
        root.unmount()
        root = null
        console.log('Header App (React) 언마운트 완료')
    }
}