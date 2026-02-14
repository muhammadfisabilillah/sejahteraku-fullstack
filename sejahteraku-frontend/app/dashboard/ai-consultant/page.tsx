"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Terminal, Cpu, Zap, Loader2, FileUp, FileSearch, UploadCloud, CheckCircle2 } from 'lucide-react';

export default function AIConsultantPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Sistem aktif. Halo Muhammad, aku **SejahteraKu AI**. Seret file CV kamu ke sini atau tanya apa saja! 😊' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. SYNC HISTORY (Ingatan Oracle)
  useEffect(() => {
    const loadHistory = async () => {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:3000/chat/history', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.length > 0) {
          const historyArr: { role: string; content: string }[] = [];
          data.forEach((d: any) => {
            historyArr.push({ role: 'user', content: d.message });
            historyArr.push({ role: 'assistant', content: d.response });
          });
          setMessages(historyArr);
        }
      } catch (e) { console.error("Sync history gagal"); }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // --- 2. LOGIC DRAG & DROP ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("image"))) {
      setSelectedFile(file);
    } else {
      alert("Hanya file PDF atau Gambar yang diizinkan, Bos!");
    }
  };

  // --- 3. FUNGSI UPLOAD & REVIEW ---
  const handleUploadAndReview = async () => {
    const file = selectedFile || fileInputRef.current?.files?.[0];
    if (!file) return alert("Seret atau pilih file dulu!");

    setIsLoading(true);
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    const formData = new FormData();
    formData.append('cv', file);

    try {
      // Tambahkan pesan user ke chat
      setMessages(prev => [...prev, { role: 'user', content: `[SYSTEM: Uploading ${file.name}] Mohon review CV terbaru saya.` }]);

      const res = await fetch('http://localhost:3000/chat/upload-review-cv', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response || "Analisis selesai, Bos! CV lo udah mantep." }]);
        setSelectedFile(null); // Reset file after success
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Oracle gagal memproses file. Pastikan PDF lo teks asli, bukan foto!' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Koneksi ke Oracle Server terputus.' }]);
    } finally { setIsLoading(false); }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setMessages(prev => [...prev, { role: 'user', content: currentInput }]);
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      const res = await fetch('http://localhost:3000/ai-consultant/ask', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ question: currentInput }), 
      });
      const data = await res.json();
      if (res.ok) setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (e) { setMessages(prev => [...prev, { role: 'assistant', content: 'Sistem sedang offline.' }]); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12 flex flex-col relative overflow-hidden"
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}>
      
      {/* DRAG OVERLAY - VISUAL FEEDBACK */}
      {isDragging && (
        <div className="fixed inset-0 z-[100] bg-amber-500/10 backdrop-blur-xl border-4 border-dashed border-amber-500/50 flex items-center justify-center pointer-events-none transition-all">
          <div className="bg-black/80 p-16 rounded-[4rem] border border-amber-500/20 text-center shadow-[0_0_100px_rgba(245,158,11,0.2)]">
            <UploadCloud size={100} className="mx-auto text-amber-500 animate-bounce mb-6" />
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Lepas File CV Lo Di Sini.</h2>
            <p className="text-amber-500/50 font-bold mt-4 tracking-widest uppercase text-xs">Oracle siap membedah datamu</p>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8 border-b border-stone-900 pb-8 relative z-10">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter flex items-center gap-3 uppercase">
            <Cpu className={`text-amber-500 ${isLoading ? 'animate-spin' : ''}`} size={32} /> 
            ORACLE <span className="text-amber-500">AI.</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-stone-500 text-[10px] uppercase font-black tracking-[0.4em] italic">Identity: ID-07-Verified</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden relative z-10">
        {/* CHAT WINDOW */}
        <div className="lg:col-span-8 flex flex-col bg-[#0a0a0a] border border-stone-900 rounded-[3rem] overflow-hidden shadow-2xl h-[650px] relative">
          <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-8 no-scrollbar scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${msg.role === 'user' ? 'bg-amber-500 text-black' : 'bg-[#151515] border border-stone-800'}`}>
                    {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-6 rounded-[2.5rem] text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                    ? 'bg-zinc-900 text-white rounded-tr-none border border-zinc-800' 
                    : 'bg-[#111] text-zinc-400 rounded-tl-none border border-stone-900 shadow-inner'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 items-center bg-amber-500/5 border border-amber-500/20 p-5 rounded-[2rem] w-fit animate-pulse">
                <Loader2 className="animate-spin text-amber-500" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 italic">Oracle sedang membedah dokumen...</span>
              </div>
            )}
          </div>

          {/* INPUT BAR */}
          <div className="p-6 bg-[#0c0c0c] border-t border-stone-900">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ketik pertanyaan atau drag file ke sini..." 
                  className="w-full bg-[#050505] border border-stone-800 rounded-2xl py-5 pl-8 pr-16 outline-none focus:border-amber-500 transition-all text-sm placeholder:text-stone-700 font-medium"
                />
                <button onClick={handleSend} className="absolute right-3 top-2.5 p-3 text-amber-500 hover:text-white transition-colors"><Send size={22} /></button>
              </div>
              
              <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
              
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className={`p-5 rounded-2xl border transition-all duration-500 ${selectedFile ? 'bg-green-500/10 border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)]' : 'bg-[#050505] border-stone-800 text-stone-500 hover:border-amber-500'}`}
              >
                {selectedFile ? <CheckCircle2 size={22} /> : <FileUp size={22} />}
              </button>
            </div>
            {selectedFile && (
              <div className="flex items-center gap-2 mt-3 ml-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                 <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest italic">
                   Ready: {selectedFile.name} — Click "Review Local CV"
                 </p>
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR TOOLS */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0a0a0a] border border-stone-900 p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
              <Sparkles size={80} className="text-amber-500" />
            </div>
            
            <button 
              onClick={handleUploadAndReview}
              disabled={isLoading || !selectedFile}
              className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs hover:bg-amber-500 transition-all flex items-center justify-center gap-3 mb-8 shadow-2xl disabled:bg-stone-900 disabled:text-stone-800 disabled:border-stone-900 border border-transparent"
            >
              <FileSearch size={18} /> Review Local CV
            </button>
            
            <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={14} className="animate-pulse" /> Core Intelligence
            </h4>
            
            <div className="space-y-3">
              {['Bikinin Roadmap Karir', 'Review Skill Saya', 'Tips Lolos Interview'].map((hint, i) => (
                <button 
                  key={i} 
                  onClick={() => setInput(hint)} 
                  className="w-full text-left p-5 rounded-2xl border border-stone-900 bg-[#050505] text-stone-500 text-[11px] font-bold hover:bg-zinc-900 hover:text-white hover:border-amber-500/50 transition-all flex justify-between items-center group"
                >
                  {hint} <Zap size={14} className="opacity-0 group-hover:opacity-100 text-amber-500 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0a0a0a] to-black border border-stone-900 p-8 rounded-[3rem] relative shadow-2xl">
            <Terminal size={32} className="mb-4 text-amber-500 opacity-50" />
            <h4 className="text-xl font-black italic tracking-tighter mb-2 uppercase">System Status</h4>
            <p className="text-[10px] font-bold text-stone-600 leading-relaxed uppercase tracking-widest">
              Seret dokumen PDF lo ke area chat untuk analisis ATS otomatis. Data dienkripsi 256-bit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}