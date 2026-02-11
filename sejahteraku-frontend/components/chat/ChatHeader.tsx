'use client';

import { Sparkles, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ChatHeader = () => {
  const router = useRouter();
  return (
    <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-xl z-50 sticky top-0">
      <div className="flex items-center gap-4">
        <button onClick={() => router.push('/')} className="p-2 hover:bg-white/10 rounded-full transition text-zinc-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Sparkles size={22} />
          </div>
          <div>
              <h1 className="font-bold tracking-tight text-white text-md">SejahteraKu AI</h1>
              <div className="flex items-center gap-1.5 leading-none">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Live Consultant</p>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};