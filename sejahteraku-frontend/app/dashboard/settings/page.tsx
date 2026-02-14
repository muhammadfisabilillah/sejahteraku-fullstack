"use client";

import React, { useState, useEffect, useRef } from 'react';
import { User, FileText, Camera, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);
  
  // --- STATE DATA ---
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  
  const photoInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // --- 1. FUNGSI SEDOT DATA (BIAR NEMPEL PAS REFRESH) ---
  useEffect(() => {
    const syncIdentity = async () => {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:3000/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        
        if (res.ok && data) {
          setName(data.name || '');
          if (data.profile) {
            setRole(data.profile.skills || '');
            // Load foto asli dari folder uploads backend
            if (data.profile.avatar) {
              setProfilePreview(`http://localhost:3000/uploads/${data.profile.avatar}`);
            }
            if (data.profile.cv) {
              setCvFileName(data.profile.cv);
            }
          }
        }
      } catch (err) {
        console.error("Gagal sinkron data:", err);
      }
    };
    syncIdentity();
  }, []);

  // --- 2. LOGIC SAVE ALL ---
  const handleSaveAll = async () => {
    setIsLoading(true);
    setSaveStatus(false);
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('access_token');
      const formData = new FormData();
      
      const photoFile = photoInputRef.current?.files?.[0];
      const cvFile = cvInputRef.current?.files?.[0];

      if (photoFile) formData.append('avatar', photoFile);
      if (cvFile) formData.append('cv', cvFile);
      formData.append('name', name);
      formData.append('skills', role);

      const res = await fetch('http://localhost:3000/users/update-profile', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        setSaveStatus(true);
        const result = await res.json();
        // Update preview dengan file baru yang baru saja di-upload
        if (result.profile?.avatar) {
          setProfilePreview(`http://localhost:3000/uploads/${result.profile.avatar}`);
        }
        setTimeout(() => setSaveStatus(false), 3000);
      }
    } catch (error) {
      console.error("Gagal simpan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-stone-900 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter mb-2 uppercase">
              Identity <span className="text-amber-500">Center.</span>
            </h1>
            <p className="text-stone-500 text-[10px] uppercase font-black tracking-[0.4em]">Personal Data & Career Documents</p>
          </div>
          {saveStatus && (
            <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest animate-bounce">
              <CheckCircle2 size={16} /> Data Nempel di Database
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* FOTO PROFIL */}
          <div className="lg:col-span-4">
            <div className="bg-[#0a0a0a] border border-stone-900 rounded-[2.5rem] p-10 flex flex-col items-center shadow-2xl">
              <div 
                className="relative group cursor-pointer mb-8"
                onClick={() => photoInputRef.current?.click()}
              >
                <div className="w-44 h-44 rounded-full border-2 border-stone-800 p-2 overflow-hidden group-hover:border-amber-500 transition-all bg-[#111]">
                  {profilePreview ? (
                    <img 
                      src={profilePreview} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        console.error("Image load error:", profilePreview);
                        (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=User&background=333&color=fff";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex items-center justify-center bg-stone-900">
                      <User size={50} className="text-stone-700" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <Camera size={24} />
                </div>
                <input 
                  type="file" 
                  ref={photoInputRef} 
                  onChange={(e) => {
                    if (e.target.files?.[0]) setProfilePreview(URL.createObjectURL(e.target.files[0]));
                  }} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
              <h3 className="text-2xl font-bold italic tracking-tight uppercase">{name || 'Muhammad'}</h3>
              <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">{role || 'Fullstack Engineer'}</p>
            </div>
          </div>

          {/* FORM INPUT */}
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-stone-900 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest ml-2">Display Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#111] border border-stone-800 rounded-2xl py-5 px-8 text-sm outline-none focus:border-amber-500 transition-all" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest ml-2">Role / Skills</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#111] border border-stone-800 rounded-2xl py-5 px-8 text-sm outline-none focus:border-amber-500 transition-all" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest ml-2 flex items-center gap-2">
                <FileText size={14} /> Resume (PDF)
              </label>
              <div 
                onClick={() => cvInputRef.current?.click()}
                className={`border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center transition-all cursor-pointer 
                  ${cvFileName ? 'border-green-500/50 bg-green-500/5' : 'border-stone-800 hover:border-amber-500/50 bg-[#0c0c0c]'}`}
              >
                <FileText className={`mb-4 ${cvFileName ? 'text-green-500' : 'text-stone-700'}`} size={40} />
                <p className="text-xs font-black uppercase truncate max-w-full px-4">
                  {cvFileName || 'Upload Career Document'}
                </p>
                <input 
                  type="file" 
                  ref={cvInputRef} 
                  onChange={(e) => setCvFileName(e.target.files?.[0]?.name || null)} 
                  className="hidden" 
                  accept=".pdf" 
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-stone-900">
              <button 
                onClick={handleSaveAll}
                disabled={isLoading}
                className="bg-white text-black px-16 py-5 rounded-[2rem] font-black uppercase text-xs hover:bg-amber-500 transition-all flex items-center gap-4 shadow-xl disabled:bg-stone-800"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                Confirm & Sync
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}