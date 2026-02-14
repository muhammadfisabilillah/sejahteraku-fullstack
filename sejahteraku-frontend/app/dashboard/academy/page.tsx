'use client';

import { useEffect, useState } from 'react';
// TAMBAHKAN ChevronRight & Loader2 di sini:
import { BookOpen, Play, Clock, Search, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AcademyPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Gagal ambil kursus:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-8 md:p-12 animate-in fade-in duration-1000">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
            <BookOpen size={14} /> Knowledge Base
          </div>
          <h1 className="text-5xl font-display font-bold tracking-tighter text-white">
            Skill <span className="italic text-stone-600">Academy.</span>
          </h1>
        </div>
        
        {/* SEARCH BAR */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-amber-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm w-full md:w-80 outline-none focus:border-amber-500/30 transition-all"
          />
        </div>
      </div>

      {/* COURSE GRID */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-amber-500" size={40} />
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Loading Courses...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link key={course.id} href={`/dashboard/academy/${course.id}`}>
              <div className="group bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-video bg-stone-900 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                    alt={course.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 p-3 bg-amber-500 rounded-2xl text-black shadow-xl shadow-amber-500/20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-bold text-amber-500 uppercase tracking-widest border border-white/5">
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-stone-500 font-bold uppercase tracking-widest">
                      <Clock size={10} /> {course.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-amber-500 transition-colors">
                    {course.title.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-xs text-stone-500 mb-6 line-clamp-2 italic leading-relaxed">
                    "{course.description}"
                  </p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px] font-bold">
                        {course.mentor?.charAt(0) || 'M'}
                      </div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter">{course.mentor}</span>
                    </div>
                    {/* Sekarang ChevronRight sudah terdefinisi! */}
                    <ChevronRight size={16} className="text-stone-700 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}