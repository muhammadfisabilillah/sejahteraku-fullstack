'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Link agar navigasi jalan
import { 
  Search, 
  Play, 
  Clock, 
  Star, 
  Filter, 
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function AcademyDashboard() {
  const [filter, setFilter] = useState('Semua');

  const courses = [
    {
      id: 1,
      title: "Fullstack Next.js 15: The Cinematic Web",
      category: "Development",
      duration: "20 Jam",
      level: "Intermediate",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=1964&auto=format&fit=crop",
      isUnlocked: true
    },
    {
      id: 2,
      title: "UI/UX Design: Luxury Brand Identity",
      category: "Design",
      duration: "15 Jam",
      level: "Beginner",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1964&auto=format&fit=crop",
      isUnlocked: true
    },
    {
      id: 3,
      title: "Advanced AI Prompt Engineering",
      category: "AI",
      duration: "10 Jam",
      level: "Advanced",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1932&auto=format&fit=crop",
      isUnlocked: false
    }
  ];

  const filteredCourses = filter === 'Semua' 
    ? courses 
    : courses.filter(c => c.category === filter);

  return (
    <div className="p-8 md:p-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
            <BookOpen size={14} /> Learning Path
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tighter">
            Skill <span className="italic text-stone-500 underline decoration-stone-800">Academy.</span>
          </h1>
        </div>
        
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-600 group-focus-within:text-amber-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Cari materi..." 
            className="w-full bg-stone-900/50 border border-stone-800 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-amber-500/30 transition-all"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
        {['Semua', 'Development', 'Design', 'AI', 'Business'].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border ${
              filter === item 
              ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' 
              : 'bg-transparent border-stone-800 text-stone-500 hover:text-white hover:border-stone-600'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group relative">
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-6 border border-white/5 shadow-2xl">
              <img 
                src={course.image} 
                className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${!course.isUnlocked && 'blur-sm grayscale'}`} 
                alt={course.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent opacity-80" />
              
              {!course.isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                   <div className="bg-white/10 p-4 rounded-full border border-white/10">
                      <Lock className="text-amber-500" size={24} />
                   </div>
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-500 text-black px-3 py-1 rounded-md shadow-lg">
                  {course.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Star size={14} className="text-amber-500 fill-amber-500" /> {course.rating}
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold mb-3 tracking-tight group-hover:text-amber-500 transition-colors">
              {course.title}
            </h3>
            
            <div className="flex items-center gap-6 text-stone-500 text-xs mb-6 italic">
              <span className="flex items-center gap-2"><Clock size={14} /> {course.duration}</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={14} /> {course.level}</span>
            </div>

            {/* Tombol yang sudah dihubungkan ke [id] */}
            {course.isUnlocked ? (
              <Link 
                href={`/dashboard/academy/${course.id}`}
                className="w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-3 bg-white text-black hover:bg-amber-500"
              >
                Mulai Belajar <ChevronRight size={16} />
              </Link>
            ) : (
              <button 
                disabled
                className="w-full py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest bg-stone-900 text-stone-600 cursor-not-allowed border border-stone-800 flex items-center justify-center gap-3"
              >
                Terkunci <Lock size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}