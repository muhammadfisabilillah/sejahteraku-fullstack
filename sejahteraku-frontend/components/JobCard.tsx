"use client";
import React, { useState } from 'react';
import axios from 'axios';

export function JobCard({ job, darkMode }: { job: any, darkMode: boolean }) {
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    setIsLoading(true);
    setAiAdvice("");
    try {
      const response = await axios.post('http://localhost:3000/ai/consult', {
        title: job.title,
        description: job.description,
      });
      setAiAdvice(response.data.advice || response.data);
    } catch (error) {
      setAiAdvice("Gagal koneksi ke AI Mentor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`group relative p-10 border transition-all duration-700 shadow-2xl ${darkMode ? 'bg-[#080808] border-white/[0.03] hover:border-emerald-500/30' : 'bg-white border-black/[0.03] hover:border-emerald-600 shadow-gray-200'}`}>
      <div className="absolute top-0 left-0 w-[1px] h-0 transition-all duration-700 group-hover:h-full bg-emerald-500"></div>
      <h4 className="text-lg font-bold mb-4 tracking-tight uppercase tracking-widest">{job.title}</h4>
      <p className={`text-[11px] mb-12 h-16 leading-relaxed font-medium transition-colors ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{job.description}</p>
      
      <button onClick={handleAskAI} disabled={isLoading} className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 border ${isLoading ? 'bg-transparent border-gray-800 text-gray-700 cursor-wait' : darkMode ? 'bg-white text-black border-white hover:bg-transparent hover:text-white' : 'bg-black text-white border-black hover:bg-transparent hover:text-black'}`}>
        {isLoading ? "Analyzing..." : "Consult AI"}
      </button>

      {aiAdvice && (
        <div className={`mt-8 p-6 border-l-2 text-[10px] leading-relaxed font-medium animate-in fade-in slide-in-from-left-2 duration-1000 ${darkMode ? 'bg-emerald-500/5 border-emerald-500 text-gray-400' : 'bg-emerald-50 border-emerald-600 text-gray-800'}`}>
          <span className="font-black text-emerald-600 block mb-2 uppercase tracking-widest">Mentor_Analysis:</span>
          "{aiAdvice}"
        </div>
      )}
    </div>
  );
}