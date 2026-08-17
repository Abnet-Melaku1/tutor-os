'use client';
import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { useChatStore } from '../../store/chat';
import { MessageBubble } from './MessageBubble';

export function ChatWindow() {
  const [input, setInput] = useState('');
  const { messages, addMessage, isTyping, setTyping } = useChatStore();

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content: input,
      timestamp: new Date()
    };

    addMessage(userMessage);
    setInput('');
    setTyping(true);

    // Simulate API call for now
    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'tutor' as const,
        content: "That's an excellent question! In our next phase, I'll be connected to a real LLM and our knowledge base. For now, I'm just a sleek glassmorphic UI.",
        timestamp: new Date()
      });
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full w-full glass-panel rounded-xl overflow-hidden relative">
      {/* Header */}
      <div className="h-16 border-b border-white/10 flex items-center px-6 bg-black/20">
        <Sparkles className="text-accent mr-3" size={24} />
        <h2 className="text-lg font-heading font-semibold text-foreground/90">TutorOS Chat</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-foreground/40">
            <Sparkles size={48} className="mb-4 opacity-20" />
            <p className="font-sans">Say hello to begin your learning session</p>
          </div>
        ) : (
          messages.map(msg => <MessageBubble key={msg.id} message={msg} />)
        )}
        
        {isTyping && (
          <div className="flex justify-start mb-6">
            <div className="glass px-5 py-3 rounded-2xl rounded-tl-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-accent/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 border-t border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
          />
          <button 
            type="submit" 
            disabled={!input.trim()}
            className="absolute right-2 p-2 bg-primary hover:bg-primary/80 disabled:bg-white/10 disabled:text-white/30 text-white rounded-full transition-colors flex items-center justify-center"
          >
            <Send size={18} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
