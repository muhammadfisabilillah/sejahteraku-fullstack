'use client';

import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ message, setMessage, onSend, isLoading }: ChatInputProps) => (
  <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent sticky bottom-0">
    <div className="max-w-4xl mx-auto relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button className="p-2 text-zinc-500 hover:text-blue-400 transition-colors">
            <Paperclip size={18} />
        </button>
      </div>
      <input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        placeholder="Tanya apapun tentang karir..."
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-12 pr-14 focus:outline-none focus:border-blue-500/40 transition-all text-sm text-white placeholder:text-zinc-600 backdrop-blur-lg"
      />
      <button 
        disabled={isLoading || !message.trim()}
        onClick={onSend}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-xl transition-all disabled:opacity-20 hover:bg-blue-500 hover:text-white"
      >
        <Send size={18} strokeWidth={2.5} />
      </button>
    </div>
  </div>
);