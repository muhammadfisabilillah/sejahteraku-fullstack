'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:3000/jobs')
      .then(res => {
        setJobs(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen text-slate-900 font-sans relative overflow-hidden bg-white">
      
      {/* --- BACKGROUND LAYER (BAGIAN PALING MENAWAN) --- */}
      <div className="fixed inset-0 z-0">
        {/* 1. Grid Pattern (Garis-garis kotak halus) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* 2. Cahaya Teal (Kiri Atas) */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-[#2D6A76] opacity-[0.08] blur-[120px] animate-pulse"></div>
        
        {/* 3. Cahaya Gold (Kanan Bawah) */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#D99426] opacity-[0.08] blur-[120px]"></div>
        
        {/* 4. Efek Grainy (Biar teksturnya kayak kertas mahal) */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">
        {/* HEADER */}
        <nav className="sticky top-0 border-b border-slate-200/50 bg-white/60 backdrop-blur-xl px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2D6A76] flex items-center justify-center text-white font-bold">S</div>
            <span className="font-black text-lg tracking-tighter text-[#2D6A76]">SEJAHTERAKU</span>
          </div>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-[#2D6A76] transition-all">Portal</button>
        </nav>

        {/* HERO */}
        <header className="max-w-6xl mx-auto py-28 px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#2D6A76]/5 border border-[#2D6A76]/10 text-[#2D6A76] text-[10px] font-bold tracking-widest uppercase">
            Platform Karir Masa Depan
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            Temukan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D6A76] via-[#3d8d9c] to-[#D99426]">Pekerjaan</span> <br /> 
            Terbaikmu.
          </h2>
          <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Menghubungkan talenta hebat dengan industri logistik dan manufaktur melalui teknologi AI.
          </p>
          <button className="bg-[#2D6A76] text-white px-12 py-5 rounded-2xl font-bold shadow-2xl shadow-[#2D6A76]/20 hover:scale-105 transition-all">
            Jelajahi Lowongan
          </button>
        </header>

        {/* JOB LIST */}
        <section className="max-w-6xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map((job: any) => (
              <div key={job.id} className="group bg-white/40 backdrop-blur-md p-10 rounded-[2rem] border border-slate-200/50 hover:border-[#2D6A76]/30 hover:bg-white/80 transition-all duration-500 shadow-sm">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-xl">🏭</div>
                   <span className="text-[11px] font-black text-[#D99426] bg-[#D99426]/10 px-4 py-1 rounded-full uppercase tracking-wider">{job.salaryRange}</span>
                </div>
                <h4 className="text-2xl font-black mb-2 tracking-tight uppercase">{job.position}</h4>
                <p className="text-slate-400 text-sm font-medium mb-10">📍 {job.location} • Full-time</p>
                <button className="w-full py-4 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold hover:bg-[#2D6A76] hover:text-white hover:border-[#2D6A76] transition-all">
                  Lamar Sekarang
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="relative z-10 py-12 border-t border-slate-100 text-center text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">
        SejahteraKu © 2026
      </footer>
    </div>
  )
}