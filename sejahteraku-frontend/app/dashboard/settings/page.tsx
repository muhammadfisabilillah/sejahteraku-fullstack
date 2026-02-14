'use client';

import { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  ShieldCheck, 
  Bell, 
  Save,
  Trash2,
  ChevronRight
} from 'lucide-react';

export default function SettingsPage() {
  const [userName, setUserName] = useState('Muhammad');
  const [email, setEmail] = useState('muhammad@sejahteraku.id');

  return (
    <div className="p-8 md:p-12 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
          <ShieldCheck size={14} /> Account Management
        </div>
        <h1 className="text-5xl font-display font-bold tracking-tighter">
          Profile <span className="italic text-stone-600">Settings.</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT COLUMN: AVATAR & QUICK STATS --- */}
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/5 rounded-[3rem] p-10 flex flex-col items-center text-center group">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-stone-800 border-2 border-amber-500/20 flex items-center justify-center overflow-hidden">
                <User size={64} className="text-stone-600 group-hover:text-amber-500 transition-colors" />
                {/* Overlay Upload */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 w-8 h-8 bg-amber-500 rounded-full border-4 border-[#0c0a09] flex items-center justify-center text-black">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              </div>
            </div>
            
            <h3 className="text-2xl font-display font-bold mb-1">{userName}</h3>
            <p className="text-xs text-stone-500 font-medium uppercase tracking-widest mb-6">Pro Member — Sejak 2026</p>
            
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1">Rank</p>
                <p className="text-sm font-bold text-amber-500 italic">Gold</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mb-1">Points</p>
                <p className="text-sm font-bold text-white">1,240</p>
              </div>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 rounded-[2.5rem] p-8 space-y-4 group hover:bg-red-500/10 transition-all">
            <h4 className="text-red-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Trash2 size={14} /> Danger Zone
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed italic">
              Menghapus akun akan menghilangkan semua sertifikat dan progres belajar secara permanen.
            </p>
            <button className="text-[10px] font-bold text-red-500 underline uppercase tracking-widest hover:text-white transition-colors">
              Delete Account
            </button>
          </div>
        </div>

        {/* --- RIGHT COLUMN: FORM SETTINGS --- */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/5 rounded-[3rem] p-8 md:p-12">
            <h3 className="text-xl font-display font-bold mb-10 flex items-center gap-4">
              <span className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black">
                <User size={16} />
              </span>
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={16} />
                  <input 
                    type="text" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-stone-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-amber-500/30 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600" size={16} />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-amber-500/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-xl font-display font-bold mb-10 flex items-center gap-4">
              <span className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center text-amber-500">
                <Lock size={16} />
              </span>
              Security & Privacy
            </h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/[0.07] transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center">
                    <Bell size={18} className="text-stone-500 group-hover:text-amber-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Email Notifications</p>
                    <p className="text-[10px] text-stone-500">Dapatkan update kursus dan lowongan baru.</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-amber-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full" />
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/[0.07] transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-stone-500 group-hover:text-amber-500">
                    <Lock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Change Password</p>
                    <p className="text-[10px] text-stone-500">Update kata sandi secara berkala.</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-stone-700" />
              </div>
            </div>

            <div className="mt-16 flex justify-end">
              <button className="flex items-center gap-3 px-10 py-5 bg-amber-500 text-black rounded-[2rem] font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-amber-500/20">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}