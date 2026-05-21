'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { sendChatMessage } from '@/lib/api';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'error';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  agent: string;
}

export default function ChatInterface({ agent }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([]);
  }, [agent]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const data = await sendChatMessage(agent, currentInput);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: err instanceof Error ? err.message : 'An error occurred',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="flex flex-col flex-1 bg-background min-h-0">
      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-4">
        {messages.length === 0 && (
          <div className="m-auto text-center text-slate-300">
            <h2 className="text-2xl mb-2 text-slate-100 font-semibold">
              Start a conversation
            </h2>
            <p>
              Ask me anything about the portfolio, projects, career, business
              opportunities, or research.
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.type === 'user';
          const isError = msg.type === 'error';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 flex flex-col gap-1 ${
                  isUser
                    ? 'bg-primary text-white rounded-xl rounded-tr-sm'
                    : isError
                    ? 'bg-red-500/10 text-red-400 border border-red-500 rounded-xl rounded-tl-sm'
                    : 'bg-surface-light text-slate-100 rounded-xl rounded-tl-sm'
                }`}
              >
                <span className="whitespace-pre-wrap break-words">
                  {msg.content}
                </span>
                <span className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-light px-4 py-3 rounded-xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300 animate-typing" />
                <span
                  className="w-2 h-2 rounded-full bg-slate-300 animate-typing"
                  style={{ animationDelay: '0.2s' }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-slate-300 animate-typing"
                  style={{ animationDelay: '0.4s' }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-surface-light bg-surface flex gap-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message... (Shift+Enter for new line)"
          disabled={isLoading}
          rows={3}
          className="flex-1 px-4 py-3 rounded-lg bg-surface-light border border-surface-light text-slate-100 placeholder:text-slate-300 resize-none min-h-[50px] max-h-[150px] focus:outline-none focus:border-primary disabled:opacity-60"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? '⏳ Thinking...' : '📤 Send'}
        </button>
      </div>
    </section>
  );
}
