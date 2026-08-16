import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'tutor';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  sessionId: string;
  learnerId: string;
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Message) => void;
  setTyping: (status: boolean) => void;
  setSession: (sessionId: string, learnerId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessionId: 'default-session',
  learnerId: 'default-learner',
  messages: [],
  isTyping: false,
  
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  
  setTyping: (status) => set({ isTyping: status }),
  
  setSession: (sessionId, learnerId) => set({ sessionId, learnerId }),
}));
