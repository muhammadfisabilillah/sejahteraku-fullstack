"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';

export function PostJobModal({ darkMode, onClose, onSave }: any) {
  const [newJob, setNewJob] = useState({ title: '', description: '' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={onClose}></div>
      <form onSubmit={(e) => { e.preventDefault(); onSave(newJob); }} className={`relative w-full max-w-xl p-12 border ${darkMode ? 'bg-[#050505] border-white/10' : 'bg-white border-black/10 text-black'}`}>
        <button type="button" onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-emerald-500"><X size={20} /></button>
        <h2 className="text-3xl font-black italic tracking-tighter mb-10 uppercase">Post_New_Data.</h2>
        <div className="space-y-10">
          <div className="border-b border-white/10">
            <label className="text-[10px] font-black tracking-[0.3em] uppercase mb-2 block text-emerald-500">Position_Title</label>
            <input required className="w-full bg-transparent pb-4 outline-none text-xl font-bold" onChange={(e) => setNewJob({...newJob, title: e.target.value})} />
          </div>
          <div className="border-b border-white/10">
            <label className="text-[10px] font-black tracking-[0.3em] uppercase mb-2 block text-emerald-500">Requirements_Desc</label>
            <textarea required className="w-full bg-transparent pb-4 outline-none text-sm leading-relaxed h-24 resize-none" onChange={(e) => setNewJob({...newJob, description: e.target.value})} />
          </div>
        </div>
        <button type="submit" className={`w-full mt-12 py-5 text-[10px] font-black tracking-[0.5em] uppercase transition-all ${darkMode ? 'bg-white text-black hover:bg-emerald-500' : 'bg-black text-white hover:bg-emerald-600'}`}>Deploy_Publication</button>
      </form>
    </div>
  );
}