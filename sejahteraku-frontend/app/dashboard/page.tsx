'use client';

import { 
  Zap, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  ArrowUpRight, 
  Play, 
  Calendar,
  ChevronRight,
  Target
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  return (
    <div className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* --- HEADER SECTION --- */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
            <Target size={14} /> Personal Performance
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter">
            System <span className="italic text-stone-600">Overview.</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
          <div className="px-4 py-2 text-right">
            <p className="text-[9px] text-stone-500 uppercase font-bold tracking-widest">Current Rank</p>
            <p className="text-sm font-bold text-amber-500">Gold Tier</p>
          </div>
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-black font-black shadow-lg shadow-amber-500/20">
            A+
          </div>
        </div>
      </header>

      {/* --- BENTO GRID STATS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {/* Main Banner Stat */}
        <div className="md:col-span-2 bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-[2.5rem] text-black relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-black/10 rounded-2xl">
                <Zap size={24} />
              </div>
              <ArrowUpRight size={24} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-1">Weekly Progress</p>
              <h3 className="text-5xl font-display font-bold leading-none mb-4">84%</h3>
              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                <div className="w-[84%] h-full bg-black shadow-[0_0_15px_rgba(0,0,0,0.3)]" />
              </div>
            </div>
          </div>
          <Sparkles className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-20 group-hover:rotate-12 transition-all duration-1000" />
        </div>

        {/* Small Stats */}
        <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:border-amber-500/30 transition-all flex flex-col justify-between group">
          <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="text-3xl font-display font-bold">32.5h</h4>
            <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest mt-2">Learning Hours</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] hover:border-amber-500/30 transition-all flex flex-col justify-between group">
          <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-all">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="text-3xl font-display font-bold">+12%</h4>
            <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest mt-2">Skill Growth</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- RECENT ACTIVITY (List) --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-2 px-4">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600">Continue Learning</h3>
            <Link href="/dashboard/academy" className="text-[10px] font-bold text-amber-500 hover:underline">View All</Link>
          </div>
          
          <div className="group bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] flex items-center justify-between hover:bg-white/[0.05] transition-all cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-stone-900 rounded-3xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="course" />
                <Play size={16} className="absolute inset-0 m-auto text-amber-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Next.js 15: The Cinematic Web</h4>
                <p className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                  <Clock size={12} /> Modul 02 — 45 mins left
                </p>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-amber-500 group-hover:text-black transition-all">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>

        {/* --- UPCOMING EVENTS --- */}
        <div className="space-y-6">
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600 ml-4">Upcoming Schedule</h3>
          <div className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="space-y-6">
              {[
                { time: '14:00 PM', title: 'UI Review with Mentor', date: 'Today' },
                { time: '09:00 AM', title: 'Next.js Workshop', date: 'Tomorrow' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    <div className="w-[1px] h-full bg-white/10" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-tighter">{item.time} — {item.date}</p>
                    <h5 className="text-sm font-bold mt-1 text-stone-200">{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 bg-stone-900 border border-white/5 rounded-2xl text-[9px] font-bold uppercase tracking-widest hover:border-amber-500/50 transition-all">
              Add To Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}