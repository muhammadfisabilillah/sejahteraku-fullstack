"use client";

import React, { useState } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';

interface AuthModalProps {
  darkMode: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal = ({ darkMode, onClose, onLoginSuccess }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi Login (Karena kita sudah buat user 'muhammad@sejahteraku.com' di database)
    setTimeout(() => {
      if (email === 'muhammad@sejahteraku.com' && password === 'password123') {
        onLoginSuccess();
      } else {
        alert("Email atau Password salah. Gunakan kredensial dari database.");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className={`relative w-full max-w-md overflow-hidden border transition-all duration-500 shadow-2xl ${
        darkMode ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-black/10'
      }`}>
        
        {/* Decorative Top Bar */}
        <div className="h-1 w-full bg-emerald-500" />

        <div className="p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none">Access_Gateway</h2>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-2">Identify_Yourself.v1</p>
            </div>
            <button onClick={onClose} className="opacity-40 hover:opacity-100 transition-opacity">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50">Identity_Email</label>
              <div className="relative group">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:text-emerald-500 group-focus-within:opacity-100 transition-all" size={14} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@sejahteraku.com"
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-8 outline-none text-[12px] font-medium tracking-wide focus:border-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50">Identity_Key</label>
              <div className="relative group">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:text-emerald-500 group-focus-within:opacity-100 transition-all" size={14} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-b border-white/10 py-3 pl-8 outline-none text-[12px] font-medium tracking-wide focus:border-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 mt-6 text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-2 ${
                darkMode ? 'bg-white text-black hover:bg-emerald-500' : 'bg-black text-white hover:bg-emerald-600'
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                'Validate_Access'
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-[8px] font-black opacity-30 uppercase tracking-[0.2em]">
              Authorized_Personnel_Only // SejahteraKu_Secure_System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};