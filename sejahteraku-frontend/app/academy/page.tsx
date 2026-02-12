'use client';

import { useState } from 'react';
import { 
  Search, 
  PlayCircle, 
  Clock, 
  Star, 
  Filter,
  ArrowRight,
  ChevronRight,
  LayoutGrid,
  List
} from 'lucide-react';

export default function AcademyPage() {
  const [category, setCategory] = useState('Semua');

  const courses = [
    {
      title: "Mastering UI/UX Design with Figma",
      instructor: "Ahmad Zaid",
      duration: "12 Jam",
      rating: 4.9,
      students: "1.2k",
      level: "Beginner",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Fullstack Web Development with Next.js",
      instructor: "Budi Santoso",
      duration: "45 Jam",
      rating: 5.0,
      students: "3.5k",
      level: "Intermediate",
      price: "Premium",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Digital Marketing Strategy 2026",
      instructor: "Siska Putri",
      duration: "20 Jam",
      rating: 4.8,
      students: "2.1k",
      level: "Beginner",
      price: "Gratis",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white">
      {/* Header Academy */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500">Skill Academy</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-8 leading-none">
            Asah <span className="italic text-amber-500">Keahlian</span><br />Tanpa Batas.
          </h1>
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mt-12">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Cari kursus idamanmu..." 
                className="w-full bg-stone-900/50 border border-stone-800 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-amber-500/50 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              {['Semua', 'Design', 'Development', 'Business', 'Marketing'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    category === cat ? 'bg-amber-500 border-amber-500 text-black' : 'bg-transparent border-stone-800 text-stone-500 hover:border-stone-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <div key={i} className="group relative bg-stone-900/30 border border-stone-800 rounded-[2.5rem] overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
              {/* Image Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
                <div className="absolute top-4 right-4 bg-[#0c0a09]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase">{course.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-4 text-stone-500 text-[10px] uppercase tracking-widest font-bold mb-4">
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star size={12} className="fill-amber-500" /> {course.rating}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} /> {course.duration}
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold mb-4 group-hover:text-amber-500 transition-colors leading-tight">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[10px] font-bold text-stone-400">
                      {course.instructor.charAt(0)}
                    </div>
                    <span className="text-xs text-stone-400 font-medium">{course.instructor}</span>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-black transition-all">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Academy CTA */}
      <section className="py-32 px-6 text-center border-t border-white/5">
        <h2 className="text-4xl font-display font-bold mb-6 italic">Belum Menemukan yang Cocok?</h2>
        <p className="text-stone-500 mb-10 max-w-xl mx-auto">Request materi kursus yang ingin kamu pelajari dan kami akan carikan instruktur terbaik untukmu.</p>
        <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-amber-500 transition-all uppercase tracking-widest text-xs">
          Request Materi
        </button>
      </section>
    </div>
  );
}