import React from 'react';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { BrainCircuit, GraduationCap, History, Settings, User } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar */}
      <div className="w-80 h-full border-r border-white/10 glass z-10 flex flex-col">
        {/* App Title */}
        <div className="h-20 flex items-center px-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mr-3 shadow-lg shadow-primary/20">
            <GraduationCap className="text-white" size={24} />
          </div>
          <h1 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            TutorOS
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4 px-2">
            Learning Profile
          </div>
          
          <button className="w-full flex items-center px-3 py-3 rounded-lg bg-white/5 text-white border border-white/10 transition-colors">
            <BrainCircuit size={18} className="mr-3 text-primary" />
            <span className="font-sans font-medium text-sm">Knowledge Graph</span>
          </button>
          
          <button className="w-full flex items-center px-3 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <History size={18} className="mr-3" />
            <span className="font-sans font-medium text-sm">Session History</span>
          </button>
          
          <button className="w-full flex items-center px-3 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors">
            <User size={18} className="mr-3" />
            <span className="font-sans font-medium text-sm">Learner Model</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="h-20 border-t border-white/5 flex items-center px-6">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 border border-white/10">
            <User size={20} className="text-white/80" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-sm font-medium text-white/90">Test Student</span>
            <span className="text-xs text-white/40">Grade 8 Mathematics</span>
          </div>
          <button className="text-white/40 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 h-full p-6 z-10 flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}
