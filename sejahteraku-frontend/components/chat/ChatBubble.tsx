'use client';

import React from 'react';
import { User, Bot } from 'lucide-react';

export const ChatBubble = ({ role, text }: { role: 'user' | 'ai'; text: string }) => (
  <div className={`flex w-full mb-6 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border ${
        role === 'user' ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white/10 border-white/10 text-blue-400'
      }`}>
        {role === 'user' ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Konten Pesan Transparan */}
      <div className={`flex flex-col ${role === 'user' ? 'items-end' : 'items-start'}`}>
        <div className={`p-4 rounded-[22px] text-sm leading-relaxed backdrop-blur-md shadow-xl transition-all ${
          role === 'user' 
          ? 'bg-blue-600/90 text-white rounded-tr-none' 
          : 'bg-white/5 border border-white/10 text-zinc-100 rounded-tl-none' // AI Transparan
        }`}>
          <div className="whitespace-pre-line italic">
            {text}
          </div>
        </div>
        <span className="text-[10px] text-zinc-500 mt-2 opacity-50 font-mono">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  </div>
);