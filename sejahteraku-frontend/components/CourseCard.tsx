"use client";
import React from 'react';
import { Play, Clock, BarChart } from 'lucide-react';

export function CourseCard({ course, darkMode }: { course: any, darkMode: boolean }) {
  return (
    <div className={`group relative p-8 border transition-all duration-700 ${darkMode ? 'bg-[#050505] border-white/5 hover:border-emerald-500/50' : 'bg-white border-black/5 hover:border-emerald-600 shadow-xl'}`}>
      <div className="flex justify-between items-start mb-6">
        <span className="text-emerald-500 text-[8px] font-black tracking-[0.3em] uppercase underline italic">
          {course.level}
        </span>
        <div className={`p-3 rounded-full ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
          <Play size={14} className="text-emerald-500 fill-emerald-500" />
        </div>
      </div>

      <h4 className="text-xl font-black mb-2 tracking-tighter uppercase leading-tight group-hover:text-emerald-500 transition-colors">
        {course.title}
      </h4>
      <p className={`text-[10px] mb-8 font-medium leading-relaxed opacity-60`}>
        {course.description}
      </p>

      <div className="flex items-center gap-6 border-t border-white/5 pt-6 mt-auto">
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-emerald-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest">{course.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart size={12} className="text-emerald-500" />
          <span className="text-[9px] font-bold uppercase tracking-widest">By: {course.mentor}</span>
        </div>
      </div>

      <button className={`w-full mt-8 py-4 text-[9px] font-black uppercase tracking-[0.3em] transition-all border ${darkMode ? 'bg-white text-black border-white hover:bg-transparent hover:text-white' : 'bg-black text-white border-black hover:bg-transparent hover:text-black'}`}>
        Enroll_Course.v1
      </button>
    </div>
  );
}