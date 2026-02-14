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
  Target,
  Trophy,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* --- BACKGROUND IMAGE FROM UNSPLASH --- */}
      <div className="fixed inset-0 -z-10">
        {/* Background Image - Multiple beautiful options */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop')`
          }}
        />
        
        {/* Dark Overlay for better readability */}
        <div className="absolute inset-0 bg-black/80" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-amber-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Subtle animated gradient orbs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.8) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(245, 158, 11, 0.8) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative p-6 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* --- HEADER SECTION --- */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold tracking-[0.3em] uppercase text-[10px]">
              <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
              <Target size={14} /> Personal Performance
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter bg-gradient-to-br from-white via-amber-100 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
              System <span className="italic font-light">Overview.</span>
            </h1>
          </div>
          
          {/* Achievement Stats */}
          <div className="flex items-center gap-3">
            {/* Streak Counter */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-3xl shadow-2xl shadow-amber-500/10 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Zap size={18} className="text-amber-400 fill-amber-400" />
                  <span className="text-2xl font-black text-white">7</span>
                </div>
                <div className="text-left">
                  <p className="text-[8px] text-stone-400 uppercase font-bold tracking-widest">Day</p>
                  <p className="text-[9px] font-bold text-amber-400 tracking-tight">Streak</p>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-xl border border-amber-400/30 px-6 py-3 rounded-3xl shadow-2xl shadow-amber-500/20 hover:scale-105 transition-transform duration-300 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Trophy size={18} className="text-black" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                  </div>
                  <p className="text-[9px] font-bold text-amber-400 tracking-tight uppercase">Top Learner</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- BENTO GRID STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
          {/* Main Banner Stat */}
          <div className="md:col-span-2 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-8 md:p-10 rounded-[2rem] text-black relative overflow-hidden group shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/0 via-white/5 to-white/20" />
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
            <div className="relative z-10 h-full flex flex-col justify-between gap-8">
              <div className="flex justify-between items-start">
                <div className="p-3.5 bg-black/15 backdrop-blur-sm rounded-2xl border border-black/10 group-hover:scale-110 transition-transform duration-300">
                  <Zap size={28} strokeWidth={2.5} />
                </div>
                <ArrowUpRight size={28} className="opacity-40 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-70 mb-2">Weekly Progress</p>
                <h3 className="text-6xl md:text-7xl font-display font-black leading-none mb-6 tracking-tighter">84%</h3>
                <div className="w-full h-3 bg-black/15 rounded-full overflow-hidden backdrop-blur-sm border border-black/10">
                  <div className="w-[84%] h-full bg-black rounded-full shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-all duration-1000 ease-out" />
                </div>
              </div>
            </div>
            <Sparkles className="absolute right-[-30px] bottom-[-30px] w-56 h-56 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-1000" strokeWidth={1.5} />
          </div>

          {/* Small Stats */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-7 rounded-[2rem] hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <Clock size={24} strokeWidth={2.5} />
            </div>
            <div className="mt-auto relative z-10">
              <h4 className="text-4xl font-display font-black tracking-tight bg-gradient-to-br from-white to-stone-300 bg-clip-text text-transparent">32.5h</h4>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-[0.3em] mt-2.5">Learning Hours</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-7 rounded-[2rem] hover:border-amber-400/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 w-14 h-14 bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-black group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <TrendingUp size={24} strokeWidth={2.5} />
            </div>
            <div className="mt-auto relative z-10">
              <h4 className="text-4xl font-display font-black tracking-tight bg-gradient-to-br from-white to-stone-300 bg-clip-text text-transparent">+12%</h4>
              <p className="text-[10px] text-stone-400 uppercase font-bold tracking-[0.3em] mt-2.5">Skill Growth</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- RECENT ACTIVITY (List) --- */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between mb-1 px-2">
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-500">Continue Learning</h3>
              <Link href="/dashboard/academy" className="text-[10px] font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 group">
                View All 
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            
            <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 p-7 rounded-[2rem] flex items-center justify-between hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl overflow-hidden relative ring-2 ring-white/10 group-hover:ring-amber-400/30 transition-all duration-300 shadow-xl">
                  <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500" alt="course" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={16} className="text-black fill-black ml-0.5" strokeWidth={0} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 group-hover:text-amber-400 transition-colors">Next.js 15: The Cinematic Web</h4>
                  <p className="text-xs text-stone-400 mt-1.5 flex items-center gap-2">
                    <Clock size={13} strokeWidth={2.5} /> Modul 02 — 45 mins left
                  </p>
                </div>
              </div>
              <div className="relative z-10 p-4 bg-white/5 rounded-2xl group-hover:bg-gradient-to-br group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-black transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                <ChevronRight size={22} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* --- UPCOMING EVENTS --- */}
          <div className="space-y-5">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-500 ml-2">Upcoming Schedule</h3>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] relative overflow-hidden shadow-xl hover:shadow-2xl hover:border-white/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-50" />
              <div className="space-y-7 relative z-10">
                {[
                  { time: '14:00 PM', title: 'UI Review with Mentor', date: 'Today' },
                  { time: '09:00 AM', title: 'Next.js Workshop', date: 'Tomorrow' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group/item hover:translate-x-1 transition-transform duration-300">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50 group-hover/item:scale-125 transition-transform" />
                      {i === 0 && <div className="w-[2px] h-full bg-gradient-to-b from-amber-400/50 to-white/5 mt-1" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">{item.time} — {item.date}</p>
                      <h5 className="text-sm font-bold text-stone-200 group-hover/item:text-amber-400 transition-colors">{item.title}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <button className="relative z-10 w-full mt-8 py-4 bg-gradient-to-br from-stone-900 to-stone-800 border border-white/10 rounded-2xl text-[9px] font-bold uppercase tracking-[0.3em] hover:border-amber-400/50 hover:bg-gradient-to-br hover:from-amber-400 hover:to-amber-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/20 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <span className="relative flex items-center justify-center gap-2">
                  <Calendar size={14} className="group-hover:rotate-12 transition-transform" />
                  Add To Calendar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}