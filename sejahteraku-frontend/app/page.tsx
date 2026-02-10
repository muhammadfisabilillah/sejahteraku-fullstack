"use client";

import React, { useState } from 'react';
import axios from 'axios';

const JOBS_DATA = [
  { id: 1, title: "Backend Developer", description: "Membangun arsitektur server yang kuat menggunakan NestJS dan PostgreSQL." },
  { id: 2, title: "Frontend Engineer", description: "Slicing desain premium dengan Next.js, Tailwind CSS, dan Framer Motion." },
  { id: 3, title: "DevOps Engineer", description: "Mengelola infrastruktur cloud dan CI/CD pipeline untuk aplikasi skala besar." }
];

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-1000 font-sans overflow-hidden relative ${darkMode ? 'bg-[#020202] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'}`}>
      
      {/* 🎇 DYNAMIC GRADIENT BACKGROUND (MAHAL) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Lingkaran Gradasi Bergerak */}
        <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] animate-[pulse_12s_infinite] transition-colors duration-1000 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-200/40'}`}></div>
        <div className={`absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] animate-[pulse_18s_infinite] transition-colors duration-1000 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-200/50'}`}></div>
        
        {/* GRID OVERLAY HALUS */}
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:50px_50px]`}></div>
      </div>

      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-10 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-[0.2em] italic uppercase">
          SEJAHTERAKU<span className="text-emerald-500">.</span>
        </div>
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`text-[10px] font-black tracking-widest uppercase border-b-2 transition-all pb-1 ${darkMode ? 'border-emerald-500 text-white' : 'border-emerald-600 text-black'}`}
          >
            {darkMode ? 'Mode: Onyx' : 'Mode: Alabaster'}
          </button>
          <button className={`px-8 py-2.5 text-[10px] font-black tracking-[0.2em] uppercase transition-all shadow-2xl ${darkMode ? 'bg-white text-black hover:bg-emerald-500' : 'bg-black text-white hover:bg-emerald-600'}`}>
            Portal.v1
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 max-w-7xl mx-auto px-10 pt-24 pb-40">
        <div className="max-w-4xl">
          <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase mb-6 block">
            Integrated AI Intelligence
          </span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-12">
            SHAPING <br /> 
            <span className={darkMode ? 'text-gray-400' : 'text-gray-800'}>FUTURES.</span>
          </h1>
          <p className={`text-lg max-w-lg leading-relaxed font-medium transition-colors duration-1000 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            Portal karir eksklusif untuk sektor manufaktur & logistik. <br />
            Dikelola dengan presisi tinggi.
          </p>
        </div>

        {/* LIST LOWONGAN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-28">
          {JOBS_DATA.map((job) => (
            <JobCard key={job.id} job={job} darkMode={darkMode} />
          ))}
        </div>
      </main>
    </div>
  );
}

function JobCard({ job, darkMode }: { job: any, darkMode: boolean }) {
  const [aiAdvice, setAiAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    setIsLoading(true);
    setAiAdvice("");
    try {
      const response = await axios.post('http://localhost:3000/ai/consult', {
        title: job.title,
        description: job.description,
      });
      setAiAdvice(response.data.advice);
    } catch (error) {
      setAiAdvice("Backend Offline.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`group relative p-10 border transition-all duration-700 shadow-2xl ${
      darkMode 
      ? 'bg-[#080808] border-white/[0.03] hover:border-emerald-500/30' 
      : 'bg-white border-black/[0.03] hover:border-emerald-600 shadow-gray-200'
    }`}>
      {/* Decorative Line */}
      <div className={`absolute top-0 left-0 w-[1px] h-0 transition-all duration-700 group-hover:h-full bg-emerald-500`}></div>
      
      <h4 className="text-lg font-bold mb-4 tracking-tight">{job.title}</h4>
      <p className={`text-[11px] mb-12 h-16 leading-relaxed font-medium transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        {job.description}
      </p>

      <button
        onClick={handleAskAI}
        disabled={isLoading}
        className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border
          ${isLoading 
            ? 'bg-transparent border-gray-800 text-gray-700' 
            : darkMode 
              ? 'bg-white text-black border-white hover:bg-transparent hover:text-white'
              : 'bg-black text-white border-black hover:bg-transparent hover:text-black'
          }`}
      >
        {isLoading ? "Analyzing..." : "Consult AI"}
      </button>

      {aiAdvice && (
        <div className={`mt-8 p-6 border-l-2 text-[10px] leading-relaxed font-medium animate-in fade-in slide-in-from-left-2 duration-1000 ${
          darkMode ? 'bg-emerald-500/5 border-emerald-500 text-gray-400' : 'bg-emerald-50 border-emerald-600 text-gray-800'
        }`}>
          <span className="font-black text-emerald-600 block mb-2 uppercase tracking-widest">Mentor Analysis:</span>
          "{aiAdvice}"
        </div>
      )}
    </div>
  );
}