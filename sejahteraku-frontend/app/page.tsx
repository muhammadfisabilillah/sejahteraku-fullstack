"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronDown } from 'lucide-react';
import { JobCard } from '../components/JobCard'; 
import { CourseCard } from '../components/CourseCard';
import { PostJobModal } from '../components/PostJobModal'; 

export default function SejahteraKuLanding() {
  // --- STATE LOGIC ---
  const [darkMode, setDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);

  // Ambil data dari Backend (NestJS)
  const fetchData = async () => {
    try {
      const resJobs = await axios.get('http://localhost:3000/jobs');
      const resCourses = await axios.get('http://localhost:3000/courses');
      setJobs(resJobs.data);
      setCourses(resCourses.data);
    } catch (err) {
      console.log("Koneksi backend gagal. Pastikan NestJS menyala di port 3000.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.position?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-1000 font-sans relative overflow-x-hidden ${darkMode ? 'bg-[#020202] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'}`}>
      
      {/* 🎇 LUXURY BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] transition-colors duration-1000 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-200/40'}`}></div>
        <div className={`absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] transition-colors duration-1000 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-200/50'}`}></div>
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:50px_50px]`}></div>
      </div>

      {/* 🧭 NAVBAR */}
      <nav className="relative z-50 flex justify-between items-center px-10 py-10 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-[0.2em] italic uppercase">SEJAHTERAKU<span className="text-emerald-500">.</span></div>
        <div className="flex items-center gap-10">
          <button onClick={() => setDarkMode(!darkMode)} className="text-[10px] font-black tracking-widest uppercase border-b-2 transition-all pb-1 border-emerald-500">
            {darkMode ? 'Onyx' : 'Alabaster'}
          </button>

          {/* ECOSYSTEM DROPDOWN */}
          <div className="relative group py-2">
            <button className="text-[10px] font-black tracking-[0.4em] uppercase opacity-60 group-hover:opacity-100 group-hover:text-emerald-500 transition-all flex items-center gap-2">
              Ecosystem <ChevronDown size={12} className="transition-transform group-hover:rotate-180 duration-500" />
            </button>
            <div className="absolute top-full right-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-50">
              <div className={`w-64 border p-8 shadow-2xl backdrop-blur-xl ${darkMode ? 'bg-[#080808]/95 border-white/10' : 'bg-white/95 border-black/10'}`}>
                <div className="space-y-8 text-right font-black tracking-[0.2em] text-[10px] uppercase">
                  <a href="#work" className="group/item block transition-all hover:text-emerald-500">01. Work_Portal</a>
                  <a href="#academy" className="group/item block border-t border-white/5 pt-6 hover:text-emerald-500">02. Skill_Academy</a>
                  <a href="#cert" className="group/item block border-t border-white/5 pt-6 hover:text-emerald-500">03. Certification</a>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className={`px-8 py-2.5 text-[10px] font-black tracking-[0.2em] uppercase transition-all shadow-2xl ${darkMode ? 'bg-white text-black hover:bg-emerald-500' : 'bg-black text-white hover:bg-emerald-600'}`}>
            Portal.v1
          </button>
        </div>
      </nav>

      {/* 🏛️ SECTION 00: FIRST LOOK (CLEAN & ELEGANT) */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-10">
        <div className="max-w-4xl">
          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.75] select-none uppercase">
            SHAPING <br /> 
            <span className={darkMode ? 'text-emerald-500' : 'text-emerald-600'}>FUTURES</span>.
          </h1>
          
          <p className="mt-12 text-sm md:text-lg font-medium leading-relaxed opacity-60 tracking-wide max-w-2xl italic">
            Ekosistem digital terintegrasi. Menghubungkan talenta strategis dengan peluang masa depan melalui pelatihan berbasis industri.
          </p>

          {/* Minimalist Info Bar - Adaptif Mode */}
          <div className={`mt-16 flex items-center gap-12 border-t pt-10 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter italic">2.4k+</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] mt-1 text-emerald-500 opacity-80">Talents_Active</span>
            </div>

            {/* Garis Pemisah Vertical Adaptif */}
            <div className={`w-[1px] h-10 hidden md:block ${darkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>

            <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tighter italic">150+</span>
              <span className="text-[8px] font-black uppercase tracking-[0.4em] mt-1 text-emerald-500 opacity-80">Global_Partners</span>
            </div>

            <div className={`w-[1px] h-10 hidden md:block ${darkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>

            <div className="flex flex-col">
              <span className={`text-[8px] font-black uppercase tracking-[0.4em] leading-loose max-w-[200px] ${darkMode ? 'opacity-40' : 'opacity-60'}`}>
                FAST_TRACK_SYSTEM // VERIFIED_ACCESS_ONLY.v1
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-10 flex items-center gap-6 opacity-20">
            <div className="w-12 h-[1px] bg-current"></div>
            <span className="text-[8px] font-black tracking-[0.6em] uppercase animate-pulse italic">Explore_Ecosystem</span>
        </div>
      </section>

      {/* 🛠️ SECTION 01: WORK_PORTAL */}
      <main id="work" className="relative z-10 max-w-7xl mx-auto px-10 py-40 border-t border-white/5">
        <div className="mb-20 flex justify-between items-end">
            <div>
                <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Section_01</span>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mt-2 underline decoration-emerald-500 decoration-4">Work_Portal.v1</h2>
            </div>
            <div className="w-64 relative group">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30" size={14} />
                <input 
                    type="text"
                    placeholder="SEARCH_JOBS..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-white/10 py-2 pl-8 outline-none text-[10px] font-black tracking-[0.2em] transition-all focus:border-emerald-500"
                />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} darkMode={darkMode} />)
          ) : (
            <div className="col-span-3 py-20 border border-dashed border-white/10 text-center uppercase tracking-[0.5em] text-[10px] opacity-30 italic">No_Match_Found.v1</div>
          )}
        </div>
      </main>

      {/* 🎓 SECTION 02: SKILL_ACADEMY */}
      <section id="academy" className="relative z-10 max-w-7xl mx-auto px-10 py-40 border-t border-white/5">
        <div className="mb-20">
            <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Section_02</span>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mt-2 underline decoration-emerald-500 decoration-4">Skill_Academy.v1</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {courses.length > 0 ? (
            courses.map((course) => <CourseCard key={course.id} course={course} darkMode={darkMode} />)
          ) : (
            <div className="col-span-3 py-20 border border-dashed border-white/10 text-center uppercase tracking-[0.5em] text-[10px] opacity-30 italic">No_Modules_Loaded.v1</div>
          )}
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && <PostJobModal darkMode={darkMode} onClose={() => setIsModalOpen(false)} onSave={fetchData} />}
    </div>
  );
}