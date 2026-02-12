'use client';

import { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Search, 
  ArrowUpRight,
  Building2,
  Clock,
  Sparkles,
  Zap,
  Layers,
  Cpu,
  Globe,
  Timer
} from 'lucide-react';

export default function JobBoard() {
  const [activeTab, setActiveTab] = useState('Semua');

  const featuredJobs = [
    {
      id: 1,
      role: "Senior Lead Developer",
      company: "Google Inc.",
      location: "Jakarta, ID",
      salary: "Rp 35M+ / year",
      tags: ["Remote", "Full-time"],
      color: "from-blue-500/20",
      icon: <Zap className="text-blue-400" />
    },
    {
      id: 2,
      role: "Product Designer",
      company: "Aesthetic Studio",
      location: "Bali, ID",
      salary: "Rp 18M - 25M",
      tags: ["Hybrid", "Contract"],
      color: "from-amber-500/20",
      icon: <Layers className="text-amber-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0a09] p-6 md:p-12 lg:p-16 text-white overflow-hidden">
      {/* --- HEADER SECTION --- */}
      <div className="relative mb-16 lg:mb-20">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">Premium Opportunities</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none">
              Career <span className="italic text-stone-600">Archive.</span>
            </h1>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-all" size={20} />
              <input 
                type="text" 
                placeholder="Cari masa depanmu..." 
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-sm outline-none focus:border-amber-500/50 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURED SECTION --- */}
      <div className="mb-16">
        <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-stone-500 mb-8 ml-2">Editor's Choice</h2>
        <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide">
          {featuredJobs.map((job) => (
            <div key={job.id} className={`flex-shrink-0 w-[350px] md:w-[450px] bg-gradient-to-br ${job.color} to-transparent border border-white/10 p-8 md:p-10 rounded-[3rem] relative group cursor-pointer hover:border-white/20 transition-all duration-700`}>
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  {job.icon}
                </div>
                <div className="bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-2">{job.role}</h3>
              <p className="text-stone-400 font-medium italic mb-8">{job.company}</p>
              <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                <span className="flex items-center gap-2"><MapPin size={14} className="text-amber-500" /> {job.location}</span>
                <span className="flex items-center gap-2 font-bold text-white tracking-normal lowercase"><DollarSign size={14} className="text-amber-500" /> {job.salary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RECENT LIST --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-[10px] uppercase tracking-[0.5em] font-bold text-stone-500">Recent Postings</h2>
            <div className="flex gap-6">
              {['Semua', 'Remote', 'Full-time'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`text-[10px] uppercase tracking-widest font-bold transition-all ${activeTab === t ? 'text-amber-500 underline underline-offset-8 decoration-2' : 'text-stone-600 hover:text-stone-400'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          {[
            { role: "Backend Architect", co: "Sejahtera Corp", loc: "Singapore", price: "Flexible Price", time: "2h ago" },
            { role: "DevOps Engineer", co: "CloudVibe", loc: "Remote", price: "Rp 20M - 30M", time: "5h ago" },
            { role: "Mobile Dev (React)", co: "GOTO Group", loc: "Jakarta", price: "Competitive", time: "1d ago" },
          ].map((job, i) => (
            <div key={i} className="group bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center border border-white/5 flex-shrink-0">
                  <Building2 className="text-stone-600 group-hover:text-amber-500 transition-colors" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-display font-bold group-hover:text-amber-500 transition-colors">{job.role}</h4>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">
                    <span>{job.co}</span>
                    <span className="w-1 h-1 bg-stone-700 rounded-full" />
                    <span className="text-amber-500/70">{job.time}</span>
                  </div>
                </div>
              </div>
              
              {/* FIXED: HARGA TIDAK MENUMPUK LAGI */}
              <div className="flex flex-row md:flex-row items-center justify-between w-full md:w-auto gap-8 border-t border-white/5 pt-4 md:pt-0 md:border-0">
                <div className="flex flex-col text-left md:text-right min-w-[120px]">
                  <span className="text-sm font-bold text-white whitespace-nowrap">{job.price}</span>
                  <span className="text-[10px] text-stone-600 uppercase tracking-widest mt-1">{job.loc}</span>
                </div>
                <button className="bg-stone-800 text-white px-8 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95 whitespace-nowrap">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-amber-500 p-8 md:p-10 rounded-[3rem] text-black relative overflow-hidden group shadow-2xl shadow-amber-500/10">
              <h3 className="text-3xl font-display font-bold mb-4 tracking-tighter">Get Hired <br/>Faster.</h3>
              <p className="text-sm font-medium mb-8 opacity-80 leading-relaxed italic">Lengkapi profilmu dan biarkan AI kami mencocokkan skillmu dengan perusahaan.</p>
              <button className="w-full bg-black text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-900 transition-all">
                Complete Profile
              </button>
              <Cpu className="absolute -right-10 -bottom-10 w-40 h-40 opacity-10 group-hover:rotate-45 transition-transform duration-1000" />
           </div>

           <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-[3rem]">
              <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-stone-500 mb-8">Your Activity</h4>
              <div className="space-y-6">
                {[
                  { label: "Applied", val: "12", icon: <Timer size={20} className="text-blue-400" /> },
                  { label: "Interviews", val: "03", icon: <Zap size={20} className="text-amber-400" /> },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-4 text-sm font-bold text-stone-300 group-hover:text-white transition-colors">
                      {s.icon} <span>{s.label}</span>
                    </div>
                    <div className="text-2xl font-display font-bold italic text-white">{s.val}</div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}