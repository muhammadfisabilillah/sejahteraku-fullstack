'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Briefcase, 
  BookOpen, 
  Award, 
  Heart,
  Play,
  Users,
  Building2,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Menu,
  X,
  ChevronUp,
  Star
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda 🙏');
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-amber-50/30 font-sans text-stone-800">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-md' 
          : 'bg-gradient-to-b from-black/30 to-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
              <Heart size={24} className="text-white fill-white" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-stone-800' : 'text-white drop-shadow-lg'}`}>
              Sejahtera<span className="font-light opacity-80">Ku</span>
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Beranda', 'Tentang', 'Layanan', 'Galeri', 'Kontak'].map((item, idx) => (
              <a 
                key={idx}
                href={`#${item.toLowerCase()}`} 
                className={`font-medium transition-colors ${
                  isScrolled 
                    ? 'text-stone-700 hover:text-amber-600' 
                    : 'text-white hover:text-amber-300 drop-shadow'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="hidden md:flex gap-4">
            <button className={`px-5 py-2.5 text-sm font-medium transition-colors ${
              isScrolled 
                ? 'text-stone-700 hover:text-amber-600' 
                : 'text-white hover:text-amber-300'
            }`}>
              Masuk
            </button>
            <button className="px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full hover:shadow-xl transition-all transform hover:scale-105">
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? 'text-stone-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200 shadow-lg">
            <div className="px-6 py-4 flex flex-col gap-4">
              {['Beranda', 'Tentang', 'Layanan', 'Galeri', 'Kontak'].map((item, idx) => (
                <a 
                  key={idx}
                  href={`#${item.toLowerCase()}`} 
                  className="text-lg font-medium text-stone-700" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold mt-2">
                Daftar Sekarang
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Indonesian Vibes */}
      <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/hero-image.jpg" 
            alt="Indonesia Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative z-10">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-amber-700 rounded-full text-sm font-bold shadow-lg border border-amber-200">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                Platform Karier Indonesia Terpercaya
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6 animate-fade-in-up animation-delay-100 drop-shadow-2xl">
              Wujudkan Karier Impianmu Bersama Kami
            </h1>
            
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-10 animate-fade-in-up animation-delay-200 drop-shadow-lg font-medium">
              Bergabunglah dengan ribuan profesional Indonesia yang telah menemukan kesuksesan karier bersama SejahteraKu 🌟
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
              <button 
                onClick={() => router.push('/chat-consultant')}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold hover:shadow-2xl transition-all flex items-center justify-center gap-2 transform hover:scale-105"
              >
                Mulai Konsultasi Gratis
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/95 backdrop-blur-sm text-stone-800 rounded-full font-bold hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg">
                <Play className="w-4 h-4 fill-current" />
                Lihat Cerita Sukses
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 animate-fade-in-up animation-delay-400">
              {[
                { num: '50K+', label: 'Pengguna' },
                { num: '1000+', label: 'Perusahaan' },
                { num: '95%', label: 'Puas' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.num}</div>
                  <p className="text-white/90 font-medium text-sm md:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#fffbeb" fillOpacity="0.3"/>
            <path d="M0 40L60 46.7C120 53 240 67 360 73.3C480 80 600 80 720 73.3C840 67 960 53 1080 46.7C1200 40 1320 40 1380 40H1440V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" fill="#fffbeb"/>
          </svg>
        </div>
      </section>

      {/* Fitur Unggulan Bar */}
      <section className="py-8 bg-white border-y border-amber-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Briefcase className="w-7 h-7" />, title: 'Job Portal', desc: 'Lowongan Terkurasi', color: 'from-amber-400 to-orange-500' },
              { icon: <BookOpen className="w-7 h-7" />, title: 'Skill Academy', desc: 'Kursus Premium', color: 'from-orange-400 to-red-500' },
              { icon: <Award className="w-7 h-7" />, title: 'Sertifikasi', desc: 'Validasi Resmi', color: 'from-amber-500 to-orange-600' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-amber-50 transition-all cursor-pointer group">
                <div className={`p-3.5 bg-gradient-to-br ${item.color} rounded-xl shadow-lg text-white group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-stone-800">{item.title}</h3>
                  <p className="text-stone-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Section */}
      <section id="tentang" className="py-20 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-bold mb-4 border border-amber-200">
              Tentang Kami
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">
              Kenapa Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">SejahteraKu</span>?
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Kami memahami perjalanan karier di Indonesia. Platform kami dirancang khusus untuk membantu profesional Indonesia mencapai kesuksesan 🇮🇩
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Bimbingan Personal',
                desc: 'Konsultasi karier dengan mentor berpengalaman yang paham tantangan profesional di Indonesia.',
                color: 'from-amber-400 to-orange-500'
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: 'Lowongan Terpercaya',
                desc: 'Akses ribuan lowongan dari perusahaan terkemuka di seluruh Indonesia yang sudah terverifikasi.',
                color: 'from-orange-400 to-red-500'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Pengembangan Skill',
                desc: 'Kursus online berkualitas dengan materi yang disesuaikan dengan kebutuhan industri Indonesia.',
                color: 'from-amber-500 to-orange-600'
              }
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-amber-100 hover:border-amber-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-stone-800">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-bold mb-4 border border-amber-200">
              Layanan Kami
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">
              Solusi Lengkap untuk <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Karier Anda</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Briefcase className="w-7 h-7" />,
                title: 'Job Portal Indonesia',
                desc: 'Platform pencarian kerja dengan AI matching yang menghubungkan Anda dengan peluang karier terbaik di seluruh Indonesia.',
                features: ['Smart Job Matching', 'Perusahaan Terverifikasi', 'Interview Tips'],
                color: 'from-amber-500 to-orange-600'
              },
              {
                icon: <BookOpen className="w-7 h-7" />,
                title: 'Skill Academy',
                desc: 'Ribuan kursus online dari instruktur terbaik Indonesia untuk meningkatkan kompetensi profesional Anda.',
                features: ['Video HD Berkualitas', 'Sertifikat Resmi', 'Akses Selamanya'],
                color: 'from-orange-500 to-red-600'
              },
              {
                icon: <Users className="w-7 h-7" />,
                title: 'Career Coaching',
                desc: 'Sesi konsultasi pribadi dengan career coach profesional bersertifikat untuk mencapai tujuan karier Anda.',
                features: ['Konsultasi 1-on-1', 'Personalized Roadmap', 'Follow-up Support'],
                color: 'from-amber-600 to-orange-700'
              },
              {
                icon: <Award className="w-7 h-7" />,
                title: 'CV & Portfolio Builder',
                desc: 'Tools canggih untuk membuat CV profesional dan portfolio menarik yang sesuai dengan standar HR Indonesia.',
                features: ['Template Modern', 'ATS-Friendly', 'Gratis Revisi'],
                color: 'from-orange-600 to-red-700'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-amber-50/30 border-2 border-amber-200/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 group">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg text-white group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-stone-800">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed mb-4">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-stone-700">
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeri" className="py-20 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-bold mb-4 border border-amber-200">
              Galeri
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">
              Momen Berharga <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Bersama Kami</span>
            </h2>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
              Lihat bagaimana kami membantu ribuan profesional Indonesia mencapai impian karier mereka 📸
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { img: 'photo-1542744173-8e7e53415bb0', title: 'Workshop Karier', loc: 'Jakarta, 2024' },
              { img: 'photo-1531482615713-2afd69097998', title: 'Networking Event', loc: 'Surabaya, 2024' },
              { img: 'photo-1557804506-669a67965ba0', title: 'Training Session', loc: 'Bandung, 2024' },
              { img: 'photo-1521737711867-e3b97375f902', title: 'Success Story', loc: 'Online, 2024' },
              { img: 'photo-1552664730-d307ca884978', title: 'Team Building', loc: 'Bali, 2024' },
              { img: 'photo-1600880292203-757bb62b4baf', title: 'Webinar Series', loc: 'Online, 2024' },
              { img: 'photo-1556761175-5973dc0f32e7', title: 'Career Fair', loc: 'Yogyakarta, 2024' },
              { img: 'photo-1559136555-9303baea8ebd', title: 'Mentoring', loc: 'Semarang, 2024' }
            ].map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer shadow-md hover:shadow-2xl transition-all">
                <img 
                  src={`https://images.unsplash.com/${item.img}?w=600&q=80`}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="font-bold text-base md:text-lg mb-1">{item.title}</h4>
                    <p className="text-xs md:text-sm opacity-90">{item.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block px-5 py-2.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 rounded-full text-sm font-bold mb-6 border border-amber-200">
                Hubungi Kami
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-stone-800">
                Mari Wujudkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Karier Impian</span> Anda
              </h2>
              <p className="text-xl text-stone-600 mb-10 leading-relaxed">
                Tim kami siap membantu! Hubungi kami untuk konsultasi gratis atau tanya-tanya seputar layanan kami 💬
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: <MapPin className="w-6 h-6" />, title: 'Alamat', text: 'Jl. Sudirman No. 123, Jakarta Pusat, 10220', color: 'from-amber-400 to-orange-500' },
                  { icon: <Phone className="w-6 h-6" />, title: 'Telepon', text: '+62 21 1234 5678', color: 'from-orange-400 to-red-500' },
                  { icon: <Mail className="w-6 h-6" />, title: 'Email', text: 'halo@sejahteraku.com', color: 'from-amber-500 to-orange-600' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-stone-800">{item.title}</h4>
                      <p className="text-stone-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-4 text-stone-800">Ikuti Kami di Media Sosial</h4>
                <div className="flex gap-4">
                  {[
                    { icon: <Instagram />, title: 'Instagram', color: 'hover:bg-pink-500' },
                    { icon: <Linkedin />, title: 'LinkedIn', color: 'hover:bg-blue-600' },
                    { icon: <Twitter />, title: 'Twitter', color: 'hover:bg-sky-500' },
                    { icon: <Facebook />, title: 'Facebook', color: 'hover:bg-blue-700' }
                  ].map((social, idx) => (
                    <a 
                      key={idx}
                      href="#" 
                      className={`w-12 h-12 rounded-xl border-2 border-amber-300 bg-amber-50 flex items-center justify-center ${social.color} hover:text-white hover:border-transparent transition-all hover:-translate-y-1 shadow-md`}
                      title={social.title}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl p-8 md:p-10 border-2 border-amber-200">
              <h3 className="text-2xl font-bold mb-6 text-stone-800">Kirim Pesan kepada Kami</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold mb-2 text-stone-700">Nama Lengkap</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3.5 border-2 border-amber-200 bg-white rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-stone-700">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3.5 border-2 border-amber-200 bg-white rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-stone-700">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3.5 border-2 border-amber-200 bg-white rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="+62 812 3456 7890"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2 text-stone-700">Pesan</label>
                  <textarea 
                    className="w-full px-4 py-3.5 border-2 border-amber-200 bg-white rounded-xl focus:outline-none focus:border-amber-500 transition-colors resize-none"
                    rows={5}
                    placeholder="Ceritakan kebutuhan Anda..."
                    required
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Kirim Pesan Sekarang
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-stone-800 to-stone-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart size={24} className="fill-white" />
                </div>
                <span className="text-2xl font-bold">Sejahtera<span className="font-light text-amber-200">Ku</span></span>
              </div>
              <p className="text-stone-300 leading-relaxed">
                Platform karier Indonesia yang membantu Anda mencapai kesuksesan profesional 🇮🇩
              </p>
            </div>
            
            {[
              { 
                title: 'Perusahaan',
                links: ['Tentang Kami', 'Tim Kami', 'Karier', 'Blog']
              },
              {
                title: 'Layanan',
                links: ['Job Portal', 'Skill Academy', 'Career Coaching', 'CV Builder']
              },
              {
                title: 'Bantuan',
                links: ['FAQ', 'Kontak', 'Kebijakan Privasi', 'Syarat & Ketentuan']
              }
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-lg mb-4 text-amber-300">{col.title}</h4>
                <ul className="space-y-3 text-stone-300">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-amber-300 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-stone-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-stone-400 text-sm">
                © 2024 SejahteraKu. Dibuat dengan ❤️ untuk Indonesia
              </p>
              <div className="flex gap-4">
                {[Instagram, Linkedin, Twitter, Facebook].map((Icon, idx) => (
                  <a key={idx} href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-3xl transition-all transform hover:scale-110 z-50"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}