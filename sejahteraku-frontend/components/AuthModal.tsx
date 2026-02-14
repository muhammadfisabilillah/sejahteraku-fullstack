"use client";

import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios';
import OtpModal from './auth/OtpModal';

interface AuthModalProps {
  darkMode: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal = ({ darkMode, onClose, onLoginSuccess }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // --- INI PEMICUNYA, BOS ---
  const [showOtp, setShowOtp] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:3000/auth/login', { email, password });
        localStorage.setItem('token', res.data.access_token);
        onLoginSuccess();
        onClose();
      } else {
        // PROSES DAFTAR
        await axios.post('http://localhost:3000/auth/register', { email, password, name });
        
        // SETELAH SUKSES DAFTAR, LAYAR BERUBAH KE OTP
        setEmailForOtp(email);
        setShowOtp(true); // <--- INI YANG BIKIN MODAL OTP MUNCUL!
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Gagal!");
    } finally {
      setIsLoading(false);
    }
  };

  // JIKA OTP LAGI MUNCUL, SEMBUNYIKAN FORM DAFTARNYA
  if (showOtp) {
    return <OtpModal isOpen={showOtp} email={emailForOtp} />;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 text-white">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[440px] bg-[#1a1a1a] border border-stone-800 rounded-[40px] p-12 shadow-2xl">
        <button onClick={onClose} className="absolute right-8 top-8 text-stone-500 hover:text-white"><X size={24} /></button>
        <h2 className="text-4xl font-black italic tracking-tighter leading-tight mb-10">
          {isLogin ? "Masuk Ke" : "Daftar"} <br />
          <span className="text-amber-500">{isLogin ? "Akun Anda." : "Akun Baru."}</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-xl py-4 px-6 outline-none focus:border-amber-500" required />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-xl py-4 px-6 outline-none focus:border-amber-500" required />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0f0f0f] border border-stone-800 rounded-xl py-4 px-6 outline-none focus:border-amber-500" required />
          </div>
          <button type="submit" className="w-full py-5 mt-4 bg-amber-500 text-black font-black uppercase tracking-widest rounded-xl hover:bg-amber-400 flex justify-center">
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? 'MASUK SEKARANG' : 'DAFTAR SEKARANG')}
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-stone-800">
          <button onClick={() => setIsLogin(!isLogin)} className="text-[11px] font-black uppercase tracking-widest text-amber-500 hover:text-white">
            {isLogin ? "// Buat Akun Baru" : "// Login Ke Akun"}
          </button>
        </div>
      </div>
    </div>
  );
};