import { useState, useEffect } from 'react'
import './App.css'
import ChatInterface from './components/ChatInterface'
import AgentSelector from './components/AgentSelector'

function App() {
  const [selectedAgent, setSelectedAgent] = useState('welcome')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Check API connectivity
    fetch('http://localhost:8000/health')
      .then(() => setIsConnected(true))
      .catch(() => setIsConnected(false))
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 AI Agents Team</h1>
        <p>Interact with our intelligent agent team</p>
        <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '✓ Connected' : '✗ Disconnected'}
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <AgentSelector
            selectedAgent={selectedAgent}
            onSelectAgent={setSelectedAgent}
            isConnected={isConnected}
          />
        </aside>

        <main className="main-content">
          {isConnected ? (
            <ChatInterface agent={selectedAgent} />
          ) : (
            <div className="connection-error">
              <h2>⚠️ Connection Error</h2>
              <p>Cannot connect to API server.</p>
              <p>Make sure the backend is running:</p>
              <code>cd backend && python main.py</code>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
