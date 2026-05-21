'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import AgentSelector from '@/components/AgentSelector';
import ChatInterface from '@/components/ChatInterface';
import { checkHealth } from '@/lib/api';

export default function HomePage() {
  const [selectedAgent, setSelectedAgent] = useState('welcome');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    checkHealth()
      .then(() => setIsConnected(true))
      .catch(() => setIsConnected(false));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header isConnected={isConnected} />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <AgentSelector
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
          isConnected={isConnected}
        />

        <main className="flex flex-1 overflow-hidden">
          {isConnected ? (
            <ChatInterface agent={selectedAgent} />
          ) : (
            <div className="m-auto text-center p-8 bg-surface rounded-xl max-w-md">
              <h2 className="text-2xl mb-4 text-red-500 font-bold">
                ⚠️ Connection Error
              </h2>
              <p className="mb-2 text-slate-300">
                Cannot connect to API server.
              </p>
              <p className="mb-2 text-slate-300">
                Make sure the backend is running:
              </p>
              <code className="block bg-surface-light p-4 rounded-lg font-mono text-sm mt-4">
                cd backend && python main.py
              </code>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
