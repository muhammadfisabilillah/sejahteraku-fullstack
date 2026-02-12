'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Users, 
  TrendingUp, 
  Heart,
  ArrowRight,
  CheckCircle2,
  Target,
  Sparkles,
  Building2,
  BookOpen,
  ChevronDown,
  Menu,
  X,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Send,
  MessageSquare,
  Chrome,
  Figma,
  Layers,
  Zap,
  Cpu
} from 'lucide-react';
import { askAI } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- LOGIC CHAT AI ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai' as const, text: 'Halo Muhammad! 👋 Ada yang bisa saya bantu soal karier kamu hari ini?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- LOGIC LOGIN ---
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    const userMsg = message;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');
    setIsLoading(true);
    try {
      const response = await askAI(userMsg);
      setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Koneksi bermasalah, pastikan backend port 3000 jalan!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        setIsLoginOpen(false);
        router.push('/dashboard');
      } else {
        alert(data.message || 'Email atau Password salah!');
      }
    } catch (err) {
      alert('Gagal terhubung ke backend port 3000!');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sections = document.querySelectorAll('section[data-section]');
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionNumber = parseInt(section.getAttribute('data-section') || '0');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionNumber);
        }
      });
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0a09] selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out ${scrolled ? 'py-4 bg-[#0c0a09]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-display font-bold tracking-tighter text-white uppercase italic transition-transform duration-500 hover:scale-105">
              Sejahtera<span className="text-amber-500">Ku</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-12 text-white">
            {['Visi', 'Eksplorasi', 'Benefit', 'Dampak', 'FAQ'].map((item, idx) => (
              <a key={idx} href={`#section-${idx + 1}`} className={`text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:text-amber-500 ${activeSection === idx + 1 ? 'text-amber-500' : 'text-stone-500'}`}>{item}</a>
            ))}
            <button onClick={() => setIsLoginOpen(true)} className="px-8 py-3 bg-white text-[#0c0a09] text-[11px] uppercase tracking-[0.2em] font-bold rounded-full hover:bg-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-500 active:scale-95">Account</button>
          </div>
        </div>
      </nav>

      {/* 01: Hero Section */}
      <section data-section="1" id="section-1" className="relative min-h-screen flex items-center px-6 md:px-12">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="/hero-image.jpg" className="w-full h-full object-cover opacity-60 grayscale scale-100 hover:scale-105 transition-transform duration-[3000ms] ease-out" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a09] via-[#0c0a09]/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto w-full relative z-10 text-white animate-in fade-in slide-in-from-left-8 duration-1000">
          <h1 className="text-7xl md:text-[120px] font-display font-bold leading-[0.95] mb-8 tracking-tighter">
            Wujudkan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-stone-600">Masa Depan</span> <br />
            <span className="italic font-normal text-amber-500">Sejahtera.</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-400 max-w-2xl leading-relaxed mb-12 font-light">
            Platform ekosistem karier digital yang dirancang untuk mengakselerasi potensi talenta bangsa melalui edukasi dan peluang tanpa batas.
          </p>
          <button className="group px-10 py-5 bg-amber-500 text-black font-bold rounded-full flex items-center gap-4 hover:bg-amber-400 hover:shadow-2xl transition-all duration-500 active:scale-95">
            <span className="text-sm uppercase tracking-widest">Mulai Sekarang</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* 02: Eksplorasi Section */}
      <section data-section="2" id="section-2" className="py-32 px-6 md:px-12 bg-white text-[#0c0a09] rounded-[4rem] relative z-10 shadow-[0_-20px_80px_rgba(0,0,0,0.3)] transition-all duration-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-end mb-24">
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-8xl font-display font-bold leading-none mb-8 tracking-tighter transition-all">Eksplorasi Tanpa <br/>Batasan Ruang.</h2>
            </div>
            <div className="lg:col-span-5 pb-4">
              <p className="text-xl text-stone-600 leading-relaxed font-light italic">Kami menyediakan instrumen terbaik untuk mengasah keterampilan baru, terhubung dengan industri, dan membangun reputasi profesional yang solid.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <GraduationCap />, 
                title: "Skill Academy", 
                desc: "Kurikulum terkurasi dari para praktisi ahli di bidangnya.",
                bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" // Team working/studying together
              },
              { 
                icon: <Briefcase />, 
                title: "Career Hub", 
                desc: "Akses eksklusif ke berbagai peluang karier di perusahaan ternama.",
                bgImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop" // Business meeting
              },
              { 
                icon: <Award />, 
                title: "Certification", 
                desc: "Validasi keahlianmu dengan sertifikat berstandar industri.",
                bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" // Team celebration/success
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative overflow-hidden rounded-[2.5rem] border border-stone-200 aspect-[4/5] p-10 flex flex-col justify-between transition-all duration-700 ease-in-out hover:-translate-y-4 hover:shadow-2xl"
                style={{
                  backgroundImage: `url(${item.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay gelap untuk readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/90 group-hover:via-black/60 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-black transition-all duration-500 shadow-lg text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 text-white drop-shadow-lg">{item.title}</h3>
                  <p className="text-white/90 font-light italic leading-relaxed drop-shadow-md">{item.desc}</p>
                </div>
                
                <div className="relative z-10 flex justify-between items-center text-sm uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white drop-shadow-lg">
                  Pelajari <ArrowRight className="w-6 h-6" />
                </div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 translate-x-[-100%] group-hover:translate-x-[100%] group-hover:duration-[1500ms]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03: Stats Section */}
      <section data-section="3" id="section-3" className="py-40 px-6 md:px-12 text-white bg-[#0c0a09]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {[
            { val: "250K+", label: "Aktif Member" }, { val: "1.2K+", label: "Mitra Industri" },
            { val: "850+", label: "Kurikulum Kursus" }, { val: "92%", label: "Tingkat Kesuksesan" }
          ].map((stat, idx) => (
            <div key={idx} className="hover:scale-105 transition-transform duration-500">
              <div className="text-6xl md:text-7xl font-display font-bold mb-4 tracking-tighter text-white">{stat.val}</div>
              <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-amber-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 04: Impacts Section - LOGO PERUSAHAAN PREMIUM */}
      <section data-section="4" id="section-4" className="py-32 px-6 md:px-12 bg-white text-[#0c0a09] rounded-[4rem] relative z-10 text-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-amber-50/30 opacity-50"></div>
         <div className="relative z-10">
           <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tighter">Dipercaya Oleh Industri Terbaik.</h2>
           <p className="text-stone-600 mb-16 max-w-2xl mx-auto italic">Mitra strategis kami adalah perusahaan global yang memimpin transformasi digital dunia</p>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
              {[
                { 
                  logo: (
                    <svg viewBox="0 0 120 40" className="w-24 h-10">
                      <text x="10" y="28" className="font-bold text-2xl" fill="currentColor">Google</text>
                    </svg>
                  ), 
                  name: "Google" 
                },
                { 
                  logo: (
                    <svg viewBox="0 0 120 40" className="w-24 h-10">
                      <circle cx="20" cy="20" r="8" fill="#EA4335"/>
                      <circle cx="40" cy="20" r="8" fill="#4285F4"/>
                      <circle cx="60" cy="20" r="8" fill="#FBBC04"/>
                      <circle cx="80" cy="20" r="8" fill="#34A853"/>
                      <circle cx="100" cy="20" r="8" fill="#A142F4"/>
                    </svg>
                  ), 
                  name: "Figma" 
                },
                { 
                  logo: (
                    <svg viewBox="0 0 120 40" className="w-24 h-10">
                      <rect x="10" y="10" width="20" height="20" fill="#635BFF" rx="4"/>
                      <text x="35" y="28" className="font-bold text-xl" fill="currentColor">Stripe</text>
                    </svg>
                  ), 
                  name: "Stripe" 
                },
                { 
                  logo: (
                    <svg viewBox="0 0 120 40" className="w-28 h-10">
                      <path d="M10 20 L30 10 L30 30 Z" fill="currentColor"/>
                      <text x="35" y="28" className="font-bold text-xl" fill="currentColor">Vercel</text>
                    </svg>
                  ), 
                  name: "Vercel" 
                },
                { 
                  logo: (
                    <svg viewBox="0 0 120 40" className="w-20 h-10">
                      <text x="10" y="28" className="font-bold text-2xl" fill="#0071C5" style={{fontFamily: 'Arial, sans-serif'}}>intel</text>
                    </svg>
                  ), 
                  name: "Intel" 
                }
              ].map((partner, i) => (
                <div 
                  key={i} 
                  className="group flex flex-col items-center justify-center gap-3 p-8 rounded-3xl border border-stone-200/50 bg-white/50 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:border-amber-500/20 transition-all duration-700 hover:-translate-y-2"
                  style={{
                    animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform transition-transform">
                    {partner.logo}
                  </div>
                  <span className="font-bold tracking-wider text-[10px] uppercase text-stone-400 group-hover:text-amber-600 transition-colors duration-500">{partner.name}</span>
                </div>
              ))}
           </div>
         </div>
         <style jsx>{`
           @keyframes float {
             0%, 100% { transform: translateY(0px); }
             50% { transform: translateY(-10px); }
           }
         `}</style>
      </section>

      {/* 05: FAQ Section */}
      <section data-section="5" id="section-5" className="py-32 px-6 md:px-12 text-white max-w-4xl mx-auto bg-transparent">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-20 text-center tracking-tighter">Pahami <span className="italic text-stone-500">Detailnya.</span></h2>
        <div className="space-y-6">
          {[
            { q: "Bagaimana cara bergabung?", a: "Cukup daftar melalui tombol Account di navigasi atas." },
            { q: "Apakah akses ini gratis?", a: "SejahteraKu memberikan akses gratis untuk modul dasar bagi semua talenta." },
            { q: "Apakah sertifikat diakui?", a: "Ya, sertifikat kami divalidasi langsung oleh mitra industri nasional." }
          ].map((faq, idx) => (
            <div key={idx} className="group p-8 border border-white/5 rounded-[2rem] hover:bg-white/5 transition-all duration-500 ease-in-out">
              <div className="flex justify-between items-center cursor-pointer font-bold font-display text-xl">
                <h3>{faq.q}</h3>
                <ChevronDown className="w-5 h-5 text-stone-600 group-hover:text-amber-500 group-hover:rotate-180 transition-all duration-500" />
              </div>
              <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-700 ease-in-out">
                <p className="mt-6 text-stone-500 font-light leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 text-stone-500 bg-[#0c0a09]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <span className="text-white font-display font-bold text-xl uppercase italic tracking-tighter">Sejahtera<span className="text-amber-500">Ku</span></span>
          <p className="text-sm italic">© 2026 SejahteraKu. Membangun talenta Indonesia dengan hati.</p>
          <div className="flex gap-10">
            <Instagram className="hover:text-white transition-colors cursor-pointer" />
            <Twitter className="hover:text-white transition-colors cursor-pointer" />
            <Linkedin className="hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>

      {/* --- FLOATING CHATBOT REDESIGNED --- */}
      <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-end">
        {isChatOpen && (
          <div className="mb-6 w-[420px] h-[600px] bg-white rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,0.15)] border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Header */}
            <div className="relative p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" fillOpacity="0.9"/>
                    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.7"/>
                    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fillOpacity="0.7"/>
                  </svg>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="font-display text-xl font-bold tracking-tight">Career Assistant</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium text-slate-300">Aktif Sekarang</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50">
              {chatHistory.map((chat, i) => (
                <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%]`}>
                    {chat.role === 'ai' && (
                      <div className="flex items-center gap-2 mb-2 ml-1">
                        <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                          <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-slate-600">Assistant</span>
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      chat.role === 'user' 
                        ? 'bg-slate-800 text-white font-medium rounded-tr-sm shadow-md' 
                        : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm shadow-sm'
                    }`}>
                      {chat.text}
                    </div>
                    {chat.role === 'user' && (
                      <div className="text-[10px] text-slate-400 mt-1.5 text-right mr-1">Terkirim</div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 ml-1">
                  <div className="w-6 h-6 bg-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white"/>
                    </svg>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-slate-200">
              <div className="flex gap-3 items-end">
                <div className="flex-1 relative">
                  <input 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-slate-800 text-sm outline-none focus:border-slate-400 focus:bg-white transition-all placeholder:text-slate-400" 
                    placeholder="Tanya tentang karier..." 
                  />
                </div>
                <button 
                  onClick={handleSend} 
                  className="bg-slate-800 hover:bg-slate-700 p-3.5 rounded-xl text-white transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  disabled={!message.trim() || isLoading}
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-3 text-center font-medium">SejahteraKu AI • Versi Beta</p>
            </div>
          </div>
        )}
        
        {/* Floating Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)} 
          className={`relative w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
            isChatOpen 
              ? 'bg-slate-700 text-white scale-95' 
              : 'bg-amber-500 text-white hover:bg-amber-400 hover:scale-105 hover:shadow-2xl'
          }`}
        >
          <div className={`transition-transform duration-500 ${isChatOpen ? 'rotate-90' : 'rotate-0'}`}>
            {isChatOpen ? <X size={28} strokeWidth={2.5} /> : <MessageSquare size={28} strokeWidth={2.5} />}
          </div>
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white rounded-full">
              <span className="absolute inset-0 bg-green-500 rounded-full animate-ping"></span>
            </span>
          )}
        </button>
      </div>

      {/* --- MODAL LOGIN --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0c0a09]/90 backdrop-blur-xl animate-in fade-in duration-500">
          <div className="bg-stone-900 border border-stone-800 w-full max-w-md p-12 rounded-[3rem] relative text-white shadow-[0_0_100px_rgba(0,0,0,0.8)]">
            <button onClick={() => setIsLoginOpen(false)} className="absolute top-8 right-8 text-stone-500 hover:text-white transition-colors duration-300"><X size={28} /></button>
            <h2 className="font-display text-5xl mb-10 leading-tight">Masuk Ke <br /><span className="italic text-amber-500 underline decoration-stone-800">Akun Anda.</span></h2>
            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold ml-2">Email Address</label>
                <input type="email" required className="w-full bg-stone-950 border border-stone-800 rounded-2xl py-5 px-6 text-sm outline-none focus:border-amber-500/50 transition-all" placeholder="muhammad@sejahteraku.com" onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold ml-2">Password</label>
                <input type="password" required className="w-full bg-stone-950 border border-stone-800 rounded-2xl py-5 px-6 text-sm outline-none focus:border-amber-500/50 transition-all" placeholder="••••••••" onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-5 bg-amber-500 text-black font-bold rounded-2xl hover:bg-amber-400 hover:shadow-2xl transition-all uppercase tracking-[0.2em] text-xs shadow-lg shadow-amber-500/10 active:scale-95">Masuk Sekarang</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}