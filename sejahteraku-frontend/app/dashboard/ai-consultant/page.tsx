'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  BrainCircuit, 
  RefreshCcw,
  Terminal,
  AlertCircle
} from 'lucide-react';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

export default function AIConsultantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'ai', 
      content: 'Halo Muhammad! Neural Core SejahteraKu aktif. Silakan ajukan pertanyaan seputar bisnis atau teknis, saya siap menjawab.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); // Mengambil token dari login

      // SINKRONISASI DENGAN BACKEND MUHAMMAD
      const response = await fetch('http://localhost:3000/ai-consultant/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Lolos Satpam JwtAuthGuard
        },
        body: JSON.stringify({ question: currentInput }), // Key 'question' sesuai @Body('question')
      });

      if (!response.ok) {
        if (response.status === 401) throw new Error('Sesi habis, silakan login ulang.');
        throw new Error('Gagal terhubung ke AI');
      }

      const data = await response.json();
      
      // Mengambil data.response karena biasanya NestJS mengembalikan objek
      const aiResponse: Message = { 
        role: 'ai', 
        content: data.response || data.answer || (typeof data === 'string' ? data : "Terjadi kesalahan format respons.")
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (err: any) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `Error: ${err.message}. Pastikan backend running dan kamu sudah login.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-20px)] p-6 md:p-10 flex flex-col bg-[#0c0a09]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500 font-bold tracking-[0.4em] uppercase text-[10px]">
            <BrainCircuit size={14} className="animate-pulse" /> Neural System Online
          </div>
          <h1 className="text-5xl font-display font-bold tracking-tighter italic text-white">
            AI <span className="text-stone-700 not-italic">Consultant.</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMessages([{ role: 'ai', content: 'Sesi baru dimulai. Apa yang ingin kamu tanyakan?' }])}
            className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-amber-500/50 transition-all text-stone-400"
          >
            <RefreshCcw size={14} /> Clear Session
          </button>
        </div>
      </div>

      {/* CHAT CONTAINER */}
      <div className="flex-grow bg-white/[0.02] border border-white/5 rounded-[3rem] flex flex-col overflow-hidden relative shadow-2xl">
        <div 
          ref={scrollRef}
          className="flex-grow p-8 md:p-12 overflow-y-auto space-y-10 scrollbar-hide"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div className={`flex gap-5 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border-2 ${
                  msg.role === 'ai' 
                  ? 'bg-amber-500 border-amber-300 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                  : 'bg-stone-800 border-white/10 text-white'
                }`}>
                  {msg.role === 'ai' ? <Bot size={24} /> : <User size={24} />}
                </div>

                <div className={`relative p-6 md:p-8 rounded-[2.5rem] text-sm md:text-base leading-relaxed ${
                  msg.role === 'ai' 
                  ? 'bg-white/[0.03] border border-white/10 text-stone-200 rounded-tl-none' 
                  : 'bg-amber-500 text-black font-bold rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-5 items-center bg-white/5 px-8 py-5 rounded-full border border-white/10">
                <Sparkles size={18} className="text-amber-500 animate-spin" />
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-500">AI sedang memproses...</span>
              </div>
            </div>
          )}
        </div>

        {/* INPUT BOX */}
        <div className="p-8 md:p-10 bg-[#0c0a09]/80 backdrop-blur-2xl border-t border-white/5">
          <div className="relative flex items-center max-w-5xl mx-auto">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tanyakan sesuatu tentang strategi bisnis..."
              className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] py-6 pl-10 pr-24 text-sm outline-none focus:border-amber-500/40 focus:bg-white/[0.07] transition-all placeholder:text-stone-700"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`absolute right-3 p-5 rounded-full transition-all ${
                isLoading ? 'bg-stone-800 text-stone-600' : 'bg-amber-500 text-black hover:scale-105 shadow-lg shadow-amber-500/20'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-6">
             <span className="text-[8px] text-stone-700 uppercase tracking-[0.3em] font-black">Encrypted Connection</span>
             <span className="text-[8px] text-stone-700 uppercase tracking-[0.3em] font-black">AI Model v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}