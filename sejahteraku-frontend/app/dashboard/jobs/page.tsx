"use client";

import React from 'react';
import { ArrowUpRight, Globe, Zap, Shield, Sparkles } from 'lucide-react';

const jobs = [
  {
    role: "Lead Interface Engineer",
    company: "Aether Corp",
    salary: "Rp 32M - 48M",
    type: "Remote",
    tags: ["Next.js", "Three.js", "Rust"],
    desc: "Building the next generation of spatial computing interfaces."
  },
  {
    role: "Senior AI Strategist",
    company: "Vertex Intelligence",
    salary: "Rp 28M - 40M",
    type: "Jakarta",
    tags: ["PyTorch", "LLM", "Strategy"],
    desc: "Define the roadmap for autonomous enterprise solutions."
  },
  {
    role: "Principal Product Designer",
    company: "Solaris Systems",
    salary: "Rp 25M - 35M",
    type: "Hybrid",
    tags: ["Design Ops", "Product", "Motion"],
    desc: "Crafting minimalist experiences for complex data systems."
  }
];

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] p-6 lg:p-12 font-sans">
      
      {/* UPPER SECTION: DASHBOARD HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-8">
          <p className="text-amber-500 font-black tracking-[0.4em] text-[10px] mb-6 uppercase">Available Positions</p>
          <h1 className="text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85] text-white">
            JOIN THE <br />
            <span className="text-transparent border-b-4 border-amber-500" style={{ WebkitTextStroke: '1px white' }}>ELITE.</span>
          </h1>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-end">
          <p className="text-stone-500 text-sm leading-relaxed max-w-[300px] border-l-2 border-stone-800 pl-6">
            Kami tidak mencari pekerja biasa. Kami mencari misionaris yang siap mendisrupsi industri melalui teknologi.
          </p>
        </div>
      </div>

      {/* BENTO STATS / HIGHLIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
        <div className="bg-[#111] p-8 rounded-[2rem] border border-stone-900 flex flex-col justify-between h-48">
          <Zap className="text-amber-500" size={32} />
          <div>
            <h4 className="text-3xl font-black italic">120+</h4>
            <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest">Active Missions</p>
          </div>
        </div>
        <div className="bg-amber-500 p-8 rounded-[2rem] text-black flex flex-col justify-between h-48">
          <Globe size={32} />
          <div>
            <h4 className="text-3xl font-black italic">GLOBAL</h4>
            <p className="text-black/60 text-[10px] uppercase font-bold tracking-widest">Remote Access</p>
          </div>
        </div>
        <div className="bg-[#111] p-8 rounded-[2rem] border border-stone-900 flex flex-col justify-between h-48">
          <Sparkles className="text-amber-500" size={32} />
          <div>
            <h4 className="text-3xl font-black italic">TOP 1%</h4>
            <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest">Selected Talent</p>
          </div>
        </div>
      </div>

      {/* THE LIST: EDITORIAL STYLE */}
      <div className="space-y-0 border-t border-stone-800">
        {jobs.map((job, i) => (
          <div 
            key={i} 
            className="group flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 border-b border-stone-800 hover:bg-[#0a0a0a] transition-all px-4"
          >
            <div className="lg:w-1/3 mb-6 lg:mb-0">
              <p className="text-stone-600 text-[10px] font-black mb-2 uppercase tracking-widest">0{i + 1} / {job.company}</p>
              <h3 className="text-3xl font-bold group-hover:text-amber-500 transition-all duration-300 italic uppercase italic tracking-tighter italic font-black">
                {job.role}
              </h3>
            </div>

            <div className="lg:w-1/3 mb-6 lg:mb-0">
              <p className="text-stone-400 text-sm max-w-xs">{job.desc}</p>
              <div className="flex gap-2 mt-4">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[9px] border border-stone-800 px-2 py-1 rounded text-stone-500 uppercase font-bold">{tag}</span>
                ))}
              </div>
            </div>

            <div className="lg:w-1/3 flex items-center justify-end gap-12 w-full">
              <div className="text-right">
                <p className="text-white font-bold text-sm">{job.salary}</p>
                <p className="text-stone-600 text-[10px] font-black uppercase tracking-widest">{job.type}</p>
              </div>
              <button className="w-16 h-16 rounded-full border border-stone-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                <ArrowUpRight size={28} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}