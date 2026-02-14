"use client";

import React from 'react';
import { Play, Clock, Star, BookOpen, ChevronRight, Search } from 'lucide-react';

const courses = [
  {
    title: "Mastering Fullstack Development",
    instructor: "Alex Rivera",
    duration: "12h 45m",
    rating: 4.9,
    students: "1.2k",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
    category: "Development"
  },
  {
    title: "Advanced UI/UX Strategy",
    instructor: "Sarah Chen",
    duration: "8h 20m",
    rating: 4.8,
    students: "850",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600",
    category: "Design"
  },
  {
    title: "Data Science for Business",
    instructor: "Dr. Aris Munro",
    duration: "15h 10m",
    rating: 5.0,
    students: "2.1k",
    image: "https://images.unsplash.com/photo-1551288049-bbda38a5f452?auto=format&fit=crop&q=80&w=600",
    category: "Data"
  }
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black italic tracking-tighter mb-2">
            SKILL <span className="text-amber-500">ACADEMY.</span>
          </h1>
          <p className="text-stone-500 uppercase text-[10px] tracking-[0.3em] font-bold">
            Upgrade your potential, break your limits.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full bg-[#1a1a1a] border border-stone-800 rounded-full py-4 pl-12 pr-6 outline-none focus:border-amber-500 transition-all text-sm"
          />
        </div>
      </div>

      {/* FEATURED COURSE (HERO) */}
      <div className="relative w-full h-[400px] rounded-[40px] overflow-hidden mb-16 group">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-2xl">
          <span className="bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
            Most Popular
          </span>
          <h2 className="text-6xl font-black italic tracking-tighter mb-6 leading-none">
            AI & FUTURE <br /> WORKFORCE.
          </h2>
          <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-amber-500 transition-colors">
            <Play size={18} fill="black" /> Start Learning
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['All Courses', 'Development', 'Design', 'Business', 'Marketing', 'Data Science'].map((cat, i) => (
          <button 
            key={i}
            className={`whitespace-nowrap px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${
              i === 0 ? 'bg-amber-500 border-amber-500 text-black' : 'border-stone-800 text-stone-500 hover:border-white hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* COURSE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 border border-stone-800">
              <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-bold">{course.rating}</span>
              </div>
            </div>
            <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest mb-2">{course.category}</p>
            <h3 className="text-xl font-bold mb-4 group-hover:text-amber-500 transition-colors leading-tight">{course.title}</h3>
            <div className="flex items-center justify-between text-stone-500 text-[11px] font-medium border-t border-stone-900 pt-4">
              <div className="flex items-center gap-2">
                <Clock size={14} /> {course.duration}
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={14} /> {course.students} Students
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}