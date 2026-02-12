'use client';

import { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Maximize, 
  CheckCircle2, 
  Lock, 
  ArrowLeft, 
  MessageCircle, 
  FileText, 
  Star, 
  Clock 
} from 'lucide-react';
import Link from 'next/link';

export default function VideoPlayerPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const curriculum = [
    { id: 1, title: "Pengenalan Ekosistem Cinematic Web", duration: "10:24", isCompleted: true, isLocked: false },
    { id: 2, title: "Instalasi Next.js 15 & Turbopack", duration: "15:45", isCompleted: false, isLocked: false },
    { id: 3, title: "Membangun Struktur Folder Profesional", duration: "12:10", isCompleted: false, isLocked: true },
    { id: 4, title: "Implementasi Framer Motion & Animasi", duration: "20:05", isCompleted: false, isLocked: true },
  ];

  return (
    <div className="p-6 md:p-12 animate-in fade-in duration-700">
      {/* Tombol Kembali ke Daftar Kursus */}
      <div className="mb-10">
        <Link href="/dashboard/academy" className="group inline-flex items-center gap-3 text-stone-500 hover:text-amber-500 transition-all font-bold text-[10px] uppercase tracking-[0.3em]">
          <div className="p-2 bg-white/5 rounded-xl group-hover:bg-amber-500 group-hover:text-black transition-all">
            <ArrowLeft size={16} />
          </div>
          Kembali ke Academy
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* --- AREA KIRI: VIDEO PLAYER --- */}
        <div className="lg:col-span-8 space-y-10">
          <div className="relative aspect-video rounded-[3rem] overflow-hidden bg-stone-900 border border-white/5 shadow-2xl group">
            <img 
              src="/hero-image.jpg" 
              className="w-full h-full object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-[3000ms]"
              alt="Video Thumbnail"
            />
            
            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-all active:scale-95 z-10"
              >
                {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </button>
            </div>

            {/* Video Controls Fake Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="flex-grow h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-amber-500" />
                </div>
                <div className="flex gap-4 text-white/70">
                  <Volume2 size={18} />
                  <Maximize size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <h1 className="text-4xl font-display font-bold tracking-tighter italic">Instalasi Next.js 15 & <span className="text-amber-500">Turbopack</span></h1>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all">
                <Star size={14} /> Rate Modul
              </button>
            </div>
            <p className="text-stone-500 leading-relaxed max-w-3xl italic">
              Pelajari cara mengoptimalkan kecepatan development menggunakan engine terbaru dari Next.js. Kita akan memastikan semua konfigurasi berjalan sempurna di port 3000.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="flex items-center gap-3 px-8 py-4 bg-stone-900 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-white/5 hover:border-amber-500 transition-all">
                <FileText size={18} /> Asset Proyek
              </button>
              <button className="flex items-center gap-3 px-8 py-4 bg-stone-900 rounded-2xl text-[10px] font-bold uppercase tracking-widest border border-white/5 hover:border-amber-500 transition-all">
                <MessageCircle size={18} /> Diskusi
              </button>
            </div>
          </div>
        </div>

        {/* --- AREA KANAN: CURRICULUM --- */}
        <div className="lg:col-span-4">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600 mb-8 ml-4">Materi Pelatihan</h3>
          <div className="space-y-4">
            {curriculum.map((item) => (
              <div 
                key={item.id}
                className={`group p-6 rounded-[2.2rem] border transition-all duration-500 cursor-pointer ${
                  item.id === 2 
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' 
                  : 'bg-white/5 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${item.id === 2 ? 'text-black/50' : 'text-stone-600'}`}>
                    0{item.id} — Module
                  </span>
                  {item.isLocked ? <Lock size={12} className="opacity-40" /> : item.isCompleted && <CheckCircle2 size={14} />}
                </div>
                <h4 className="font-display font-bold text-base leading-tight">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-bold mt-4 opacity-50">
                  <Clock size={12} /> {item.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}