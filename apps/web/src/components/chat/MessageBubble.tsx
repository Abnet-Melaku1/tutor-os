import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../../store/chat';

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full shadow-lg border border-white/10 ${isUser ? 'bg-primary/20 text-primary ml-3' : 'bg-accent/20 text-accent mr-3'}`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>
        <div className={`px-5 py-4 rounded-2xl ${isUser ? 'glass bg-primary/10 rounded-tr-sm' : 'glass rounded-tl-sm'}`}>
          <p className="text-[15px] leading-relaxed text-foreground/90 whitespace-pre-wrap font-sans">
            {message.content}
          </p>
          <span className="text-xs text-foreground/40 mt-2 block">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}
