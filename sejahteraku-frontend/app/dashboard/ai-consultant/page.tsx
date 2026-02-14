"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Terminal, Cpu, Zap, Loader2 } from 'lucide-react';

export default function AIConsultantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Sistem aktif. Halo Muhammad, aku **SejahteraKu AI**. Ada yang bisa aku bantu buat karir kamu hari ini? 😊' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    const currentQuestion = input; 
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Ambil token JWT lo
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');

      const res = await fetch('http://localhost:3000/ai-consultant/ask', { 
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ question: currentQuestion }), 
      });
      
      const data = await res.json();
      
      if (res.ok && data.response) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Aduh, sepertinya ada masalah koneksi. Coba lagi ya! 🙏' }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Koneksi ke Oracle Server terputus. Cek backend kamu, Bos!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12 flex flex-col">
      {/* HEADER STATUS */}
      <div className="flex items-center justify-between mb-8 border-b border-stone-900 pb-8">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter flex items-center gap-3">
            <Cpu className={`text-amber-500 ${isLoading ? 'animate-spin' : 'animate-pulse'}`} size={32} />
            SEJAHTERAKU <span className="text-amber-500">AI.</span>
          </h1>
          <p className="text-stone-500 text-[10px] uppercase font-black tracking-[0.4em] mt-2 italic">Powered by Llama 3.1 & Groq</p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-[#111] border border-stone-800 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-ping' : 'bg-green-500'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">
              {isLoading ? 'Thinking...' : 'Ready to Serve'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden">
        {/* CHAT WINDOW */}
        <div className="lg:col-span-8 flex flex-col bg-[#0a0a0a] border border-stone-900 rounded-[2.5rem] overflow-hidden shadow-2xl h-[650px]">
          <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 no-scrollbar scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-amber-500 text-black' : 'bg-stone-800 text-white border border-stone-700'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-6 rounded-[2rem] text-sm leading-relaxed whitespace-pre-wrap shadow-inner ${
                    msg.role === 'user' 
                    ? 'bg-stone-900 text-white rounded-tr-none border border-stone-800' 
                    : 'bg-[#111] border border-stone-800 text-stone-300 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-4 items-center bg-[#111] border border-stone-800 p-4 rounded-3xl animate-pulse">
                  <Loader2 className="animate-spin text-amber-500" size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">Menganalisis Jawaban...</span>
                </div>
              </div>
            )}
          </div>

          {/* INPUT BAR */}
          <div className="p-6 bg-[#0c0c0c] border-t border-stone-900">
            <div className="relative flex items-center">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isLoading}
                type="text" 
                placeholder={isLoading ? "Sabar ya, lagi mikir..." : "Tanya apa saja soal karir..."} 
                className="w-full bg-[#111] border border-stone-800 rounded-2xl py-5 pl-8 pr-20 outline-none focus:border-amber-500 transition-all text-sm placeholder:text-stone-700"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-3 p-3 bg-amber-500 text-black rounded-xl hover:bg-amber-400 disabled:bg-stone-800 disabled:text-stone-600 transition-all shadow-lg"
              >
                {isLoading ? <Loader2 className="animate-spin" size={22} /> : <Send size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* SIDEBAR TOOLS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#111] border border-stone-900 p-8 rounded-[2.5rem] shadow-xl">
            <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles size={14} /> Quick Action
            </h4>
            <div className="space-y-3">
              {['Bikinin Roadmap Karir', 'Tips Lolos Interview', 'Review Skill Saya', 'Gaji Software Engineer 2024'].map((hint, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(hint)}
                  className="w-full text-left p-4 rounded-2xl border border-stone-800 text-stone-400 text-[11px] font-bold hover:bg-stone-800 hover:text-white hover:border-amber-500/50 transition-all flex justify-between items-center group"
                >
                  {hint}
                  <Zap size={14} className="opacity-0 group-hover:opacity-100 text-amber-500" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-stone-900 to-black border border-stone-800 p-8 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />
            <Terminal size={32} className="mb-4 text-amber-500" />
            <h4 className="text-xl font-black italic tracking-tighter mb-2">SYSTEM SECURE</h4>
            <p className="text-xs font-bold text-stone-500 leading-relaxed">
              Percakapan kamu dienkripsi secara end-to-end. Oracle AI siap membantu 24/7.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}