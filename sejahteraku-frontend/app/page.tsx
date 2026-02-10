"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronDown, Lock, Award, ArrowRight, ShieldCheck, Zap, Globe, Users } from 'lucide-react';
import { JobCard } from '../components/JobCard'; 
import { CourseCard } from '../components/CourseCard';
import { AuthModal } from '../components/AuthModal';

export default function SejahteraKuLanding() {
  const [darkMode, setDarkMode] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);

  const fetchData = async () => {
    try {
      const resJobs = await axios.get('http://localhost:3000/jobs');
      const resCourses = await axios.get('http://localhost:3000/courses');
      setJobs(resJobs.data);
      setCourses(resCourses.data);
      
      if (isLoggedIn) {
        const resCerts = await axios.get('http://localhost:3000/certificates/user/1');
        setCertificates(resCerts.data);
      }
    } catch (err) {
      console.log("Connection failed.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 font-sans relative overflow-x-hidden ${darkMode ? 'bg-[#020202] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'}`}>
      
      {/* 🎇 LUXURY ANIMATED BACKGROUND (GANTI BAGIAN INI) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Bola Cahaya 01 */}
        <div 
          className={`absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full blur-[150px] transition-colors duration-1000 ${darkMode ? 'bg-emerald-900/20' : 'bg-emerald-200/40'}`} 
          style={{ animation: 'float 20s infinite alternate' }}
        />
        
        {/* Bola Cahaya 02 */}
        <div 
          className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[150px] transition-colors duration-1000 ${darkMode ? 'bg-slate-900/30' : 'bg-slate-200/50'}`} 
          style={{ animation: 'float 25s infinite alternate-reverse' }}
        />

        {/* Mesh Gradient Overlay */}
        <div className={`absolute inset-0 opacity-30 ${darkMode ? 'bg-[radial-gradient(circle_at_50%_50%,#10b98110_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,#10b98120_0%,transparent_50%)]'}`} />

        {/* Grid Tekstur */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* 🧭 NAVBAR */}
      <nav className="relative z-50 flex justify-between items-center px-10 py-8 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-[0.2em] italic uppercase select-none">SEJAHTERAKU<span className="text-emerald-500">.</span></div>
        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] opacity-50">
            <a href="#about" className="hover:text-emerald-500 transition-all">About</a>
            <a href="#work" className="hover:text-emerald-500 transition-all">Careers</a>
            <a href="#academy" className="hover:text-emerald-500 transition-all">Academy</a>
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="text-[10px] font-black tracking-widest uppercase border-b-2 transition-all pb-1 border-emerald-500">
            {darkMode ? 'Onyx' : 'Alabaster'}
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
               <span className="text-[10px] font-black tracking-widest uppercase opacity-50 italic">Verified_User</span>
               <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-black">M</div>
            </div>
          ) : (
            <button onClick={() => setIsAuthModalOpen(true)} className={`px-8 py-2.5 text-[10px] font-black tracking-[0.2em] uppercase transition-all shadow-2xl ${darkMode ? 'bg-white text-black hover:bg-emerald-500' : 'bg-black text-white hover:bg-emerald-600'}`}>
              Login.v1
            </button>
          )}
        </div>
      </nav>

      {/* 🏛️ SECTION 00: HERO */}
      <section className="relative z-10 min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-10">
        <div className="max-w-4xl">
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.75] select-none uppercase">
            SHAPING <br /> 
            <span className={darkMode ? 'text-emerald-500' : 'text-emerald-600'}>FUTURES</span>.
          </h1>
          <p className="mt-12 text-sm md:text-xl font-medium leading-relaxed opacity-60 tracking-wide max-w-2xl italic">
            Platform ekosistem digital terintegrasi untuk akselerasi karier. Kami menjembatani kesenjangan antara pendidikan dan kebutuhan industri global.
          </p>
          <div className="mt-12 flex gap-4">
            <button onClick={() => window.scrollTo({top: 1000, behavior: 'smooth'})} className="px-10 py-4 bg-emerald-500 text-black font-black text-[10px] tracking-[0.3em] uppercase hover:scale-105 transition-all">
                Explore_Now
            </button>
          </div>
        </div>
      </section>

      {/* 📖 SECTION 01: ABOUT */}
      <section id="about" className="relative z-10 max-w-7xl mx-auto px-10 py-40 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
                <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">The_Vision</span>
                <h2 className="text-5xl font-black italic tracking-tighter uppercase mt-4 mb-8">Empowering The <br/> Digital Workforce.</h2>
                <div className="space-y-6 opacity-60 text-sm leading-loose tracking-wide">
                    <p>SejahteraKu bukan sekadar portal kerja. Kami adalah infrastruktur pengembangan karier yang dirancang untuk memastikan setiap talenta memiliki akses ke pendidikan berkualitas.</p>
                    <p>Melalui integrasi antara <strong>Marketplace Tenaga Kerja</strong> dan <strong>Akademi Keterampilan</strong>, kami menciptakan siklus pertumbuhan bagi individu maupun perusahaan.</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Users size={24}/>, label: "Community", desc: "2,400+ Talents" },
                  { icon: <Globe size={24}/>, label: "Global Access", desc: "150+ Partners" },
                  { icon: <Zap size={24}/>, label: "Fast Track", desc: "Industry Standard" },
                  { icon: <ShieldCheck size={24}/>, label: "Verified", desc: "Blockchain Certs" }
                ].map((item, idx) => (
                  <div key={idx} className={`p-8 border transition-all hover:border-emerald-500/50 ${darkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-black/5'}`}>
                      <div className="text-emerald-500 mb-4">{item.icon}</div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest mb-2">{item.label}</h3>
                      <p className="text-[10px] opacity-40 uppercase leading-relaxed">{item.desc}</p>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* 💼 SECTION 02: WORK (GATED) */}
      <main id="work" className="relative z-10 max-w-7xl mx-auto px-10 py-40 border-t border-white/5">
        <div className="mb-20">
            <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Section_02</span>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mt-2">Work_Portal.v1</h2>
        </div>

        <div className="relative">
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 transition-all duration-1000 ${!isLoggedIn ? 'blur-md grayscale opacity-20' : ''}`}>
                {jobs.slice(0, 3).map((job) => <JobCard key={job.id} job={job} darkMode={darkMode} />)}
            </div>
            {!isLoggedIn && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
                    <Lock size={30} className="text-emerald-500 mb-4" />
                    <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className={`px-10 py-4 font-black text-[10px] tracking-[0.3em] uppercase transition-all border ${darkMode ? 'bg-white text-black hover:bg-emerald-500' : 'bg-black text-white hover:bg-emerald-600'}`}
                    >
                        Login_to_View_Jobs
                    </button>
                </div>
            )}
        </div>
      </main>

      {/* 🎓 SECTION 03: ACADEMY (GATED) */}
      <section id="academy" className="relative z-10 max-w-7xl mx-auto px-10 py-40 border-t border-white/5 bg-[#0a0a0a]/20 backdrop-blur-3xl">
        <div className="mb-20">
            <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Section_03</span>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mt-2">Skill_Academy.v1</h2>
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-12 ${!isLoggedIn ? 'blur-sm opacity-20' : ''}`}>
            {courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} darkMode={darkMode} />)}
        </div>
      </section>

      {/* 📜 SECTION 04: CERT (LOGGED IN ONLY) */}
      {isLoggedIn && (
        <section id="cert" className="relative z-10 max-w-7xl mx-auto px-10 py-40 border-t border-white/5">
            <div className="mb-20">
                <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">Section_04</span>
                <h2 className="text-4xl font-black italic tracking-tighter uppercase mt-2">Cert_Vault.v1</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {certificates.map((cert) => (
                    <div key={cert.id} className={`p-10 border flex justify-between items-center group transition-all duration-500 ${darkMode ? 'bg-white/5 border-white/10 hover:border-emerald-500' : 'bg-black/5 border-black/10 hover:border-emerald-600'}`}>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Award size={14} className="text-emerald-500" />
                                <span className="text-[8px] font-black tracking-widest opacity-40 uppercase">Verified_Certification</span>
                            </div>
                            <h4 className="text-xl font-black tracking-tighter uppercase">{cert.course?.title}</h4>
                            <p className="text-[10px] opacity-40 mt-1 uppercase italic tracking-widest">ID: {cert.id.substring(0, 8)}</p>
                        </div>
                        <div className="p-3 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                            <ArrowRight size={16} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* 🤝 SECTION 05: PARTNERS */}
      <section className="relative z-10 max-w-7xl mx-auto px-10 py-20 opacity-30">
        <div className="flex flex-wrap justify-between gap-10 items-center">
            {["TECH_CORP", "NEXUS_SYSTEM", "OAK_ACADEMY", "GLOBAL_DEV", "ELITE_HUB"].map((partner, i) => (
              <span key={i} className="font-black italic text-2xl tracking-tighter">{partner}</span>
            ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-7xl mx-auto px-10 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
            <div className="text-xl font-black tracking-[0.2em] italic uppercase mb-2">SEJAHTERAKU<span className="text-emerald-500">.</span></div>
            <p className="text-[9px] font-black tracking-[0.3em] uppercase opacity-30">Building the future of digital talent.</p>
        </div>
        <div className="flex gap-12 text-[10px] font-black tracking-widest opacity-40 uppercase">
            <a href="#" className="hover:text-emerald-500">Privacy_Policy</a>
            <a href="#" className="hover:text-emerald-500">Terms_of_Service</a>
            <a href="#" className="hover:text-emerald-500">Contact_Us</a>
        </div>
      </footer>

      {/* AUTH MODAL */}
      {isAuthModalOpen && (
        <AuthModal 
          darkMode={darkMode} 
          onClose={() => setIsAuthModalOpen(false)} 
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setIsAuthModalOpen(false);
          }} 
        />
      )}

      {/* 🎨 ANIMATION STYLES */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.1); }
          100% { transform: translate(-5%, 2%) scale(0.9); }
        }
      `}</style>
    </div>
  );
}