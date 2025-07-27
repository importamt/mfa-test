import React from 'react'
import { createRoot } from 'react-dom/client'

function MicroApp2() {
    const [todos, setTodos] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos(prev => [...prev, {
                id: Date.now(),
                text: inputValue,
                completed: false
            }])
            setInputValue('')
        }
    }

    const toggleTodo = (id) => {
        setTodos(prev => prev.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    return (
        <div style={{ 
            padding: '20px', 
            border: '2px solid #2196F3', 
            borderRadius: '8px', 
            margin: '10px',
            backgroundColor: '#f8f9fa'
        }}>
            <h2>Micro App 2 (React Todo)</h2>
            <p>React 기반 Todo 리스트 애플리케이션입니다.</p>
            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="할 일을 입력하세요..."
                    style={{
                        padding: '8px 12px',
                        marginRight: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        width: '200px'
                    }}
                />
                <button 
                    onClick={addTodo}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    추가
                </button>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map(todo => (
                    <li key={todo.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #eee'
                    }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            style={{ marginRight: '10px' }}
                        />
                        <span style={{
                            flex: 1,
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? '#888' : '#333'
                        }}>
                            {todo.text}
                        </span>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{
                                padding: '4px 8px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px'
                            }}
                        >
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
            
            {todos.length === 0 && (
                <p style={{ color: '#888', fontStyle: 'italic' }}>
                    할 일을 추가해보세요!
                </p>
            )}
        </div>
    )
}

let root = null

export function mount(container) {
    if (root) return
    
    root = createRoot(container)
    root.render(<MicroApp2 />)
    console.log('Micro App 2 (React Todo) 마운트 완료')
}

export function unmount() {
    if (root) {
        root.unmount()
        root = null
        console.log('Micro App 2 (React Todo) 언마운트 완료')
    }
}