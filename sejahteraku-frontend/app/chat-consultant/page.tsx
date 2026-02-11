'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, Bot, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { askAI } from '@/lib/api';

export default function ChatConsultantPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai' as const, text: 'Halo Muhammad! Sistem sudah sinkron. Apa yang mau kamu tanyakan?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMsg = message;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await askAI(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    } catch (err: any) {
      setChatHistory(prev => [...prev, { role: 'ai', text: `Terjadi kendala: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white flex-col font-sans">
      {/* HEADER */}
      <header className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push('/')} className="p-2 hover:bg-white/10 rounded-xl transition text-gray-400">
            <ArrowLeft size={20} />
          </button>
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Sparkles size={20} /></div>
          <div>
              <h1 className="font-bold tracking-tight text-white text-lg leading-none">SejahteraKu Intelligence</h1>
              <p className="text-[10px] text-green-500 font-mono uppercase tracking-widest mt-1">Session Connected</p>
          </div>
        </div>
      </header>
      
      {/* CHAT AREA */}
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 md:p-12 space-y-8 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-8">
          {chatHistory.map((chat, i) => (
            <div key={i} className={`flex gap-4 w-full ${chat.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${chat.role === 'user' ? 'bg-white text-black' : 'bg-blue-600/10 text-blue-400 border-blue-500/20'}`}>
                    {chat.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[75%] p-4 rounded-2xl text-sm ${chat.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'}`}>
                    {chat.text}
                </div>
            </div>
          ))}
          {isLoading && (
              <div className="flex justify-start animate-pulse">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none text-xs text-blue-400 italic">AI sedang mengetik...</div>
              </div>
          )}
        </div>
      </div>

      {/* INPUT */}
      <div className="p-6 bg-[#050505] border-t border-white/10">
        <div className="max-w-4xl mx-auto relative">
          <input 
            value={message} onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ketik pertanyaanmu..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pr-16 focus:outline-none focus:border-blue-500/50 text-sm text-white"
          />
          <button onClick={handleSend} disabled={isLoading} className="absolute right-3 top-3 bg-white text-black p-2.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}